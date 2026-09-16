package com.hikoo_backend.demo.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        // =========================================================
        // GET AUTHORIZATION HEADER
        // =========================================================

        final String authHeader =
                request.getHeader("Authorization");

        // No Bearer token
        if (authHeader == null ||
                !authHeader.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);
            return;
        }

        // Extract JWT token
        final String token =
                authHeader.substring(7);

        try {

            // =====================================================
            // EXTRACT USERNAME / EMAIL FROM TOKEN
            // =====================================================

            String email =
                    jwtService.extractUsername(token);

            if (email != null &&
                    SecurityContextHolder
                            .getContext()
                            .getAuthentication() == null) {

                // =================================================
                // LOAD USER FROM DATABASE
                // =================================================

                UserDetails userDetails =
                        userDetailsService
                                .loadUserByUsername(email);

                // =================================================
                // VALIDATE TOKEN
                // =================================================

                if (jwtService.isTokenValid(
                        token,
                        userDetails
                )) {

                    // =============================================
                    // CREATE AUTHENTICATION
                    // =============================================

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );

                    // =============================================
                    // REQUEST DETAILS
                    // =============================================

                    authentication.setDetails(
                            new WebAuthenticationDetailsSource()
                                    .buildDetails(request)
                    );

                    // =============================================
                    // DEBUG LOG
                    // =============================================

                    System.out.println(
                            "=============================================="
                    );

                    System.out.println(
                            "JWT USER = "
                                    + userDetails.getUsername()
                    );

                    System.out.println(
                            "AUTHORITIES = "
                                    + userDetails.getAuthorities()
                    );

                    System.out.println(
                            "REQUEST = "
                                    + request.getMethod()
                                    + " "
                                    + request.getRequestURI()
                    );

                    System.out.println(
                            "JWT AUTHENTICATION CREATED SUCCESSFULLY"
                    );

                    System.out.println(
                            "=============================================="
                    );

                    // =============================================
                    // SET AUTHENTICATION IN SECURITY CONTEXT
                    // =============================================

                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(authentication);
                }
            }

        } catch (Exception e) {

            // =====================================================
            // JWT ERROR
            // =====================================================

            System.out.println(
                    "=============================================="
            );

            System.out.println(
                    "JWT ERROR: "
                            + e.getClass().getName()
            );

            System.out.println(
                    "JWT MESSAGE: "
                            + e.getMessage()
            );

            System.out.println(
                    "=============================================="
            );
        }

        // =========================================================
        // CONTINUE FILTER CHAIN
        // =========================================================

        filterChain.doFilter(request, response);
    }
}