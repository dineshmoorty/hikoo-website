package com.hikoo_backend.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record CreateCourseLessonRequest(

        @NotNull(message = "Module ID is required")
        Long moduleId,

        @NotBlank(message = "Lesson title is required")
        String title,

        String description,

        @NotNull(message = "Lesson order is required")
        @Positive(message = "Lesson order must be greater than 0")
        Integer lessonOrder,

        String content
) {
}