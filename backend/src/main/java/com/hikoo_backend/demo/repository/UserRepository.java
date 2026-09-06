package com.hikoo_backend.demo.repository;

import com.hikoo_backend.demo.entity.Role;
import com.hikoo_backend.demo.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    long countByRole(Role role);

    long countByActive(Boolean active);
}