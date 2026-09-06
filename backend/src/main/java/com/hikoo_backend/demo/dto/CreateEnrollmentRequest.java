package com.hikoo_backend.demo.dto;

import jakarta.validation.constraints.NotNull;

public record CreateEnrollmentRequest(

        @NotNull(message = "Course ID is required")
        Long courseId

) {}