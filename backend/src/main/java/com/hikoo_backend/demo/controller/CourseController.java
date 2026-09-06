package com.hikoo_backend.demo.controller;

import com.hikoo_backend.demo.dto.CourseResponse;
import com.hikoo_backend.demo.dto.CreateCourseRequest;
import com.hikoo_backend.demo.dto.UpdateCourseRequest;
import com.hikoo_backend.demo.dto.UpdateCourseStatusRequest;
import com.hikoo_backend.demo.service.CourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @GetMapping
    public List<CourseResponse> getAllCourses() {

        return courseService.getAllCourses();
    }

    @GetMapping("/{id}")
    public CourseResponse getCourse(
            @PathVariable Long id
    ) {

        return courseService.getCourse(id);
    }

    @PostMapping
    public CourseResponse createCourse(
            @Valid @RequestBody CreateCourseRequest request
    ) {

        return courseService.createCourse(request);
    }

    @PatchMapping("/{id}")
    public CourseResponse updateCourse(
            @PathVariable Long id,
            @Valid @RequestBody UpdateCourseRequest request
    ) {

        return courseService.updateCourse(id, request);
    }

    @PatchMapping("/{id}/status")
    public CourseResponse updateCourseStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateCourseStatusRequest request
    ) {

        return courseService.updateCourseStatus(
                id,
                request.active()
        );
    }
}