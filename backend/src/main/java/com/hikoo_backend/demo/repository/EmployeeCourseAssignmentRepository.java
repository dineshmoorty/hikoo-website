package com.hikoo_backend.demo.repository;

import com.hikoo_backend.demo.entity.EmployeeCourseAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface EmployeeCourseAssignmentRepository
        extends JpaRepository<EmployeeCourseAssignment, Long> {

    List<EmployeeCourseAssignment>
    findByEmployeeIdAndCourseActiveTrueOrderByCourseCourseOrderAsc(Long employeeId);

    boolean existsByEmployeeIdAndCourseId(Long employeeId, Long courseId);

    Optional<EmployeeCourseAssignment>
    findByEmployeeIdAndCourseId(Long employeeId, Long courseId);
}
