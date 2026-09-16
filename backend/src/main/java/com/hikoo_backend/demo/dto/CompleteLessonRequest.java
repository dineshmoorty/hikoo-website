package com.hikoo_backend.demo.dto;

import jakarta.validation.constraints.NotNull;

public record CompleteLessonRequest(

        @NotNull(message = "Lesson ID is required")
        Long lessonId

) {
}