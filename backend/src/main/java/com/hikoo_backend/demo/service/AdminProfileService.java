package com.hikoo_backend.demo.service;

import com.hikoo_backend.demo.dto.AdminProfileResponse;
import com.hikoo_backend.demo.dto.UpdateAdminProfileRequest;
import com.hikoo_backend.demo.entity.AdminProfile;
import com.hikoo_backend.demo.entity.Role;
import com.hikoo_backend.demo.entity.User;
import com.hikoo_backend.demo.repository.AdminProfileRepository;
import com.hikoo_backend.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AdminProfileService {

    private final UserRepository userRepository;
    private final AdminProfileRepository adminProfileRepository;

    @Transactional(readOnly = true)
    public AdminProfileResponse getMyProfile(Authentication authentication) {

        User user = getAuthenticatedAdmin(authentication);

        AdminProfile profile = adminProfileRepository
                .findByUserId(user.getId())
                .orElseGet(() -> createEmptyProfile(user));

        return toResponse(user, profile);
    }

    @Transactional
    public AdminProfileResponse updateMyProfile(
            Authentication authentication,
            UpdateAdminProfileRequest request
    ) {

        User user = getAuthenticatedAdmin(authentication);

        AdminProfile profile = adminProfileRepository
                .findByUserId(user.getId())
                .orElseGet(() ->
                        AdminProfile.builder()
                                .user(user)
                                .profileCompleted(false)
                                .build()
                );

        profile.setPhone(clean(request.getPhone()));
        profile.setAddress(clean(request.getAddress()));
        profile.setCity(clean(request.getCity()));
        profile.setState(clean(request.getState()));
        profile.setPincode(clean(request.getPincode()));

        profile.setProfileCompleted(isComplete(profile));

        AdminProfile savedProfile =
                adminProfileRepository.save(profile);

        return toResponse(user, savedProfile);
    }

    private User getAuthenticatedAdmin(Authentication authentication) {

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

        if (user.getRole() != Role.ADMIN) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Only ADMIN can access this profile"
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

    private AdminProfile createEmptyProfile(User user) {

        AdminProfile profile = AdminProfile.builder()
                .user(user)
                .profileCompleted(false)
                .build();

        return adminProfileRepository.save(profile);
    }

    private boolean isComplete(AdminProfile profile) {

        return hasText(profile.getPhone())
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

    private AdminProfileResponse toResponse(
            User user,
            AdminProfile profile
    ) {

        return AdminProfileResponse.builder()
                .userId(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .phone(profile.getPhone())
                .address(profile.getAddress())
                .city(profile.getCity())
                .state(profile.getState())
                .pincode(profile.getPincode())
                .profileCompleted(
                        Boolean.TRUE.equals(profile.getProfileCompleted())
                )
                .build();
    }
}