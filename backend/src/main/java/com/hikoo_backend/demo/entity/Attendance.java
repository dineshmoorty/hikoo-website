package com.hikoo_backend.demo.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "attendance",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_attendance_enrollment_date",
                columnNames = {"enrollment_id", "attendance_date"}
        )
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // =========================================================
    // ENROLLMENT
    // =========================================================

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "enrollment_id",
            nullable = false
    )
    private StudentCourseEnrollment enrollment;

    // =========================================================
    // ATTENDANCE DATE
    // =========================================================

    @Column(
            name = "attendance_date",
            nullable = false
    )
    private LocalDate attendanceDate;

    // =========================================================
    // STATUS
    // =========================================================

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AttendanceStatus status;

    // =========================================================
    // REMARKS
    // =========================================================

    @Column(length = 500)
    private String remarks;

    // =========================================================
    // ACTIVE / INACTIVE
    // =========================================================
    @Column(nullable = false)
    @Builder.Default
    private Boolean active = true;

    // =========================================================
    // CREATED / UPDATED
    // =========================================================

    @Column(
            nullable = false,
            updatable = false
    )
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt;

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}