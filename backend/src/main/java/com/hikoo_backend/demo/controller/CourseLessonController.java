package com.hikoo_backend.demo.controller;

import com.hikoo_backend.demo.dto.CourseLessonResponse;
import com.hikoo_backend.demo.dto.CreateCourseLessonRequest;
import com.hikoo_backend.demo.dto.UpdateCourseLessonRequest;
import com.hikoo_backend.demo.service.CourseLessonService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/course-lessons")
@RequiredArgsConstructor
public class CourseLessonController {

private final CourseLessonService courseLessonService;

// =========================================================
// CREATE LESSON
// =========================================================

@PostMapping
@ResponseStatus(HttpStatus.CREATED)
public CourseLessonResponse createLesson(
        @Valid @RequestBody CreateCourseLessonRequest request
) {

    return courseLessonService.createLesson(request);
}

// =========================================================
// GET ACTIVE LESSONS
// =========================================================

@GetMapping("/module/{moduleId}")
public List<CourseLessonResponse> getActiveLessons(
        @PathVariable Long moduleId
) {

    return courseLessonService.getActiveLessons(moduleId);
}

// =========================================================
// GET ALL LESSONS
// =========================================================

@GetMapping("/module/{moduleId}/all")
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

return courseLessonService.updateLesson(
        id,
        request
);
}

// =========================================================
// UPDATE STATUS
// =========================================================

@PatchMapping("/{id}/status")
public CourseLessonResponse updateStatus(
        @PathVariable Long id,
        @RequestParam Boolean active
) {

    return courseLessonService.updateStatus(id, active);
}
}