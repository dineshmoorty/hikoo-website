package com.hikoo_backend.demo.repository;

import com.hikoo_backend.demo.entity.StudentLessonProgress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudentLessonProgressRepository
        extends JpaRepository<StudentLessonProgress, Long> {

    Optional<StudentLessonProgress> findByEnrollmentIdAndLessonId(
            Long enrollmentId,
            Long lessonId
    );

    List<StudentLessonProgress> findByEnrollmentId(
            Long enrollmentId
    );

    List<StudentLessonProgress> findByEnrollmentIdAndCompletedTrue(
            Long enrollmentId
    );

    long countByEnrollmentIdAndCompletedTrue(
            Long enrollmentId
    );

    boolean existsByEnrollmentIdAndLessonId(
            Long enrollmentId,
            Long lessonId
    );
}