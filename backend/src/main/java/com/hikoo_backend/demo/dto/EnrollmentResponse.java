package com.hikoo_backend.demo.dto;

import java.time.LocalDateTime;

public record EnrollmentResponse(
        Long id,
        Long studentId,
        String studentName,
        String studentEmail,
        Long courseId,
        String courseName,
        String courseCode,
        Long employeeId,
        String employeeName,
        String employeeEmail,
        Boolean active,
        LocalDateTime enrolledAt,
        LocalDateTime assignedAt
) {}