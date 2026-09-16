package com.hikoo_backend.demo.dto;

import java.math.BigDecimal;

public record UpdateCourseRequest(

        String name,

        String code,

        String description,

        String duration,

        BigDecimal baseFee,

        BigDecimal gstPercentage,
                        
        BigDecimal totalFee,

        Boolean active

) {
}