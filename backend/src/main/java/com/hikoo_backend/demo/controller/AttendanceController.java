package com.hikoo_backend.demo.controller;

import com.hikoo_backend.demo.dto.AttendanceResponse;
import com.hikoo_backend.demo.dto.CreateAttendanceRequest;
import com.hikoo_backend.demo.service.AttendanceService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    // =========================================================
    // EMPLOYEE - MARK ATTENDANCE
    // =========================================================

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AttendanceResponse markAttendance(
            Authentication authentication,
            @Valid @RequestBody CreateAttendanceRequest request
    ) {

        return attendanceService.markAttendance(
                authentication.getName(),
                request
        );
    }

    // =========================================================
    // EMPLOYEE - STUDENT ATTENDANCE
    // =========================================================

    @GetMapping("/student/{studentId}")
    public List<AttendanceResponse> getStudentAttendance(
            Authentication authentication,
            @PathVariable Long studentId
    ) {

        return attendanceService.getMyStudentAttendance(
                authentication.getName(),
                studentId
        );
    }

    // =========================================================
    // EMPLOYEE - ENROLLMENT ATTENDANCE
    // =========================================================

    @GetMapping("/enrollment/{enrollmentId}")
    public List<AttendanceResponse> getEnrollmentAttendance(
            Authentication authentication,
            @PathVariable Long enrollmentId
    ) {

        return attendanceService.getMyEnrollmentAttendance(
                authentication.getName(),
                enrollmentId
        );
    }

    // =========================================================
    // STUDENT - OWN ATTENDANCE
    // =========================================================

    @GetMapping("/my")
    public List<AttendanceResponse> getMyAttendance(
            Authentication authentication
    ) {

        return attendanceService.getMyAttendance(
                authentication.getName()
        );
    }
}