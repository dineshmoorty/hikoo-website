package com.hikoo_backend.demo.dto;

import java.time.LocalDateTime;

public record LessonProgressResponse(

        Long id,

        Long enrollmentId,

        Long lessonId,

        String lessonTitle,

        Integer lessonOrder,

        Long moduleId,

        String moduleTitle,

        Long courseId,

        String courseName,

        Boolean completed,

        LocalDateTime completedAt

) {
}