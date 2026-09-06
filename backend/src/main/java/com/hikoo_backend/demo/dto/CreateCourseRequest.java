package com.hikoo_backend.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateCourseRequest(

        @NotBlank(message = "Course name is required")
        @Size(max = 255, message = "Course name is too long")
        String name,

        @Size(max = 50, message = "Course code is too long")
        String code,

        @Size(max = 1000, message = "Description is too long")
        String description,

        @Size(max = 50, message = "Duration is too long")
        String duration

) {
}