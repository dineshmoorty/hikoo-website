package com.hikoo_backend.demo.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import jakarta.validation.constraints.Size;

public record UpdateStudentRequest(

        @NotBlank(message = "Name is required")
        String name,

        @NotBlank(message = "Email is required")
        @Email(message = "Enter a valid email address")
        String email,

        @Size(max = 30, message = "Phone is too long")
        String phone,

        @Size(max = 255, message = "Course is too long")
        String course,

        @Size(max = 100, message = "Program is too long")
        String program,

        @Size(max = 50, message = "Internship duration is too long")
        String internshipDuration,

        @Size(max = 50, message = "Course duration is too long")
        String courseDuration,

        @Size(max = 1000, message = "Address is too long")
        String address,

        @Size(max = 100, message = "City is too long")
        String city,

        @Size(max = 100, message = "State is too long")
        String state,

        @Size(max = 20, message = "Pincode is too long")
        String pincode,

        Boolean profileCompleted
) {
}