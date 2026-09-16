package com.hikoo_backend.demo.controller;

import com.hikoo_backend.demo.dto.CourseModuleResponse;
import com.hikoo_backend.demo.dto.CreateCourseModuleRequest;
import com.hikoo_backend.demo.dto.UpdateCourseModuleRequest;
import com.hikoo_backend.demo.service.CourseModuleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/course-modules")
@RequiredArgsConstructor
public class CourseModuleController {

private final CourseModuleService courseModuleService;

// =========================================================
// CREATE MODULE
// =========================================================

@PostMapping
@ResponseStatus(HttpStatus.CREATED)
public CourseModuleResponse createModule(
        @Valid @RequestBody CreateCourseModuleRequest request
) {

    return courseModuleService.createModule(request);
}

// =========================================================
// GET ACTIVE MODULES FOR COURSE
// =========================================================

@GetMapping("/course/{courseId}")
public List<CourseModuleResponse> getActiveModules(
        @PathVariable Long courseId
) {

    return courseModuleService.getActiveModules(courseId);
}

// =========================================================
// GET ALL MODULES FOR COURSE
// =========================================================

@GetMapping("/course/{courseId}/all")
public List<CourseModuleResponse> getAllModules(
        @PathVariable Long courseId
) {

    return courseModuleService.getAllModules(courseId);
}

// =========================================================
// GET SINGLE MODULE
// =========================================================

@GetMapping("/{id}")
public CourseModuleResponse getModule(
        @PathVariable Long id
) {

    return courseModuleService.getModule(id);
}

// =========================================================
// UPDATE MODULE
// =========================================================

@PutMapping("/{id}")
public CourseModuleResponse updateModule(
    @PathVariable Long id,
    @Valid @RequestBody UpdateCourseModuleRequest request
) {

return courseModuleService.updateModule(
        id,
        request
);
}

// =========================================================
// UPDATE MODULE STATUS
// =========================================================

@PatchMapping("/{id}/status")
public CourseModuleResponse updateStatus(
        @PathVariable Long id,
        @RequestParam Boolean active
) {

    return courseModuleService.updateStatus(id, active);
}

}