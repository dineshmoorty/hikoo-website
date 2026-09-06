package com.hikoo_backend.demo.controller;

import com.hikoo_backend.demo.dto.*;
import com.hikoo_backend.demo.service.SuperAdminService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/super-admin")
@RequiredArgsConstructor
public class SuperAdminController {

    private final SuperAdminService superAdminService;

    // ==========================================
    // DASHBOARD
    // ==========================================

    @GetMapping("/dashboard")
    public SuperAdminDashboardResponse getDashboardStats() {

        return superAdminService.getDashboardStats();
    }


    // ==========================================
    // GET ALL USERS
    // ==========================================

    @GetMapping("/users")
    public List<UserResponse> getAllUsers() {

        return superAdminService.getAllUsers();
    }


    // ==========================================
    // CREATE ADMIN
    // ==========================================

    @PostMapping("/admins")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse createAdmin(
            @Valid @RequestBody CreateAdminRequest request
    ) {

        return superAdminService.createAdmin(request);
    }

    // ==========================================
    // ADMIN MANAGEMENT
    // ==========================================

    @GetMapping("/admins")
    public List<UserResponse> getAllAdmins() {

        return superAdminService.getAllAdmins();
    }


    @GetMapping("/admins/{id}")
    public UserResponse getAdmin(
            @PathVariable Long id
    ) {

        return superAdminService.getAdmin(id);
    }


    @PatchMapping("/admins/{id}")
    public UserResponse updateAdmin(
            @PathVariable Long id,
            @Valid @RequestBody UpdateAdminRequest request
    ) {

        return superAdminService.updateAdmin(
                id,
                request
        );
    }


    @PatchMapping("/admins/{id}/status")
    public UserResponse updateAdminStatus(
            @PathVariable Long id,
            @RequestParam boolean active
    ) {

        return superAdminService.updateAdminStatus(
                id,
                active
        );
    }


    // ==========================================
    // ACTIVATE / DEACTIVATE USER
    // ==========================================

    @PatchMapping("/users/{id}/status")
    public UserResponse updateUserStatus(
            @PathVariable Long id,
            @RequestParam boolean active
    ) {

        return superAdminService.updateUserStatus(id, active);
    }

    @PostMapping("/employees")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse createEmployee(
            @Valid @RequestBody CreateEmployeeRequest request
    ) {
        return superAdminService.createEmployee(request);
    }

    @GetMapping("/employees")
    public List<EmployeeResponse> getAllEmployees() {
        return superAdminService.getAllEmployees();
    }

    @GetMapping("/employees/{id}")
    public EmployeeResponse getEmployee(@PathVariable Long id) {
        return superAdminService.getEmployee(id);
    }

    @PatchMapping("/employees/{id}")
    public EmployeeResponse updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody UpdateEmployeeRequest request
    ) {
        return superAdminService.updateEmployee(id, request);
    }

    // ==========================================
    // STUDENTS
    // ==========================================

    @GetMapping("/students")
    public List<UserResponse> getAllStudents() {

        return superAdminService.getAllStudents();
    }

    // ==========================================
    // CREATE OFFLINE STUDENT
    // ==========================================

    @PostMapping("/students")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse createStudent(
            @Valid @RequestBody CreateStudentRequest request
    ) {

        return superAdminService.createStudent(request);
    }


    // ==========================================
    // UPDATE STUDENT
    // ==========================================

    @PatchMapping("/students/{id}")
    public UserResponse updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody UpdateStudentRequest request
    ) {

        return superAdminService.updateStudent(id, request);
    }


    // ==========================================
    // ACTIVATE / DEACTIVATE STUDENT
    // ==========================================

    @PatchMapping("/students/{id}/status")
    public UserResponse updateStudentStatus(
            @PathVariable Long id,
            @RequestParam boolean active
    ) {

        return superAdminService.updateStudentStatus(id, active);
    }
}