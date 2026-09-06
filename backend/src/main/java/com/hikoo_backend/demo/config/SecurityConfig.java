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

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    // =========================================================
    // SECURITY FILTER CHAIN
    // =========================================================

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http
                // -------------------------------------------------
                // CSRF
                // -------------------------------------------------
                .csrf(csrf -> csrf.disable())

                // -------------------------------------------------
                // CORS
                // -------------------------------------------------
                .cors(cors -> cors.configurationSource(
                        corsConfigurationSource()
                ))

                // -------------------------------------------------
                // STATELESS SESSION
                // -------------------------------------------------
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                // -------------------------------------------------
                // AUTHORIZATION
                // -------------------------------------------------
                .authorizeHttpRequests(auth -> auth

                        // =================================================
                        // CORS PREFLIGHT
                        // =================================================
                        .requestMatchers(
                                HttpMethod.OPTIONS,
                                "/**"
                        ).permitAll()

                        // =================================================
                        // PUBLIC AUTH
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
                        // EMPLOYEE MANAGEMENT
                        // =================================================
                        .requestMatchers(
                                "/api/employees/**"
                        ).hasAnyRole(
                                "SUPER_ADMIN",
                                "ADMIN"
                        )

                        // =================================================
                        // COURSES
                        // =================================================

                        // Create course
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/courses"
                        ).hasRole("SUPER_ADMIN")

                        // Activate / Deactivate course
                        .requestMatchers(
                                HttpMethod.PATCH,
                                "/api/courses/*/status"
                        ).hasAnyRole(
                                "SUPER_ADMIN",
                                "ADMIN"
                        )

                        // Edit complete course details
                        .requestMatchers(
                                HttpMethod.PATCH,
                                "/api/courses/*"
                        ).hasRole("SUPER_ADMIN")

                        // View courses
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
                        // EMPLOYEE APIs
                        // =================================================
                        .requestMatchers(
                                "/api/employee/**"
                        ).hasRole("EMPLOYEE")

                        // =================================================
                        // STUDENT ENROLLMENT
                        // =================================================

                        // Student enrolls in a course
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/enrollments"
                        ).hasRole("STUDENT")

                        // Student views own enrollments
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/enrollments/my"
                        ).hasRole("STUDENT")

                        // =================================================
                        // EMPLOYEE ENROLLMENT
                        // =================================================

                        // Employee sees only assigned students
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/enrollments/my-assigned"
                        ).hasRole("EMPLOYEE")

                        // Employee views one assigned student
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/enrollments/my-assigned/student/*"
                        ).hasRole("EMPLOYEE")

                        // =================================================
                        // ADMIN / SUPER ADMIN ENROLLMENT MANAGEMENT
                        // =================================================

                        // Admin / Super Admin view all enrollments
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/enrollments"
                        ).hasAnyRole(
                                "ADMIN",
                                "SUPER_ADMIN"
                        )

                        // Admin / Super Admin assign employee
                        .requestMatchers(
                                HttpMethod.PATCH,
                                "/api/enrollments/*/employee"
                        ).hasAnyRole(
                                "ADMIN",
                                "SUPER_ADMIN"
                        )

                        // Admin / Super Admin view student's enrollments
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/enrollments/student/*"
                        ).hasAnyRole(
                                "ADMIN",
                                "SUPER_ADMIN"
                        )

                        // Admin / Super Admin view employee's enrollments
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/enrollments/employee/*"
                        ).hasAnyRole(
                                "ADMIN",
                                "SUPER_ADMIN"
                        )

                        // Admin / Super Admin view one enrollment
                        // IMPORTANT: keep this AFTER the specific routes
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/enrollments/*"
                        ).hasAnyRole(
                                "ADMIN",
                                "SUPER_ADMIN"
                        )

                        // =================================================
                        // ATTENDANCE
                        // =================================================

                        // Employee marks attendance
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/attendance"
                        ).hasRole("EMPLOYEE")

                        // Employee views attendance of assigned student
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/attendance/student/*"
                        ).hasRole("EMPLOYEE")

                        // Employee views attendance of assigned enrollment
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/attendance/enrollment/*"
                        ).hasRole("EMPLOYEE")

                        // Student views own attendance
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/attendance/my"
                        ).hasRole("STUDENT")

                        // =================================================
                        // EVERYTHING ELSE
                        // =================================================
                        .anyRequest().authenticated()
                )

                // -------------------------------------------------
                // JWT FILTER
                // -------------------------------------------------
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
                List.of(
                        "http://localhost:3000"
                )
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
                List.of(
                        "Authorization"
                )
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