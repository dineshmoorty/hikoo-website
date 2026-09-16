package com.hikoo_backend.demo.service;

import com.hikoo_backend.demo.dto.AuthResponse;
import com.hikoo_backend.demo.dto.LoginRequest;
import com.hikoo_backend.demo.dto.RegisterRequest;
import com.hikoo_backend.demo.entity.AdminProfile;
import com.hikoo_backend.demo.entity.EmployeeProfile;
import com.hikoo_backend.demo.entity.Role;
import com.hikoo_backend.demo.entity.StudentProfile;
import com.hikoo_backend.demo.entity.User;
import com.hikoo_backend.demo.repository.AdminProfileRepository;
import com.hikoo_backend.demo.repository.EmployeeProfileRepository;
import com.hikoo_backend.demo.repository.StudentProfileRepository;
import com.hikoo_backend.demo.repository.UserRepository;
import com.hikoo_backend.demo.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    private final AdminProfileRepository adminProfileRepository;
    private final EmployeeProfileRepository employeeProfileRepository;
    private final StudentProfileRepository studentProfileRepository;


    // ============================================================
    // STUDENT REGISTER
    // ============================================================

    @Transactional
    public AuthResponse register(RegisterRequest request) {

        String email = request.getEmail()
                .trim()
                .toLowerCase();

        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email is already registered");
        }

        User user = User.builder()
                .name(request.getName().trim())
                .email(email)
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.STUDENT)
                .active(true)
                .build();

        User savedUser = userRepository.save(user);

        UserDetails userDetails =
                org.springframework.security.core.userdetails.User
                        .withUsername(savedUser.getEmail())
                        .password(savedUser.getPassword())
                        .roles(savedUser.getRole().name())
                        .build();

        String token = jwtService.generateToken(userDetails);

        /*
         * Student profile is completed separately
         * through the Student Profile page.
         *
         * Registration does NOT automatically
         * complete the student profile.
         */
        boolean profileCompleted = false;

        return new AuthResponse(
                token,
                "Bearer",
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getRole().name(),
                profileCompleted
        );
    }


    // ============================================================
    // LOGIN
    // ============================================================

    public AuthResponse login(LoginRequest request) {

        String email = request.getEmail()
                .trim()
                .toLowerCase();


        // --------------------------------------------------------
        // Authenticate email + password
        // --------------------------------------------------------

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                email,
                                request.getPassword()
                        )
                );


        // --------------------------------------------------------
        // Get actual user
        // --------------------------------------------------------

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );


        // --------------------------------------------------------
        // Check account status
        // --------------------------------------------------------

        if (!user.getActive()) {
            throw new RuntimeException(
                    "Your account is inactive"
            );
        }


        // --------------------------------------------------------
        // JWT user details
        // --------------------------------------------------------

        UserDetails userDetails =
                (UserDetails) authentication.getPrincipal();

        String token =
                jwtService.generateToken(userDetails);


        // --------------------------------------------------------
        // PROFILE COMPLETION
        // --------------------------------------------------------

        boolean profileCompleted =
                getProfileCompleted(user);


        // --------------------------------------------------------
        // RESPONSE
        // --------------------------------------------------------

        return new AuthResponse(
                token,
                "Bearer",
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name(),
                profileCompleted
        );
    }


    // ============================================================
    // PROFILE COMPLETION CHECK
    // ============================================================

    private boolean getProfileCompleted(User user) {


        // --------------------------------------------------------
        // SUPER ADMIN
        // --------------------------------------------------------

        if (user.getRole() == Role.SUPER_ADMIN) {
            return true;
        }


        // --------------------------------------------------------
        // ADMIN
        // --------------------------------------------------------

        if (user.getRole() == Role.ADMIN) {

            return adminProfileRepository
                    .findByUserId(user.getId())
                    .map(profile ->
                            Boolean.TRUE.equals(
                                    profile.getProfileCompleted()
                            )
                    )
                    .orElse(false);
        }


        // --------------------------------------------------------
        // EMPLOYEE
        // --------------------------------------------------------

        if (user.getRole() == Role.EMPLOYEE) {

            return employeeProfileRepository
                    .findByUserId(user.getId())
                    .map(profile ->
                            Boolean.TRUE.equals(
                                    profile.getProfileCompleted()
                            )
                    )
                    .orElse(false);
        }


        // --------------------------------------------------------
        // STUDENT
        // --------------------------------------------------------

        if (user.getRole() == Role.STUDENT) {

            return studentProfileRepository
                    .findByUserId(user.getId())
                    .map(profile ->
                            Boolean.TRUE.equals(
                                    profile.getProfileCompleted()
                            )
                    )
                    .orElse(false);
        }


        return false;
    }
}