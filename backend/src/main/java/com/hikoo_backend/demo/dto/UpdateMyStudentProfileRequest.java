package com.hikoo_backend.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UpdateMyStudentProfileRequest(

        @NotBlank(message = "Phone is required")
        @Size(max = 30, message = "Phone is too long")
        String phone,

        @NotBlank(message = "Institution name is required")
        @Size(max = 200, message = "Institution name is too long")
        String institutionName,

        @NotBlank(message = "Register number is required")
        @Size(max = 100, message = "Register number is too long")
        String registerNumber,

        @NotBlank(message = "Program is required")
        @Size(max = 100, message = "Program is too long")
        String program,

        @NotBlank(message = "Address is required")
        @Size(max = 1000, message = "Address is too long")
        String address,

        @NotBlank(message = "City is required")
        @Size(max = 100, message = "City is too long")
        String city,

        @NotBlank(message = "State is required")
        @Size(max = 100, message = "State is too long")
        String state,

        @NotBlank(message = "Pincode is required")
        @Pattern(
                regexp = "^[0-9]{6}$",
                message = "Pincode must be exactly 6 digits"
        )
        String pincode
) {
}