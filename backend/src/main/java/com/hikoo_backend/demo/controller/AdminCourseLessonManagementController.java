package com.hikoo_backend.demo.controller;

import com.hikoo_backend.demo.dto.CourseLessonResponse;
import com.hikoo_backend.demo.dto.UpdateCourseLessonRequest;
import com.hikoo_backend.demo.service.CourseLessonService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/course-lessons")
@RequiredArgsConstructor
public class AdminCourseLessonManagementController {

private final CourseLessonService courseLessonService;

// =========================================================
// GET ALL LESSONS FOR MODULE
// =========================================================

@GetMapping("/module/{moduleId}")
public List<CourseLessonResponse> getAllLessons(
  @PathVariable Long moduleId
) {
return courseLessonService.getAllLessons(moduleId);
}

// =========================================================
// GET SINGLE LESSON
// =========================================================

@GetMapping("/{id}")
public CourseLessonResponse getLesson(
  @PathVariable Long id
) {
return courseLessonService.getLesson(id);
}

// =========================================================
// UPDATE LESSON
// =========================================================

@PutMapping("/{id}")
public CourseLessonResponse updateLesson(
  @PathVariable Long id,
  @Valid @RequestBody UpdateCourseLessonRequest request
) {
return courseLessonService.updateLesson(id, request);
}

// =========================================================
// UPDATE LESSON STATUS
// =========================================================

@PatchMapping("/{id}/status")
public CourseLessonResponse updateStatus(
  @PathVariable Long id,
  @RequestParam Boolean active
) {
return courseLessonService.updateStatus(id, active);
}
}