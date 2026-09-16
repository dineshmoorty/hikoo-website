package com.hikoo_backend.demo.repository;

import com.hikoo_backend.demo.entity.StudentCourseEnrollment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudentCourseEnrollmentRepository
        extends JpaRepository<StudentCourseEnrollment, Long> {

    // =========================================================
    // STUDENT ENROLLMENTS
    // =========================================================

    List<StudentCourseEnrollment> findByStudentId(Long studentId);

    // =========================================================
    // ACTIVE COURSE
    // =========================================================

    boolean existsByStudentIdAndActiveTrue(
            Long studentId
    );

    Optional<StudentCourseEnrollment>
    findByStudentIdAndActiveTrue(
            Long studentId
    );

    // =========================================================
    // SAME COURSE
    // =========================================================

    boolean existsByStudentIdAndCourseId(
            Long studentId,
            Long courseId
    );

    // =========================================================
    // COMPLETED PREVIOUS COURSE
    // =========================================================

    boolean existsByStudentIdAndCourseIdAndCompletedTrue(
            Long studentId,
            Long courseId
    );

    // =========================================================
    // EMPLOYEE
    // =========================================================

    List<StudentCourseEnrollment>
    findByEmployeeId(Long employeeId);

    Optional<StudentCourseEnrollment>
    findByStudentIdAndEmployeeId(
            Long studentId,
            Long employeeId
    );

    Optional<StudentCourseEnrollment>
    findByIdAndEmployeeId(
            Long enrollmentId,
            Long employeeId
    );
}