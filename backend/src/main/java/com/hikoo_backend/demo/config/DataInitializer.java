package com.hikoo_backend.demo.config;

import com.hikoo_backend.demo.entity.User;
import com.hikoo_backend.demo.entity.Role;
import com.hikoo_backend.demo.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.super-admin.name}")
    private String superAdminName;

    @Value("${app.super-admin.email}")
    private String superAdminEmail;

    @Value("${app.super-admin.password}")
    private String superAdminPassword;

    @Bean
    CommandLineRunner initializeSuperAdmin() {

        return args -> {

            String email = superAdminEmail.toLowerCase().trim();

            if (userRepository.existsByEmail(email)) {

                System.out.println(
                        "SUPER_ADMIN already exists: " + email
                );

                return;
            }

            User superAdmin = User.builder()
                    .name(superAdminName)
                    .email(email)
                    .password(passwordEncoder.encode(superAdminPassword))
                    .role(Role.SUPER_ADMIN)
                    .active(true)
                    .build();

            userRepository.save(superAdmin);

            System.out.println(
                    "=========================================="
            );
            System.out.println(
                    "SUPER_ADMIN created successfully"
            );
            System.out.println(
                    "Email: " + email
            );
            System.out.println(
                    "=========================================="
            );
        };
    }
}