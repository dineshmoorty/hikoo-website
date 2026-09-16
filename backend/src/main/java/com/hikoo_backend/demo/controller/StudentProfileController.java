package com.hikoo_backend.demo.controller;

import com.hikoo_backend.demo.dto.StudentResponse;
import com.hikoo_backend.demo.dto.UpdateMyStudentProfileRequest;
import com.hikoo_backend.demo.service.StudentProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student/profile")
@RequiredArgsConstructor
public class StudentProfileController {

    private final StudentProfileService studentProfileService;

    // ==========================================
    // GET MY PROFILE
    // ==========================================

    @GetMapping
    public ResponseEntity<StudentResponse> getMyProfile(
            Authentication authentication
    ) {
        return ResponseEntity.ok(
                studentProfileService.getMyProfile(authentication)
        );
    }

    // ==========================================
    // UPDATE MY PROFILE
    // ==========================================

    @PutMapping
    public ResponseEntity<StudentResponse> updateMyProfile(
            Authentication authentication,
            @Valid @RequestBody UpdateMyStudentProfileRequest request
    ) {
        return ResponseEntity.ok(
                studentProfileService.updateMyProfile(
                        authentication,
                        request
                )
        );
    }
}