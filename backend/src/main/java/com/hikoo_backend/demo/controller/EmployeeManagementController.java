package com.hikoo_backend.demo.controller;

import com.hikoo_backend.demo.dto.CreateEmployeeRequest;
import com.hikoo_backend.demo.dto.EmployeeResponse;
import com.hikoo_backend.demo.dto.UpdateEmployeeRequest;
import com.hikoo_backend.demo.service.SuperAdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class EmployeeManagementController {

    private final SuperAdminService superAdminService;

    // ================================
    // CREATE EMPLOYEE
    // SUPER ADMIN ONLY
    // ================================

    @PostMapping
    public ResponseEntity<?> createEmployee(
            @Valid @RequestBody CreateEmployeeRequest request
    ) {
        return ResponseEntity.ok(
                superAdminService.createEmployee(request)
        );
    }

    // ================================
    // GET ALL EMPLOYEES
    // ADMIN + SUPER ADMIN
    // ================================

    @GetMapping
    public ResponseEntity<List<EmployeeResponse>> getAllEmployees() {

        return ResponseEntity.ok(
                superAdminService.getAllEmployees()
        );
    }

    // ================================
    // GET EMPLOYEE
    // ADMIN + SUPER ADMIN
    // ================================

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponse> getEmployee(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                superAdminService.getEmployee(id)
        );
    }

    // ================================
    // UPDATE EMPLOYEE
    // ADMIN + SUPER ADMIN
    // ================================

    @PatchMapping("/{id}")
    public ResponseEntity<EmployeeResponse> updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody UpdateEmployeeRequest request
    ) {

        return ResponseEntity.ok(
                superAdminService.updateEmployee(id, request)
        );
    }

    // ================================
    // ACTIVE / INACTIVE
    // ADMIN + SUPER ADMIN
    // ================================

    @PatchMapping("/{id}/status")
    public ResponseEntity<EmployeeResponse> updateEmployeeStatus(
            @PathVariable Long id,
            @RequestParam boolean active
    ) {

        return ResponseEntity.ok(
                superAdminService.updateEmployeeStatus(id, active)
        );
    }
}