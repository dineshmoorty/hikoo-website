package com.hikoo_backend.demo.controller;

import com.hikoo_backend.demo.dto.AdminProfileResponse;
import com.hikoo_backend.demo.dto.UpdateAdminProfileRequest;
import com.hikoo_backend.demo.service.AdminProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/profile")
@RequiredArgsConstructor
public class AdminProfileController {

    private final AdminProfileService adminProfileService;

    @GetMapping
    public ResponseEntity<AdminProfileResponse> getMyProfile(
            Authentication authentication
    ) {

        return ResponseEntity.ok(
                adminProfileService.getMyProfile(authentication)
        );
    }

    @PutMapping
    public ResponseEntity<AdminProfileResponse> updateMyProfile(
            Authentication authentication,
            @Valid @RequestBody UpdateAdminProfileRequest request
    ) {

        return ResponseEntity.ok(
                adminProfileService.updateMyProfile(
                        authentication,
                        request
                )
        );
    }
}