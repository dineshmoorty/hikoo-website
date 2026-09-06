package com.hikoo_backend.demo.dto;

public record EmployeeResponse(
        Long id,
        Long userId,
        String name,
        String email,
        String designation,
        String specialization,
        String department,
        String phone,
        String address,
        String city,
        String state,
        String pincode,
        Boolean profileCompleted,
        Boolean active
) {}