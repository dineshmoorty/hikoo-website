package com.hikoo_backend.demo.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record MarkAttendanceRequest(

        @NotNull(message = "Student ID is required")
        Long studentId,

        @NotNull(message = "Attendance date is required")
        LocalDate attendanceDate,

        @NotNull(message = "Present status is required")
        Boolean present,

        @Size(max = 30, message = "Method is too long")
        String method,

        @Size(max = 500, message = "Remarks are too long")
        String remarks
) {
}