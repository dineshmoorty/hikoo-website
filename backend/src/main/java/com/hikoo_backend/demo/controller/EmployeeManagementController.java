package com.hikoo_backend.demo.controller;

import com.hikoo_backend.demo.dto.CreateEmployeeRequest;
import com.hikoo_backend.demo.dto.UserResponse;
import com.hikoo_backend.demo.service.SuperAdminService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class EmployeeManagementController {

    private final SuperAdminService superAdminService;

    // ==========================================
    // CREATE EMPLOYEE
    // ==========================================

    @PostMapping
    public UserResponse createEmployee(
            @Valid @RequestBody CreateEmployeeRequest request
    ) {

        return superAdminService.createEmployee(request);
    }
}