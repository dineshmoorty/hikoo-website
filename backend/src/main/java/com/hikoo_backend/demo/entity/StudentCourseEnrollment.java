package com.hikoo_backend.demo.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(
    name = "student_course_enrollments",
    uniqueConstraints = @UniqueConstraint(
            name = "uk_student_course",
            columnNames = {"student_id", "course_id"}
    )
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentCourseEnrollment {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

// =========================================================
// STUDENT
// =========================================================

@ManyToOne(fetch = FetchType.LAZY, optional = false)
@JoinColumn(name = "student_id", nullable = false)
private User student;

// =========================================================
// COURSE
// =========================================================

@ManyToOne(fetch = FetchType.LAZY, optional = false)
@JoinColumn(name = "course_id", nullable = false)
private Course course;

// =========================================================
// ASSIGNED EMPLOYEE / MENTOR
// =========================================================

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "employee_id")
private User employee;

// =========================================================
// ACTIVE
// =========================================================

@Column(nullable = false)
@Builder.Default
private Boolean active = true;

// =========================================================
// COMPLETION
// =========================================================

@Column(nullable = false)
@Builder.Default
private Boolean completed = false;

private LocalDateTime completedAt;

// =========================================================
// DATES
// =========================================================

@Column(nullable = false, updatable = false)
@Builder.Default
private LocalDateTime enrolledAt = LocalDateTime.now();

private LocalDateTime assignedAt;

private LocalDateTime updatedAt;

// =========================================================
// COURSE SCHEDULE
// =========================================================

@Column(name = "start_date")
private LocalDate startDate;

@Column(name = "end_date")
private LocalDate endDate;

// =========================================================
// ENROLLMENT STATUS
// =========================================================

@Enumerated(EnumType.STRING)
@Column(nullable = false, length = 30)
@Builder.Default
private EnrollmentStatus status = EnrollmentStatus.SCHEDULED;

// =========================================================
// PRICE SNAPSHOT
// =========================================================

@Column(
    name = "course_fee",
    precision = 12,
    scale = 2
)
@Builder.Default
private BigDecimal courseFee = BigDecimal.ZERO;

@Column(
    name = "discount_percentage",
    precision = 5,
    scale = 2
)
@Builder.Default
private BigDecimal discountPercentage = BigDecimal.ZERO;

@Column(
    name = "discount_amount",
    precision = 12,
    scale = 2
)
@Builder.Default
private BigDecimal discountAmount = BigDecimal.ZERO;

@Column(
    name = "gst_percentage",
    precision = 5,
    scale = 2
)
@Builder.Default
private BigDecimal gstPercentage = BigDecimal.ZERO;

@Column(
    name = "gst_amount",
    precision = 12,
    scale = 2
)
@Builder.Default
private BigDecimal gstAmount = BigDecimal.ZERO;

@Column(
    name = "final_amount",
    precision = 12,
    scale = 2
)
@Builder.Default
private BigDecimal finalAmount = BigDecimal.ZERO;

// =========================================================
// APPLIED COUPON
// =========================================================

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "coupon_id")
private Coupon coupon;

// =========================================================
// UPDATE TIMESTAMP
// =========================================================

@PreUpdate
public void onUpdate() {
    updatedAt = LocalDateTime.now();
}
}