package com.hikoo_backend.demo.dto;

import com.hikoo_backend.demo.entity.CouponApplicableTo;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record CouponResponse(

  Long id,

  String code,

  BigDecimal discountPercentage,

  CouponApplicableTo applicableTo,

  Long courseId,

  String courseName,

  Integer usageLimit,

  Integer usedCount,

  LocalDateTime validFrom,

  LocalDateTime validUntil,

  Boolean active,

  LocalDateTime createdAt,

  LocalDateTime updatedAt
) {
}