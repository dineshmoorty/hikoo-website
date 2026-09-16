package com.hikoo_backend.demo.controller;

import com.hikoo_backend.demo.dto.AssignEmployeeCourseRequest;
import com.hikoo_backend.demo.dto.EmployeeCourseAssignmentResponse;
import com.hikoo_backend.demo.service.EmployeeCourseAssignmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee-course-assignments")
@RequiredArgsConstructor
public class EmployeeCourseAssignmentController {

    private final EmployeeCourseAssignmentService service;

    @GetMapping
    public List<EmployeeCourseAssignmentResponse> getAll() {
        return service.getAllAssignments();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EmployeeCourseAssignmentResponse assign(
            @Valid @RequestBody AssignEmployeeCourseRequest request) {
        return service.assignCourse(request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remove(@PathVariable Long id) {
        service.removeAssignment(id);
    }
}
