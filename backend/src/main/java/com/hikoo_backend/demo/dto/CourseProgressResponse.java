package com.hikoo_backend.demo.dto;

import java.math.BigDecimal;
import java.util.List;

public record CourseProgressResponse(

        Long enrollmentId,

        Long courseId,

        String courseName,

        int totalLessons,

        int completedLessons,

        BigDecimal progressPercentage,

        boolean courseCompleted,

        List<LessonProgressResponse> lessons

) {
}