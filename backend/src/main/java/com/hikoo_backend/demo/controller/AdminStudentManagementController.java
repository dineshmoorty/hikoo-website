package com.hikoo_backend.demo.controller;

import com.hikoo_backend.demo.dto.UpdateStudentRequest;
import com.hikoo_backend.demo.dto.UserResponse;
import com.hikoo_backend.demo.service.SuperAdminService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/students")
@RequiredArgsConstructor
public class AdminStudentManagementController {

private final SuperAdminService superAdminService;

// ==========================================
// GET ALL STUDENTS
// ==========================================

@GetMapping
public List<UserResponse> getAllStudents() {

return superAdminService.getAllStudents();
}


// ==========================================
// UPDATE STUDENT
// ==========================================

@PatchMapping("/{id}")
public UserResponse updateStudent(
  @PathVariable Long id,
  @Valid @RequestBody UpdateStudentRequest request
) {

return superAdminService.updateStudent(
      id,
      request
);
}


// ==========================================
// ACTIVATE / DEACTIVATE STUDENT
// ==========================================

@PatchMapping("/{id}/status")
public UserResponse updateStudentStatus(
  @PathVariable Long id,
  @RequestParam boolean active
) {

return superAdminService.updateStudentStatus(
      id,
      active
);
}
}