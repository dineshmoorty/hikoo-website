package com.hikoo_backend.demo.repository;

import com.hikoo_backend.demo.entity.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CouponRepository extends JpaRepository<Coupon, Long> {

  Optional<Coupon> findByCodeIgnoreCase(String code);

  boolean existsByCodeIgnoreCase(String code);
}