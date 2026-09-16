package com.hikoo_backend.demo.dto;

import com.hikoo_backend.demo.entity.AttendanceStatus;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record UpdateAttendanceRequest(
        @NotNull(message = "Attendance date is required")
        LocalDate attendanceDate,

        @NotNull(message = "Attendance status is required")
        AttendanceStatus status,

        String remarks
) {}
