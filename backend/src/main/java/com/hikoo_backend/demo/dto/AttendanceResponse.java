package com.hikoo_backend.demo.dto;

import com.hikoo_backend.demo.entity.AttendanceStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record AttendanceResponse(

        Long id,

        Long enrollmentId,

        Long studentId,
        String studentName,
        String studentEmail,

        Long courseId,
        String courseName,
        String courseCode,

        Long employeeId,
        String employeeName,

        LocalDate attendanceDate,

        AttendanceStatus status,

        String remarks,

        LocalDateTime createdAt,
        LocalDateTime updatedAt,

        Boolean active
) {
}
