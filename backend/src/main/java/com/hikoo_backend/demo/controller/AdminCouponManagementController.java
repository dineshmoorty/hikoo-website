package com.hikoo_backend.demo.controller;

import com.hikoo_backend.demo.dto.CouponResponse;
import com.hikoo_backend.demo.dto.UpdateCouponRequest;
import com.hikoo_backend.demo.service.CouponService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/coupons")
@RequiredArgsConstructor
public class AdminCouponManagementController {

private final CouponService couponService;

@GetMapping
public List<CouponResponse> getAllCoupons() {
return couponService.getAllCoupons();
}

@GetMapping("/{id}")
public CouponResponse getCoupon(@PathVariable Long id) {
return couponService.getCoupon(id);
}

@PutMapping("/{id}")
public CouponResponse updateCoupon(
  @PathVariable Long id,
  @Valid @RequestBody UpdateCouponRequest request
) {
return couponService.updateCoupon(id, request);
}

@PatchMapping("/{id}/status")
public CouponResponse updateCouponStatus(
  @PathVariable Long id,
  @RequestParam boolean active
) {
return couponService.updateCouponStatus(id, active);
}
}