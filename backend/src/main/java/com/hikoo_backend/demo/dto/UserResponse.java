package com.hikoo_backend.demo.dto;

import com.hikoo_backend.demo.entity.Role;

public record UserResponse(
        Long id,
        String name,
        String email,
        Role role,
        Boolean active
) {
}