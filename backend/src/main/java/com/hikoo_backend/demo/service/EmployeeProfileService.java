package com.hikoo_backend.demo.service;

import com.hikoo_backend.demo.dto.EmployeeProfileResponse;
import com.hikoo_backend.demo.dto.UpdateEmployeeProfileRequest;
import com.hikoo_backend.demo.entity.EmployeeProfile;
import com.hikoo_backend.demo.entity.Role;
import com.hikoo_backend.demo.entity.User;
import com.hikoo_backend.demo.repository.EmployeeProfileRepository;
import com.hikoo_backend.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class EmployeeProfileService {

    private final UserRepository userRepository;
    private final EmployeeProfileRepository employeeProfileRepository;

    @Transactional(readOnly = true)
    public EmployeeProfileResponse getMyProfile(
            Authentication authentication
    ) {

        User user = getAuthenticatedEmployee(authentication);

        EmployeeProfile profile = employeeProfileRepository
                .findByUserId(user.getId())
                .orElseGet(() -> createEmptyProfile(user));

        return toResponse(user, profile);
    }

    @Transactional
    public EmployeeProfileResponse updateMyProfile(
            Authentication authentication,
            UpdateEmployeeProfileRequest request
    ) {

        User user = getAuthenticatedEmployee(authentication);

        EmployeeProfile profile = employeeProfileRepository
                .findByUserId(user.getId())
                .orElseGet(() ->
                        EmployeeProfile.builder()
                                .user(user)
                                .profileCompleted(false)
                                .build()
                );

        // Employee can update ONLY personal information.
        profile.setPhone(clean(request.getPhone()));
        profile.setAddress(clean(request.getAddress()));
        profile.setCity(clean(request.getCity()));
        profile.setState(clean(request.getState()));
        profile.setPincode(clean(request.getPincode()));

        // Designation / specialization / department
        // are intentionally NOT changed here.

        profile.setProfileCompleted(isComplete(profile));

        EmployeeProfile savedProfile =
                employeeProfileRepository.save(profile);

        return toResponse(user, savedProfile);
    }

    private User getAuthenticatedEmployee(
            Authentication authentication
    ) {

        if (authentication == null ||
                authentication.getName() == null) {

            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Authentication required"
            );
        }

        User user = userRepository
                .findByEmail(authentication.getName().toLowerCase())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.UNAUTHORIZED,
                                "User not found"
                        )
                );

        if (user.getRole() != Role.EMPLOYEE) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Only EMPLOYEE can access this profile"
            );
        }

        if (!user.getActive()) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Account is inactive"
            );
        }

        return user;
    }

    private EmployeeProfile createEmptyProfile(User user) {

        EmployeeProfile profile = EmployeeProfile.builder()
                .user(user)
                .profileCompleted(false)
                .build();

        return employeeProfileRepository.save(profile);
    }

    private boolean isComplete(EmployeeProfile profile) {

        /*
         * Employee profile is considered complete only when
         * organizational information AND personal information
         * are available.
         */
        return hasText(profile.getDesignation())
                && hasText(profile.getSpecialization())
                && hasText(profile.getDepartment())
                && hasText(profile.getPhone())
                && hasText(profile.getAddress())
                && hasText(profile.getCity())
                && hasText(profile.getState())
                && hasText(profile.getPincode());
    }

    private boolean hasText(String value) {
        return value != null && !value.trim().isEmpty();
    }

    private String clean(String value) {
        return value == null ? null : value.trim();
    }

    private EmployeeProfileResponse toResponse(
            User user,
            EmployeeProfile profile
    ) {

        return EmployeeProfileResponse.builder()
                .userId(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .designation(profile.getDesignation())
                .specialization(profile.getSpecialization())
                .department(profile.getDepartment())
                .phone(profile.getPhone())
                .address(profile.getAddress())
                .city(profile.getCity())
                .state(profile.getState())
                .pincode(profile.getPincode())
                .profileCompleted(
                        Boolean.TRUE.equals(
                                profile.getProfileCompleted()
                        )
                )
                .build();
    }
}