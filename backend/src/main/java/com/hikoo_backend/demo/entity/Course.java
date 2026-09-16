package com.hikoo_backend.demo.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(
name = "courses",
uniqueConstraints = {
        @UniqueConstraint(
                name = "uk_course_order",
                columnNames = "course_order"
        )
}
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Course {

// =========================================================
// ID
// =========================================================

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;


// =========================================================
// COURSE ORDER
// =========================================================

@Column(
        name = "course_order",
        nullable = false,
        unique = true
)
private Integer courseOrder;


// =========================================================
// COURSE NAME
// =========================================================

@Column(nullable = false, length = 255)
private String name;


// =========================================================
// COURSE CODE
// =========================================================

@Column(unique = true, length = 50)
private String code;


// =========================================================
// DESCRIPTION
// =========================================================

@Column(length = 1000)
private String description;


// =========================================================
// DURATION
// =========================================================

@Column(length = 50)
private String duration;

// =========================================================
// COURSE PRICING
// =========================================================

@Column(
name = "base_fee",
precision = 12,
scale = 2
)
@Builder.Default
private java.math.BigDecimal baseFee = java.math.BigDecimal.ZERO;


@Column(
name = "gst_percentage",
precision = 5,
scale = 2
)
@Builder.Default
private java.math.BigDecimal gstPercentage = java.math.BigDecimal.ZERO;

@Column(
    name = "total_fee",
    precision = 12,
    scale = 2
)
@Builder.Default
private BigDecimal totalFee = BigDecimal.ZERO;

// =========================================================
// ACTIVE
// =========================================================

@Column(nullable = false)
@Builder.Default
private Boolean active = true;


// =========================================================
// CREATED AT
// =========================================================

@Column(nullable = false, updatable = false)
@Builder.Default
private LocalDateTime createdAt = LocalDateTime.now();


// =========================================================
// UPDATED AT
// =========================================================

private LocalDateTime updatedAt;


// =========================================================
// UPDATE TIMESTAMP
// =========================================================

@PreUpdate
public void onUpdate() {
updatedAt = LocalDateTime.now();
}
}