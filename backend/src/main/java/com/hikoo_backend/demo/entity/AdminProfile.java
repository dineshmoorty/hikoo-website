package com.hikoo_backend.demo.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "admin_profiles",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_admin_profile_user",
                columnNames = "user_id"
        )
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // ============================================================
    // USER
    // ============================================================

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "user_id",
            nullable = false,
            unique = true
    )
    private User user;


    // ============================================================
    // PERSONAL INFORMATION
    // ============================================================

    private String phone;

    private String address;

    private String city;

    private String state;

    private String pincode;


    // ============================================================
    // PROFILE STATUS
    // ============================================================

    @Column(nullable = false)
    @Builder.Default
    private Boolean profileCompleted = false;


    // ============================================================
    // TIMESTAMPS
    // ============================================================

    @Column(nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime createdAt =
            LocalDateTime.now();

    private LocalDateTime updatedAt;


    // ============================================================
    // UPDATE TIMESTAMP
    // ============================================================

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}