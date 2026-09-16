package com.hikoo_backend.demo.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "coupons",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_coupon_code",
                        columnNames = "code"
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Coupon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Coupon code entered by student.
     * Example: SN100
     */
    @Column(nullable = false, unique = true, length = 50)
    private String code;

    /**
     * Discount percentage.
     * Example: 10 = 10%
     */
    @Column(
            name = "discount_percentage",
            nullable = false,
            precision = 5,
            scale = 2
    )
    @Builder.Default
    private BigDecimal discountPercentage = BigDecimal.ZERO;

    /**
     * ALL_COURSES or SPECIFIC_COURSE
     */
    @Enumerated(EnumType.STRING)
    @Column(
            name = "applicable_to",
            nullable = false,
            length = 30
    )
    private CouponApplicableTo applicableTo;

    /**
     * Used only when applicableTo = SPECIFIC_COURSE
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;

    /**
     * Maximum number of times this coupon can be used.
     * NULL = unlimited
     */
    @Column(name = "usage_limit")
    private Integer usageLimit;

    /**
     * Number of times coupon has been used.
     */
    @Column(name = "used_count", nullable = false)
    @Builder.Default
    private Integer usedCount = 0;

    /**
     * Coupon validity start.
     */
    @Column(name = "valid_from")
    private LocalDateTime validFrom;

    /**
     * Coupon validity end.
     */
    @Column(name = "valid_until")
    private LocalDateTime validUntil;

    /**
     * Admin can activate/deactivate coupon.
     */
    @Column(nullable = false)
    @Builder.Default
    private Boolean active = true;

    @Column(nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt;

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}