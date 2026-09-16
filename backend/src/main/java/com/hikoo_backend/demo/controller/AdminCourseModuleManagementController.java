package com.hikoo_backend.demo.controller;

import com.hikoo_backend.demo.dto.CourseModuleResponse;
import com.hikoo_backend.demo.dto.UpdateCourseModuleRequest;
import com.hikoo_backend.demo.service.CourseModuleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/course-modules")
@RequiredArgsConstructor
public class AdminCourseModuleManagementController {

private final CourseModuleService courseModuleService;

// =========================================================
// GET ALL MODULES FOR COURSE
// =========================================================

@GetMapping("/course/{courseId}")
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
return courseModuleService.updateModule(id, request);
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