package com.hikoo_backend.demo.controller;

import com.hikoo_backend.demo.dto.CouponResponse;
import com.hikoo_backend.demo.dto.CreateCouponRequest;
import com.hikoo_backend.demo.dto.UpdateCouponRequest;
import com.hikoo_backend.demo.service.CouponService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coupons")
@RequiredArgsConstructor
public class CouponController {

    private final CouponService couponService;

    // =========================================================
    // CREATE COUPON
    // SUPER_ADMIN / ADMIN
    // =========================================================

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CouponResponse createCoupon(
            @Valid @RequestBody CreateCouponRequest request
    ) {
        return couponService.createCoupon(request);
    }

    // =========================================================
    // GET ALL COUPONS
    // SUPER_ADMIN / ADMIN
    // =========================================================

    @GetMapping
    public List<CouponResponse> getAllCoupons() {
        return couponService.getAllCoupons();
    }

    // =========================================================
    // GET COUPON BY ID
    // SUPER_ADMIN / ADMIN
    // =========================================================

    @GetMapping("/{id}")
    public CouponResponse getCoupon(
            @PathVariable Long id
    ) {
        return couponService.getCoupon(id);
    }

    // =========================================================
    // UPDATE COUPON
    // SUPER_ADMIN / ADMIN
    // =========================================================

    @PutMapping("/{id}")
    public CouponResponse updateCoupon(
            @PathVariable Long id,
            @Valid @RequestBody UpdateCouponRequest request
    ) {
        return couponService.updateCoupon(id, request);
    }

    // =========================================================
    // ACTIVATE / DEACTIVATE
    // SUPER_ADMIN / ADMIN
    // =========================================================

    @PatchMapping("/{id}/status")
    public CouponResponse updateCouponStatus(
            @PathVariable Long id,
            @RequestParam boolean active
    ) {
        return couponService.updateCouponStatus(id, active);
    }

    // =========================================================
    // DELETE COUPON
    // SUPER_ADMIN / ADMIN
    // =========================================================

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCoupon(
            @PathVariable Long id
    ) {
        couponService.deleteCoupon(id);
    }
}