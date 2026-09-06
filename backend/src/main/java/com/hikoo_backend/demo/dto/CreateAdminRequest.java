package com.hikoo_backend.demo.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateAdminRequest(

        @NotBlank(message = "Name is required")
        @Size(max = 255, message = "Name is too long")
        String name,

        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email address")
        String email,

        @NotBlank(message = "Password is required")
        @Size(min = 8, message = "Password must contain at least 8 characters")
        String password

) {
}