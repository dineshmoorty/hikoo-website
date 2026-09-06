package com.hikoo_backend.demo.controller;

import com.hikoo_backend.demo.dto.StudentResponse;
import com.hikoo_backend.demo.service.EmployeeStudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.hikoo_backend.demo.dto.UpdateStudentRequest;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/employee/students")
@RequiredArgsConstructor
public class EmployeeStudentController {

    private final EmployeeStudentService employeeStudentService;

    @GetMapping
    public List<StudentResponse> getStudents() {
        return employeeStudentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public StudentResponse getStudent(@PathVariable Long id) {
        return employeeStudentService.getStudent(id);
    }

    @PatchMapping("/{id}")
    public StudentResponse updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody UpdateStudentRequest request
    ) {
        return employeeStudentService.updateStudent(id, request);
    }
}