package com.hikoo_backend.demo.dto;

import com.hikoo_backend.demo.entity.CouponApplicableTo;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record UpdateCouponRequest(

  String code,

  @DecimalMin(
    value = "0.00",
    message = "Discount cannot be negative"
  )
  @DecimalMax(
    value = "100.00",
    message = "Discount cannot exceed 100%"
  )
  BigDecimal discountPercentage,

  CouponApplicableTo applicableTo,

  Long courseId,

  Integer usageLimit,

  LocalDateTime validFrom,

  LocalDateTime validUntil,

  Boolean active
) {
}