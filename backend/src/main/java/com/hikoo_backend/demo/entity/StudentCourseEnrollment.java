package com.hikoo_backend.demo.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "student_course_enrollments",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_student_course",
                        columnNames = {"student_id", "course_id"}
                )
        }
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

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private User employee;

    @Column(nullable = false)
    @Builder.Default
    private Boolean active = true;

    @Column(nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime enrolledAt = LocalDateTime.now();

    private LocalDateTime assignedAt;

    private LocalDateTime updatedAt;

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}