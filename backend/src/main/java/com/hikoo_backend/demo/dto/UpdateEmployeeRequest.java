package com.hikoo_backend.demo.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record UpdateEmployeeRequest(

        @Size(max = 255, message = "Name is too long")
        String name,

        @Email(message = "Invalid email address")
        String email,

        @Size(max = 100, message = "Designation is too long")
        String designation,

        @Size(max = 150, message = "Specialization is too long")
        String specialization,

        @Size(max = 100, message = "Department is too long")
        String department,

        @Size(max = 30, message = "Phone number is too long")
        String phone,

        @Size(max = 1000, message = "Address is too long")
        String address,

        @Size(max = 100, message = "City is too long")
        String city,

        @Size(max = 100, message = "State is too long")
        String state,

        @Size(max = 20, message = "Pincode is too long")
        String pincode
) {}