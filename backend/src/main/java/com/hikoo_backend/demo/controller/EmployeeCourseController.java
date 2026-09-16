package com.hikoo_backend.demo.controller;

import com.hikoo_backend.demo.dto.CourseLessonResponse;
import com.hikoo_backend.demo.dto.CourseModuleResponse;
import com.hikoo_backend.demo.dto.CourseResponse;
import com.hikoo_backend.demo.service.EmployeeCourseAssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee/courses")
@RequiredArgsConstructor
public class EmployeeCourseController {

    private final EmployeeCourseAssignmentService service;

    @GetMapping
    public List<CourseResponse> myCourses(Authentication authentication) {
        return service.getMyCourses(authentication);
    }

    @GetMapping("/{courseId}")
    public CourseResponse myCourse(
            Authentication authentication,
            @PathVariable Long courseId) {
        return service.getMyCourse(authentication, courseId);
    }

    @GetMapping("/{courseId}/modules")
    public List<CourseModuleResponse> myModules(
            Authentication authentication,
            @PathVariable Long courseId) {
        return service.getMyModules(authentication, courseId);
    }

    @GetMapping("/{courseId}/modules/{moduleId}/lessons")
    public List<CourseLessonResponse> myLessons(
            Authentication authentication,
            @PathVariable Long courseId,
            @PathVariable Long moduleId) {
        return service.getMyLessons(authentication, courseId, moduleId);
    }
}
