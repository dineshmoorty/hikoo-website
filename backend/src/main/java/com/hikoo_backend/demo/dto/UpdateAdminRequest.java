package com.hikoo_backend.demo.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record UpdateAdminRequest(

        @Size(max = 100, message = "Name cannot exceed 100 characters")
        String name,

        @Email(message = "Invalid email address")
        @Size(max = 150, message = "Email cannot exceed 150 characters")
        String email,

        @Size(min = 8, message = "Password must contain at least 8 characters")
        String password
) {
}