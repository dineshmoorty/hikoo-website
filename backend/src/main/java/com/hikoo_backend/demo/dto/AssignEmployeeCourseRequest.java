package com.hikoo_backend.demo.dto;

import jakarta.validation.constraints.NotNull;

public record AssignEmployeeCourseRequest(
        @NotNull Long employeeId,
        @NotNull Long courseId
) {}
