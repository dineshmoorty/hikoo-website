package com.hikoo_backend.demo.dto;

public record LoginResponse(
        String token,
        String role,
        String name,
        String email,
        boolean profileCompleted
) {}