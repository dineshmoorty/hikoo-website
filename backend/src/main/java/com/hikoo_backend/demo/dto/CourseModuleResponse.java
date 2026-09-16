package com.hikoo_backend.demo.dto;

public record CourseModuleResponse(
        Long id,
        Long courseId,
        String courseName,
        String title,
        String description,
        Integer moduleOrder,
        Boolean active
) {
}