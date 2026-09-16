package com.hikoo_backend.demo.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "course_lessons",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_module_lesson_order",
                columnNames = {"module_id", "lesson_order"}
        )
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseLesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // =========================================================
    // MODULE
    // =========================================================

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "module_id", nullable = false)
    private CourseModule module;

    // =========================================================
    // LESSON DETAILS
    // =========================================================

    @Column(nullable = false, length = 200)
    private String title;

    @Column(length = 2000)
    private String description;

    @Column(name = "lesson_order", nullable = false)
    private Integer lessonOrder;

    @Column(columnDefinition = "TEXT")
    private String content;

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

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}