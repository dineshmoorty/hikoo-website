package com.hikoo_backend.demo.dto;

import jakarta.validation.constraints.NotBlank;

import java.math.BigDecimal;

public record CreateCourseRequest(

        @NotBlank(message = "Course name is required")
        String name,

        String code,

        String description,

        String duration,

        BigDecimal baseFee,

        BigDecimal gstPercentage

) {
}