package com.hikoo_backend.demo.service;

import com.hikoo_backend.demo.dto.CourseResponse;
import com.hikoo_backend.demo.dto.CreateCourseRequest;
import com.hikoo_backend.demo.dto.UpdateCourseRequest;
import com.hikoo_backend.demo.entity.Course;
import com.hikoo_backend.demo.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;

    public List<CourseResponse> getAllCourses() {

        return courseRepository.findAllByOrderByNameAsc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public CourseResponse getCourse(Long id) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Course not found"
                        )
                );

        return toResponse(course);
    }

    public CourseResponse createCourse(CreateCourseRequest request) {

        String name = request.name().trim();

        String code = normalizeCode(request.code());

        if (code != null &&
                courseRepository.existsByCodeIgnoreCase(code)) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Course code already exists"
            );
        }

        Course course = Course.builder()
                .name(name)
                .code(code)
                .description(normalizeText(request.description()))
                .duration(normalizeText(request.duration()))
                .active(true)
                .build();

        Course savedCourse = courseRepository.save(course);

        return toResponse(savedCourse);
    }

    public CourseResponse updateCourse(
            Long id,
            UpdateCourseRequest request
    ) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Course not found"
                        )
                );

        String code = normalizeCode(request.code());

        if (code != null) {

            courseRepository.findByCodeIgnoreCase(code)
                    .ifPresent(existing -> {

                        if (!existing.getId().equals(id)) {

                            throw new ResponseStatusException(
                                    HttpStatus.CONFLICT,
                                    "Course code already exists"
                            );
                        }
                    });
        }

        course.setName(request.name().trim());
        course.setCode(code);
        course.setDescription(normalizeText(request.description()));
        course.setDuration(normalizeText(request.duration()));

        if (request.active() != null) {
            course.setActive(request.active());
        }

        Course updatedCourse = courseRepository.save(course);

        return toResponse(updatedCourse);
    }

    public CourseResponse updateCourseStatus(
            Long id,
            Boolean active
    ) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Course not found"
                        )
                );

        course.setActive(active);

        Course updatedCourse = courseRepository.save(course);

        return toResponse(updatedCourse);
    }

    private CourseResponse toResponse(Course course) {

        return new CourseResponse(
                course.getId(),
                course.getName(),
                course.getCode(),
                course.getDescription(),
                course.getDuration(),
                course.getActive()
        );
    }

    private String normalizeCode(String value) {

        if (value == null || value.trim().isEmpty()) {
            return null;
        }

        return value.trim().toUpperCase();
    }

    private String normalizeText(String value) {

        if (value == null || value.trim().isEmpty()) {
            return null;
        }

        return value.trim();
    }
}