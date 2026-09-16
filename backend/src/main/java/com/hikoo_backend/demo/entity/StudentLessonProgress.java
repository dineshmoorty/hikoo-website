package com.hikoo_backend.demo.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "student_lesson_progress",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_enrollment_lesson",
                columnNames = {"enrollment_id", "lesson_id"}
        )
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentLessonProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // =========================================================
    // STUDENT ENROLLMENT
    // =========================================================

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "enrollment_id", nullable = false)
    private StudentCourseEnrollment enrollment;

    // =========================================================
    // LESSON
    // =========================================================

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "lesson_id", nullable = false)
    private CourseLesson lesson;

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