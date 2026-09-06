package com.hikoo_backend.demo.repository;

import com.hikoo_backend.demo.entity.StudentCourseEnrollment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudentCourseEnrollmentRepository
        extends JpaRepository<StudentCourseEnrollment, Long> {

    List<StudentCourseEnrollment> findByStudentId(Long studentId);

    List<StudentCourseEnrollment> findByEmployeeId(Long employeeId);

    boolean existsByStudentIdAndCourseId(
            Long studentId,
            Long courseId
    );

    Optional<StudentCourseEnrollment> findByIdAndEmployeeId(
            Long id,
            Long employeeId
    );

    Optional<StudentCourseEnrollment> findByStudentIdAndEmployeeId(
            Long studentId,
            Long employeeId
    );
}