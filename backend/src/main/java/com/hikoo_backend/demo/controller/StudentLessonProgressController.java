package com.hikoo_backend.demo.controller;

import com.hikoo_backend.demo.dto.CompleteLessonRequest;
import com.hikoo_backend.demo.dto.CourseProgressResponse;
import com.hikoo_backend.demo.dto.LessonProgressResponse;
import com.hikoo_backend.demo.service.StudentLessonProgressService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student/progress")
@RequiredArgsConstructor
public class StudentLessonProgressController {

    private final StudentLessonProgressService progressService;

    // =========================================================
    // COMPLETE LESSON
    // =========================================================

    @PostMapping("/lesson/complete")
    @ResponseStatus(HttpStatus.OK)
    public LessonProgressResponse completeLesson(
            Authentication authentication,
            @Valid @RequestBody CompleteLessonRequest request
    ) {

        return progressService.completeLesson(
                authentication.getName(),
                request.lessonId()
        );
    }

    // =========================================================
    // MY COURSE PROGRESS
    // =========================================================

    @GetMapping("/course")
    public CourseProgressResponse getMyCourseProgress(
            Authentication authentication
    ) {

        return progressService.getMyCourseProgress(
                authentication.getName()
        );
    }
}