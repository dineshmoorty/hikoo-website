package com.hikoo_backend.demo.controller;

import com.hikoo_backend.demo.dto.CourseResponse;
import com.hikoo_backend.demo.dto.UpdateCourseRequest;
import com.hikoo_backend.demo.service.CourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/courses")
@RequiredArgsConstructor
public class AdminCourseManagementController {

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
  @RequestParam boolean active
) {
return courseService.updateCourseStatus(id, active);
}
}