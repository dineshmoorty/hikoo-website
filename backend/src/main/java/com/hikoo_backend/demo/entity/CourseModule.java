package com.hikoo_backend.demo.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "course_modules",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_course_module_order",
                columnNames = {"course_id", "module_order"}
        )
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseModule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // =========================================================
    // COURSE
    // =========================================================

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    // =========================================================
    // MODULE DETAILS
    // =========================================================

    @Column(nullable = false, length = 200)
    private String title;

    @Column(length = 1000)
    private String description;

    @Column(name = "module_order", nullable = false)
    private Integer moduleOrder;

    // =========================================================
    // STATUS
    // =========================================================

    @Column(nullable = false)
    @Builder.Default
    private Boolean active = true;

    // =========================================================
    // DATES
    // =========================================================

    @Column(nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt;

    // =========================================================
    // UPDATE TIMESTAMP
    // =========================================================

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}