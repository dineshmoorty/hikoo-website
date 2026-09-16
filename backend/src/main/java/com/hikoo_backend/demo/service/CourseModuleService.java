package com.hikoo_backend.demo.service;

import com.hikoo_backend.demo.dto.CourseModuleResponse;
import com.hikoo_backend.demo.dto.CreateCourseModuleRequest;
import com.hikoo_backend.demo.dto.UpdateCourseModuleRequest;
import com.hikoo_backend.demo.entity.Course;
import com.hikoo_backend.demo.entity.CourseModule;
import com.hikoo_backend.demo.repository.CourseModuleRepository;
import com.hikoo_backend.demo.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseModuleService {

private final CourseModuleRepository courseModuleRepository;
private final CourseRepository courseRepository;

// =========================================================
// CREATE MODULE
// =========================================================

public CourseModuleResponse createModule(
        CreateCourseModuleRequest request
) {

        Course course = courseRepository.findById(request.courseId())
                        .orElseThrow(() -> new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Course not found"));

        if (courseModuleRepository.existsByCourseIdAndModuleOrder(
                        request.courseId(),
                        request.moduleOrder())) {
                throw new ResponseStatusException(
                                HttpStatus.CONFLICT,
                                "Module order already exists for this course");
        }

        CourseModule module = CourseModule.builder()
                        .course(course)
                        .title(request.title().trim())
                        .description(
                                        request.description() == null
                                                        ? null
                                                        : request.description().trim())
                        .moduleOrder(request.moduleOrder())
                        .active(true)
                        .build();

        return toResponse(
                        courseModuleRepository.save(module));
}

// =========================================================
// UPDATE MODULE
// =========================================================

public CourseModuleResponse updateModule(
Long moduleId,
UpdateCourseModuleRequest request
) {

CourseModule module = courseModuleRepository.findById(moduleId)
        .orElseThrow(() ->
                new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Module not found"
                )
        );

Long courseId = module.getCourse().getId();

// Prevent duplicate module order inside the same course
if (courseModuleRepository.existsByCourseIdAndModuleOrderAndIdNot(
        courseId,
        request.moduleOrder(),
        moduleId
)) {
throw new ResponseStatusException(
        HttpStatus.CONFLICT,
        "Module order already exists for this course"
);
}

module.setTitle(request.title().trim());

module.setDescription(
        request.description() == null
                ? null
                : request.description().trim()
);

module.setModuleOrder(request.moduleOrder());

return toResponse(
        courseModuleRepository.save(module)
);
}

// =========================================================
// GET ACTIVE MODULES
// =========================================================

public List<CourseModuleResponse> getActiveModules(
        Long courseId
) {

ensureCourseExists(courseId);

return courseModuleRepository
        .findByCourseIdAndActiveTrueOrderByModuleOrderAsc(courseId)
        .stream()
        .map(this::toResponse)
        .toList();
}

// =========================================================
// GET ALL MODULES
// =========================================================

public List<CourseModuleResponse> getAllModules(
        Long courseId
) {

ensureCourseExists(courseId);

return courseModuleRepository
        .findByCourseIdOrderByModuleOrderAsc(courseId)
        .stream()
        .map(this::toResponse)
        .toList();
}

// =========================================================
// GET SINGLE MODULE
// =========================================================

public CourseModuleResponse getModule(Long moduleId) {

CourseModule module = courseModuleRepository.findById(moduleId)
        .orElseThrow(() ->
                new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Module not found"
                )
        );

return toResponse(module);
}

// =========================================================
// DELETE / DEACTIVATE MODULE
// =========================================================

public CourseModuleResponse updateStatus(
        Long moduleId,
        Boolean active
) {

CourseModule module = courseModuleRepository.findById(moduleId)
        .orElseThrow(() ->
                new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Module not found"
                )
        );

module.setActive(active);

return toResponse(
        courseModuleRepository.save(module)
);
}

// =========================================================
// HELPERS
// =========================================================

private void ensureCourseExists(Long courseId) {

if (!courseRepository.existsById(courseId)) {
        throw new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Course not found"
        );
}
}

private CourseModuleResponse toResponse(
        CourseModule module
) {

return new CourseModuleResponse(
        module.getId(),
        module.getCourse().getId(),
        module.getCourse().getName(),
        module.getTitle(),
        module.getDescription(),
        module.getModuleOrder(),
        module.getActive()
);
}
}