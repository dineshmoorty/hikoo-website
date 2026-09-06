package com.hikoo_backend.demo.controller;

import com.hikoo_backend.demo.dto.AssignEmployeeRequest;
import com.hikoo_backend.demo.dto.CreateEnrollmentRequest;
import com.hikoo_backend.demo.dto.EnrollmentResponse;
import com.hikoo_backend.demo.service.StudentCourseEnrollmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {

    private final StudentCourseEnrollmentService enrollmentService;

    // =========================================================
    // STUDENT
    // =========================================================

    /**
     * Logged-in student enrolls themselves into a course.
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EnrollmentResponse enroll(
            Authentication authentication,
            @Valid @RequestBody CreateEnrollmentRequest request
    ) {
        return enrollmentService.enrollStudent(
                authentication.getName(),
                request
        );
    }

    /**
     * Get courses of the logged-in student.
     */
    @GetMapping("/my")
    public List<EnrollmentResponse> getMyEnrollments(
            Authentication authentication
    ) {
        return enrollmentService.getMyEnrollments(
                authentication.getName()
        );
    }

    // =========================================================
    // ADMIN / SUPER ADMIN
    // =========================================================

    /**
     * Get all student course enrollments.
     */
    @GetMapping
    public List<EnrollmentResponse> getAllEnrollments() {
        return enrollmentService.getAllEnrollments();
    }

    /**
     * Assign an employee to a student's course enrollment.
     */
    @PatchMapping("/{id}/employee")
    public EnrollmentResponse assignEmployee(
            @PathVariable Long id,
            @Valid @RequestBody AssignEmployeeRequest request
    ) {
        return enrollmentService.assignEmployee(
                id,
                request
        );
    }

    // =========================================================
    // EMPLOYEE
    // =========================================================

    /**
     * Get only the students assigned to the logged-in employee.
     */
    @GetMapping("/my-assigned")
    public List<EnrollmentResponse> getMyAssignedStudents(
            Authentication authentication
    ) {
        return enrollmentService.getMyAssignedStudents(
                authentication.getName()
        );
    }

    /**
     * Get a specific student only if that student
     * is assigned to the logged-in employee.
     */
    @GetMapping("/my-assigned/student/{studentId}")
    public EnrollmentResponse getStudentForEmployee(
            Authentication authentication,
            @PathVariable Long studentId
    ) {
        return enrollmentService.getStudentForEmployee(
                authentication.getName(),
                studentId
        );
    }

    // =========================================================
    // OPTIONAL ADMIN / SUPER ADMIN ENDPOINTS
    // =========================================================

    /**
     * Get all enrollments belonging to a specific student.
     */
    @GetMapping("/student/{studentId}")
    public List<EnrollmentResponse> getStudentEnrollments(
            @PathVariable Long studentId
    ) {
        return enrollmentService.getStudentEnrollments(
                studentId
        );
    }

    /**
     * Get all enrollments assigned to a specific employee.
     */
    @GetMapping("/employee/{employeeId}")
    public List<EnrollmentResponse> getEmployeeEnrollments(
            @PathVariable Long employeeId
    ) {
        return enrollmentService.getEmployeeEnrollments(
                employeeId
        );
    }

    /**
     * Get one enrollment by ID.
     */
    @GetMapping("/{id}")
    public EnrollmentResponse getEnrollment(
            @PathVariable Long id
    ) {
        return enrollmentService.getEnrollment(id);
    }
}