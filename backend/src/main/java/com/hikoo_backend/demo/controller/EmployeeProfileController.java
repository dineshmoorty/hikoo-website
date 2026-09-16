package com.hikoo_backend.demo.controller;

import com.hikoo_backend.demo.dto.EmployeeProfileResponse;
import com.hikoo_backend.demo.dto.UpdateEmployeeProfileRequest;
import com.hikoo_backend.demo.service.EmployeeProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/employee/profile")
@RequiredArgsConstructor
public class EmployeeProfileController {

    private final EmployeeProfileService employeeProfileService;

    @GetMapping
    public ResponseEntity<EmployeeProfileResponse> getMyProfile(
            Authentication authentication
    ) {

        return ResponseEntity.ok(
                employeeProfileService.getMyProfile(authentication)
        );
    }

    @PutMapping
    public ResponseEntity<EmployeeProfileResponse> updateMyProfile(
            Authentication authentication,
            @Valid @RequestBody UpdateEmployeeProfileRequest request
    ) {

        return ResponseEntity.ok(
                employeeProfileService.updateMyProfile(
                        authentication,
                        request
                )
        );
    }
}