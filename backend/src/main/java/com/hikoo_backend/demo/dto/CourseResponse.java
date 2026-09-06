package com.hikoo_backend.demo.dto;

public record CourseResponse(
        Long id,
        String name,
        String code,
        String description,
        String duration,
        Boolean active
) {
}