package com.hikoo_backend.demo.dto;

public record CourseLessonResponse(
        Long id,
        Long moduleId,
        Long courseId,
        String courseName,
        String moduleTitle,
        String title,
        String description,
        Integer lessonOrder,
        String content,
        Boolean active
) {
}