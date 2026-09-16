package com.hikoo_backend.demo.service;

import com.hikoo_backend.demo.dto.StudentResponse;
import com.hikoo_backend.demo.dto.UpdateMyStudentProfileRequest;
import com.hikoo_backend.demo.entity.Role;
import com.hikoo_backend.demo.entity.StudentProfile;
import com.hikoo_backend.demo.entity.User;
import com.hikoo_backend.demo.repository.StudentProfileRepository;
import com.hikoo_backend.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class StudentProfileService {

    private final UserRepository userRepository;
    private final StudentProfileRepository studentProfileRepository;

    // =========================================================
    // GET MY PROFILE
    // =========================================================

    @Transactional
    public StudentResponse getMyProfile(
            Authentication authentication
    ) {

        User user = getAuthenticatedStudent(authentication);

        StudentProfile profile =
                studentProfileRepository
                        .findByUserId(user.getId())
                        .orElseGet(() -> createEmptyProfile(user));

        return toResponse(user, profile);
    }

    // =========================================================
    // UPDATE MY PROFILE
    // =========================================================

    @Transactional
    public StudentResponse updateMyProfile(
            Authentication authentication,
            UpdateMyStudentProfileRequest request
    ) {

        User user = getAuthenticatedStudent(authentication);

        StudentProfile profile =
                studentProfileRepository
                        .findByUserId(user.getId())
                        .orElseGet(() ->
                                StudentProfile.builder()
                                        .user(user)
                                        .profileCompleted(false)
                                        .build()
                        );

        // =====================================================
        // INSTITUTION + REGISTER NUMBER
        // =====================================================

        String institutionName =
                clean(request.institutionName());

        String registerNumber =
                clean(request.registerNumber());

        if (!hasText(institutionName)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Institution name is required"
            );
        }

        if (!hasText(registerNumber)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Register number is required"
            );
        }

        // =====================================================
        // DUPLICATE STUDENT CHECK
        // Institution + Register Number
        // =====================================================

        boolean duplicate =
                studentProfileRepository
                        .existsByInstitutionNameAndRegisterNumberAndIdNot(
                                institutionName,
                                registerNumber,
                                profile.getId()
                        );

        if (duplicate) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "A student with this institution and register number already exists"
            );
        }

        // =====================================================
        // UPDATE PROFILE
        // =====================================================

        profile.setInstitutionName(institutionName);
        profile.setRegisterNumber(registerNumber);

        profile.setPhone(
                clean(request.phone())
        );

        profile.setProgram(
                clean(request.program())
        );

        profile.setAddress(
                clean(request.address())
        );

        profile.setCity(
                clean(request.city())
        );

        profile.setState(
                clean(request.state())
        );

        profile.setPincode(
                clean(request.pincode())
        );

        // =====================================================
        // PROFILE COMPLETION
        // =====================================================

        profile.setProfileCompleted(
                isComplete(profile)
        );

        // =====================================================
        // SAVE
        // =====================================================

        StudentProfile savedProfile =
                studentProfileRepository.save(profile);

        return toResponse(user, savedProfile);
    }

    // =========================================================
    // GET AUTHENTICATED STUDENT
    // =========================================================

    private User getAuthenticatedStudent(
            Authentication authentication
    ) {

        if (authentication == null ||
                authentication.getName() == null) {

            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Authentication required"
            );
        }

        User user =
                userRepository
                        .findByEmail(
                                authentication
                                        .getName()
                                        .toLowerCase()
                        )
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.UNAUTHORIZED,
                                        "User not found"
                                )
                        );

        // =====================================================
        // ROLE CHECK
        // =====================================================

        if (user.getRole() != Role.STUDENT) {

            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Only STUDENT can access this profile"
            );
        }

        // =====================================================
        // ACTIVE CHECK
        // =====================================================

        if (!user.getActive()) {

            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Account is inactive"
            );
        }

        return user;
    }

    // =========================================================
    // CREATE EMPTY PROFILE
    // =========================================================

    private StudentProfile createEmptyProfile(User user) {

        StudentProfile profile =
                StudentProfile.builder()
                        .user(user)
                        .profileCompleted(false)
                        .build();

        return studentProfileRepository.save(profile);
    }

    // =========================================================
    // PROFILE COMPLETION CHECK
    // =========================================================

    private boolean isComplete(
        StudentProfile profile
    ) {

        return hasText(profile.getPhone())
                && hasText(profile.getInstitutionName())
                && hasText(profile.getRegisterNumber())
                && hasText(profile.getProgram())
                && hasText(profile.getAddress())
                && hasText(profile.getCity())
                && hasText(profile.getState())
                && hasText(profile.getPincode());
    }

    // =========================================================
    // TEXT VALIDATION
    // =========================================================

    private boolean hasText(String value) {

        return value != null &&
                !value.trim().isEmpty();
    }

    // =========================================================
    // CLEAN TEXT
    // =========================================================

    private String clean(String value) {

        return value == null
                ? null
                : value.trim();
    }

    // =========================================================
    // ENTITY → RESPONSE
    // =========================================================

    private StudentResponse toResponse(
            User user,
            StudentProfile profile
    ) {

        return new StudentResponse(
                profile.getId(),
                user.getId(),
                user.getName(),
                user.getEmail(),

                profile.getPhone(),

                // Academic identity
                profile.getInstitutionName(),
                profile.getRegisterNumber(),

                profile.getProgram(),

                profile.getAddress(),
                profile.getCity(),
                profile.getState(),
                profile.getPincode(),

                profile.getProfileCompleted(),
                user.getActive()
        );
    }
}