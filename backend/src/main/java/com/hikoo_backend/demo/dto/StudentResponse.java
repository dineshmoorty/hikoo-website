package com.hikoo_backend.demo.dto;

public record StudentResponse(
        Long id,
        Long userId,
        String name,
        String email,
        String phone,
        String course,
        String program,
        String internshipDuration,
        String courseDuration,
        String address,
        String city,
        String state,
        String pincode,
        Boolean profileCompleted,
        Boolean active
) {
}