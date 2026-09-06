package com.hikoo_backend.demo.dto;

import jakarta.validation.constraints.NotNull;

public record AssignEmployeeRequest(

        @NotNull(message = "Employee ID is required")
        Long employeeId

) {}