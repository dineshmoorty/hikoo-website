package com.hikoo_backend.demo.dto;

import java.time.LocalDateTime;

public record EmployeeCourseAssignmentResponse(
        Long id,
        Long employeeId,
        String employeeName,
        String employeeEmail,
        Long courseId,
        String courseName,
        String courseCode,
        Boolean courseActive,
        LocalDateTime assignedAt
) {}
