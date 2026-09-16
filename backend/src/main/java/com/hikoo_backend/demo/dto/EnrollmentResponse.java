package com.hikoo_backend.demo.dto;

import com.hikoo_backend.demo.entity.EnrollmentStatus;

import java.math.BigDecimal;
import java.time.LocalDate;
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
        Boolean completed,

        LocalDateTime enrolledAt,
        LocalDateTime assignedAt,
        LocalDateTime completedAt,

        // Schedule
        LocalDate startDate,
        LocalDate endDate,
        EnrollmentStatus status,

        // Pricing
        BigDecimal courseFee,
        BigDecimal discountPercentage,
        BigDecimal discountAmount,
        BigDecimal gstPercentage,
        BigDecimal gstAmount,
        BigDecimal finalAmount,

        // Coupon
        Long couponId,
        String couponCode
) {
}