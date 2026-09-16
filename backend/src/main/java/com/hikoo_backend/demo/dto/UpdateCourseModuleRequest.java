package com.hikoo_backend.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record UpdateCourseModuleRequest(

  @NotBlank(message = "Module title is required")
  String title,

  String description,

  @NotNull(message = "Module order is required")
  @Positive(message = "Module order must be greater than 0")
  Integer moduleOrder

) {
}