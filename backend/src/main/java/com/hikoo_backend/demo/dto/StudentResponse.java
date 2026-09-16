package com.hikoo_backend.demo.dto;

public record StudentResponse(
        Long id,
        Long userId,
        String name,
        String email,

        String phone,

        // Academic identity
        String institutionName,
        String registerNumber,
        String program,

        String address,
        String city,
        String state,
        String pincode,

        Boolean profileCompleted,
        Boolean active
) {
}