package com.hikoo_backend.demo.dto;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record CreateEnrollmentRequest(

        @NotNull(message = "Course ID is required")
        Long courseId,

        @NotNull(message = "Start date is required")
        LocalDate startDate,

        String couponCode
) {
}