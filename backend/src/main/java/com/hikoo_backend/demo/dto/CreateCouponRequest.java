package com.hikoo_backend.demo.dto;

import com.hikoo_backend.demo.entity.CouponApplicableTo;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record CreateCouponRequest(

  @NotBlank(message = "Coupon code is required")
  String code,

  @NotNull(message = "Discount percentage is required")
  @DecimalMin(value = "0.00", message = "Discount cannot be negative")
  @DecimalMax(value = "100.00", message = "Discount cannot exceed 100%")
  BigDecimal discountPercentage,

  @NotNull(message = "Applicable type is required")
  CouponApplicableTo applicableTo,

  Long courseId,

  Integer usageLimit,

  LocalDateTime validFrom,

  LocalDateTime validUntil
) {
}