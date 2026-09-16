package com.hikoo_backend.demo.repository;

import com.hikoo_backend.demo.entity.AdminProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminProfileRepository
        extends JpaRepository<AdminProfile, Long> {

    Optional<AdminProfile> findByUserId(Long userId);

    boolean existsByUserId(Long userId);
}