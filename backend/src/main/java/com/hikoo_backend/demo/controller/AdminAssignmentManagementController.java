package com.hikoo_backend.demo.controller;

import com.hikoo_backend.demo.dto.AssignEmployeeRequest;
import com.hikoo_backend.demo.dto.EnrollmentResponse;
import com.hikoo_backend.demo.service.StudentCourseEnrollmentService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/assignments")
@RequiredArgsConstructor
public class AdminAssignmentManagementController {

    private final StudentCourseEnrollmentService enrollmentService;

    // =========================================================
    // GET ALL ASSIGNMENTS
    // =========================================================

    @GetMapping
    public List<EnrollmentResponse> getAllAssignments() {

        return enrollmentService.getAllEnrollments();
    }

    // =========================================================
    // ASSIGN / REASSIGN EMPLOYEE
    // =========================================================

    @PatchMapping("/{enrollmentId}/employee")
    public EnrollmentResponse assignEmployee(
            @PathVariable Long enrollmentId,
            @Valid @RequestBody AssignEmployeeRequest request
    ) {

        return enrollmentService.assignEmployee(
                enrollmentId,
                request
        );
    }

    // =========================================================
    // REMOVE EMPLOYEE ASSIGNMENT
    // =========================================================

    @PatchMapping("/{enrollmentId}/remove")
    public EnrollmentResponse removeEmployeeAssignment(
            @PathVariable Long enrollmentId
    ) {

        return enrollmentService.removeEmployeeAssignment(
                enrollmentId
        );
    }
}