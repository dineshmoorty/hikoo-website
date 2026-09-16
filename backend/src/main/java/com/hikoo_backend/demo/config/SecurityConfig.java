package com.hikoo_backend.demo.security;

import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.hikoo_backend.demo.security.JwtAuthenticationFilter;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http
                // =================================================
                // CSRF
                // =================================================
                .csrf(csrf -> csrf.disable())

                // =================================================
                // CORS
                // =================================================
                .cors(cors -> cors.configurationSource(
                        corsConfigurationSource()
                ))

                // =================================================
                // SESSION
                // =================================================
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                // =================================================
                // AUTHORIZATION
                // =================================================
                .authorizeHttpRequests(auth -> auth

                        // =================================================
                        // OPTIONS
                        // =================================================
                        .requestMatchers(
                                HttpMethod.OPTIONS,
                                "/**"
                        ).permitAll()

                        // =================================================
                        // AUTH
                        // =================================================
                        .requestMatchers(
                                "/api/auth/register",
                                "/api/auth/login"
                        ).permitAll()

                        // =================================================
                        // SUPER ADMIN
                        // =================================================
                        .requestMatchers(
                                "/api/super-admin/**"
                        ).hasRole("SUPER_ADMIN")

                        // =================================================
                        // ADMIN PROFILE
                        // =================================================
                        .requestMatchers(
                                "/api/admin/profile/**"
                        ).hasRole("ADMIN")

                        // =================================================
                        // ADMIN STUDENTS
                        // =================================================
                        .requestMatchers(
                                "/api/admin/students/**"
                        ).hasRole("ADMIN")

                        // =================================================
                        // ADMIN ASSIGNMENTS
                        // =================================================
                        // Supports both possible authority formats:
                        // ROLE_ADMIN
                        // ADMIN
                        .requestMatchers(
                                "/api/admin/assignments/**"
                        ).hasAnyAuthority(
                                "ROLE_ADMIN",
                                "ADMIN"
                        )

                        // =================================================
                        // EMPLOYEES
                        // =================================================

                        // Create employee - Super Admin only
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/employees"
                        ).hasRole("SUPER_ADMIN")

                        // View / update / status - Admin + Super Admin
                        .requestMatchers(
                                "/api/employees/**"
                        ).hasAnyRole(
                                "SUPER_ADMIN",
                                "ADMIN"
                        )

                        // =================================================
                        // EMPLOYEE PROFILE
                        // =================================================
                        .requestMatchers(
                                "/api/employee/profile/**"
                        ).hasRole("EMPLOYEE")

                        .requestMatchers(
                                "/api/employee/**"
                        ).hasRole("EMPLOYEE")

                        // =================================================
                        // STUDENT PROFILE
                        // =================================================
                        .requestMatchers(
                                "/api/student/profile/**"
                        ).hasRole("STUDENT")

                        // =================================================
                        // COURSES
                        // =================================================

                        // Create course - Super Admin only
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/courses"
                        ).hasRole("SUPER_ADMIN")

                        // Admin course management
                        .requestMatchers(
                                "/api/admin/courses/**"
                        ).hasRole("ADMIN")

                        // Course activate / deactivate
                        .requestMatchers(
                                HttpMethod.PATCH,
                                "/api/courses/*/status"
                        ).hasAnyRole(
                                "SUPER_ADMIN",
                                "ADMIN"
                        )

                        // Course update - Super Admin only
                        .requestMatchers(
                                HttpMethod.PATCH,
                                "/api/courses/*"
                        ).hasRole("SUPER_ADMIN")

                        // Course view
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/courses/**"
                        ).hasAnyRole(
                                "SUPER_ADMIN",
                                "ADMIN",
                                "EMPLOYEE",
                                "STUDENT"
                        )

                        // =================================================
                        // COURSE MODULES
                        // =================================================

                        // Create module - Super Admin only
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/course-modules"
                        ).hasRole("SUPER_ADMIN")

                        // Admin module management
                        .requestMatchers(
                                "/api/admin/course-modules/**"
                        ).hasRole("ADMIN")

                        // Update module - Super Admin only
                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/course-modules/*"
                        ).hasRole("SUPER_ADMIN")

                        // Activate / deactivate module
                        .requestMatchers(
                                HttpMethod.PATCH,
                                "/api/course-modules/*/status"
                        ).hasRole("SUPER_ADMIN")

                        // View modules
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/course-modules/**"
                        ).hasAnyRole(
                                "SUPER_ADMIN",
                                "ADMIN",
                                "EMPLOYEE",
                                "STUDENT"
                        )

                        // =================================================
                        // LESSONS
                        // =================================================

                        // Create lesson - Super Admin only
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/course-lessons"
                        ).hasRole("SUPER_ADMIN")

                        // Admin lesson management
                        .requestMatchers(
                                "/api/admin/course-lessons/**"
                        ).hasRole("ADMIN")

                        // Update lesson - Super Admin only
                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/course-lessons/*"
                        ).hasRole("SUPER_ADMIN")

                        // Activate / deactivate lesson
                        .requestMatchers(
                                HttpMethod.PATCH,
                                "/api/course-lessons/*/status"
                        ).hasRole("SUPER_ADMIN")

                        // View lessons
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/course-lessons/**"
                        ).hasAnyRole(
                                "SUPER_ADMIN",
                                "ADMIN",
                                "EMPLOYEE",
                                "STUDENT"
                        )

                        // =================================================
                        // COUPONS
                        // =================================================
                        .requestMatchers(
                                "/api/coupons/**"
                        ).hasAnyRole(
                                "SUPER_ADMIN",
                                "ADMIN"
                        )

                        // =================================================
                        // STUDENT PROGRESS
                        // =================================================

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/student/progress/lesson/complete"
                        ).hasRole("STUDENT")

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/student/progress/course"
                        ).hasRole("STUDENT")

                        // =================================================
                        // STUDENT ENROLLMENT
                        // =================================================

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/enrollments"
                        ).hasRole("STUDENT")

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/enrollments/my"
                        ).hasRole("STUDENT")

                        // =================================================
                        // EMPLOYEE ENROLLMENT
                        // =================================================

                        .requestMatchers(
                                HttpMethod.PATCH,
                                "/api/enrollments/*/complete"
                        ).hasRole("EMPLOYEE")

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/enrollments/my-assigned"
                        ).hasRole("EMPLOYEE")

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/enrollments/my-assigned/student/*"
                        ).hasRole("EMPLOYEE")

                        // Employee course access
                        .requestMatchers("/api/employee/courses/**").hasRole("EMPLOYEE")

                        // Admin + Super Admin course assignment management
                        .requestMatchers("/api/employee-course-assignments/**")
                        .hasAnyRole("ADMIN", "SUPER_ADMIN")

                        // =================================================
                        // ADMIN / SUPER ADMIN ENROLLMENT
                        // =================================================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/enrollments"
                        ).hasAnyRole(
                                "ADMIN",
                                "SUPER_ADMIN"
                        )

                        .requestMatchers(
                                HttpMethod.PATCH,
                                "/api/enrollments/*/employee"
                        ).hasAnyRole(
                                "ADMIN",
                                "SUPER_ADMIN"
                        )

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/enrollments/student/*"
                        ).hasAnyRole(
                                "ADMIN",
                                "SUPER_ADMIN"
                        )

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/enrollments/employee/*"
                        ).hasAnyRole(
                                "ADMIN",
                                "SUPER_ADMIN"
                        )

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/enrollments/*"
                        ).hasAnyRole(
                                "ADMIN",
                                "SUPER_ADMIN"
                        )

                        // =================================================
                        // ATTENDANCE - ADMIN / SUPER ADMIN MANAGEMENT
                        // =================================================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/attendance/admin"
                        ).hasAnyRole(
                                "ADMIN",
                                "SUPER_ADMIN"
                        )

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/attendance/*"
                        ).hasAnyRole(
                                "ADMIN",
                                "SUPER_ADMIN"
                        )

                        .requestMatchers(
                                HttpMethod.PATCH,
                                "/api/attendance/*/status"
                        ).hasAnyRole(
                                "ADMIN",
                                "SUPER_ADMIN"
                        )

                        // =================================================
                        // ATTENDANCE
                        // =================================================

                        // Employee + Admin + Super Admin
                        // can mark attendance.
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/attendance"
                        ).hasAnyRole(
                                "EMPLOYEE",
                                "ADMIN",
                                "SUPER_ADMIN"
                        )

                        // Employee attendance views
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/attendance/student/*"
                        ).hasRole("EMPLOYEE")

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/attendance/enrollment/*"
                        ).hasRole("EMPLOYEE")

                        // Student own attendance
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/attendance/my"
                        ).hasRole("STUDENT")

                        // =================================================
                        // EVERYTHING ELSE
                        // =================================================
                        .anyRequest().authenticated()
                )

                // =================================================
                // JWT FILTER
                // =================================================
                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    // =========================================================
    // CORS CONFIGURATION
    // =========================================================

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of("http://localhost:3000")
        );

        configuration.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "PATCH",
                        "DELETE",
                        "OPTIONS"
                )
        );

        configuration.setAllowedHeaders(
                List.of(
                        "Authorization",
                        "Content-Type"
                )
        );

        configuration.setExposedHeaders(
                List.of("Authorization")
        );

        configuration.setAllowCredentials(false);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return source;
    }

    // =========================================================
    // PASSWORD ENCODER
    // =========================================================

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // =========================================================
    // AUTHENTICATION MANAGER
    // =========================================================

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration
    ) throws Exception {

        return configuration.getAuthenticationManager();
    }
}