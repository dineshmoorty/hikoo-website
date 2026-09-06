package com.hikoo_backend.demo.dto;

import jakarta.validation.constraints.NotNull;

public record UpdateCourseStatusRequest(

        @NotNull(message = "Active status is required")
        Boolean active

) {
}