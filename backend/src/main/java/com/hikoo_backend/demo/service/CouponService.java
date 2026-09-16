package com.hikoo_backend.demo.service;

import com.hikoo_backend.demo.dto.CouponResponse;
import com.hikoo_backend.demo.dto.CreateCouponRequest;
import com.hikoo_backend.demo.dto.UpdateCouponRequest;
import com.hikoo_backend.demo.entity.Course;
import com.hikoo_backend.demo.entity.Coupon;
import com.hikoo_backend.demo.entity.CouponApplicableTo;
import com.hikoo_backend.demo.repository.CourseRepository;
import com.hikoo_backend.demo.repository.CouponRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CouponService {

    private final CouponRepository couponRepository;
    private final CourseRepository courseRepository;

    // =========================================================
    // CREATE COUPON
    // =========================================================

    @Transactional
    public CouponResponse createCoupon(CreateCouponRequest request) {

        String code = normalizeCode(request.code());

        if (couponRepository.existsByCodeIgnoreCase(code)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Coupon code already exists"
            );
        }

        validateDiscount(request.discountPercentage());
        validateUsageLimit(request.usageLimit());
        validateDates(request.validFrom(), request.validUntil());

        Course course = resolveCourse(
                request.applicableTo(),
                request.courseId()
        );

        Coupon coupon = Coupon.builder()
                .code(code)
                .discountPercentage(request.discountPercentage())
                .applicableTo(request.applicableTo())
                .course(course)
                .usageLimit(request.usageLimit())
                .usedCount(0)
                .validFrom(request.validFrom())
                .validUntil(request.validUntil())
                .active(true)
                .build();

        Coupon saved = couponRepository.save(coupon);

        return toResponse(saved);
    }

    // =========================================================
    // GET ALL COUPONS
    // =========================================================

    @Transactional(readOnly = true)
    public List<CouponResponse> getAllCoupons() {

        return couponRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    // =========================================================
    // GET COUPON
    // =========================================================

    @Transactional(readOnly = true)
    public CouponResponse getCoupon(Long id) {

        Coupon coupon = getCouponEntity(id);

        return toResponse(coupon);
    }

    // =========================================================
    // UPDATE COUPON
    // =========================================================

    @Transactional
    public CouponResponse updateCoupon(
            Long id,
            UpdateCouponRequest request
    ) {

        Coupon coupon = getCouponEntity(id);

        if (request.code() != null) {

            String newCode = normalizeCode(request.code());

            if (!newCode.equalsIgnoreCase(coupon.getCode())
                    && couponRepository.existsByCodeIgnoreCase(newCode)) {

                throw new ResponseStatusException(
                        HttpStatus.CONFLICT,
                        "Coupon code already exists"
                );
            }

            coupon.setCode(newCode);
        }

        if (request.discountPercentage() != null) {

            validateDiscount(request.discountPercentage());

            coupon.setDiscountPercentage(
                    request.discountPercentage()
            );
        }

        CouponApplicableTo applicableTo =
                request.applicableTo() != null
                        ? request.applicableTo()
                        : coupon.getApplicableTo();

        Long courseId =
                request.courseId() != null
                        ? request.courseId()
                        : coupon.getCourse() != null
                            ? coupon.getCourse().getId()
                            : null;

        Course course = resolveCourse(
                applicableTo,
                courseId
        );

        coupon.setApplicableTo(applicableTo);
        coupon.setCourse(course);

        if (request.usageLimit() != null) {

            validateUsageLimit(request.usageLimit());

            if (request.usageLimit() < coupon.getUsedCount()) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Usage limit cannot be less than current used count"
                );
            }

            coupon.setUsageLimit(request.usageLimit());
        }

        LocalDateTime validFrom =
                request.validFrom() != null
                        ? request.validFrom()
                        : coupon.getValidFrom();

        LocalDateTime validUntil =
                request.validUntil() != null
                        ? request.validUntil()
                        : coupon.getValidUntil();

        validateDates(validFrom, validUntil);

        if (request.validFrom() != null) {
            coupon.setValidFrom(request.validFrom());
        }

        if (request.validUntil() != null) {
            coupon.setValidUntil(request.validUntil());
        }

        if (request.active() != null) {
            coupon.setActive(request.active());
        }

        Coupon saved = couponRepository.save(coupon);

        return toResponse(saved);
    }

    // =========================================================
    // ACTIVATE / DEACTIVATE
    // =========================================================

    @Transactional
    public CouponResponse updateCouponStatus(
            Long id,
            boolean active
    ) {

        Coupon coupon = getCouponEntity(id);

        coupon.setActive(active);

        Coupon saved = couponRepository.save(coupon);

        return toResponse(saved);
    }

    // =========================================================
    // DELETE COUPON
    // =========================================================

    @Transactional
    public void deleteCoupon(Long id) {

        Coupon coupon = getCouponEntity(id);

        couponRepository.delete(coupon);
    }

    // =========================================================
    // FIND COUPON BY CODE
    // =========================================================

    @Transactional(readOnly = true)
    public Coupon getCouponByCode(String code) {

        return couponRepository
                .findByCodeIgnoreCase(normalizeCode(code))
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Coupon not found"
                        )
                );
    }

    // =========================================================
    // VALIDATE COUPON FOR A COURSE
    // =========================================================

    @Transactional(readOnly = true)
    public Coupon validateCoupon(
            String code,
            Long courseId
    ) {

        Coupon coupon = getCouponByCode(code);

        if (!Boolean.TRUE.equals(coupon.getActive())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Coupon is inactive"
            );
        }

        LocalDateTime now = LocalDateTime.now();

        if (coupon.getValidFrom() != null
                && now.isBefore(coupon.getValidFrom())) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Coupon is not active yet"
            );
        }

        if (coupon.getValidUntil() != null
                && now.isAfter(coupon.getValidUntil())) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Coupon has expired"
            );
        }

        if (coupon.getUsageLimit() != null
                && coupon.getUsedCount() >= coupon.getUsageLimit()) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Coupon usage limit has been reached"
            );
        }

        if (coupon.getApplicableTo()
                == CouponApplicableTo.SPECIFIC_COURSE) {

            if (coupon.getCourse() == null) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Coupon course configuration is invalid"
                );
            }

            if (!coupon.getCourse()
                    .getId()
                    .equals(courseId)) {

                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Coupon is not applicable to this course"
                );
            }
        }

        return coupon;
    }

    // =========================================================
    // INCREMENT USAGE
    // =========================================================

    @Transactional
    public Coupon incrementUsage(Long id) {

        Coupon coupon = getCouponEntity(id);

        if (coupon.getUsageLimit() != null
                && coupon.getUsedCount()
                >= coupon.getUsageLimit()) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Coupon usage limit has been reached"
            );
        }

        coupon.setUsedCount(
                coupon.getUsedCount() + 1
        );

        return couponRepository.save(coupon);
    }

    // =========================================================
    // HELPERS
    // =========================================================

    private Coupon getCouponEntity(Long id) {

        return couponRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Coupon not found"
                        )
                );
    }

    private String normalizeCode(String code) {

        if (code == null || code.isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Coupon code is required"
            );
        }

        return code.trim().toUpperCase();
    }

    private void validateDiscount(BigDecimal discount) {

        if (discount == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Discount percentage is required"
            );
        }

        if (discount.compareTo(BigDecimal.ZERO) < 0
                || discount.compareTo(new BigDecimal("100")) > 0) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Discount percentage must be between 0 and 100"
            );
        }
    }

    private void validateUsageLimit(Integer usageLimit) {

        if (usageLimit != null && usageLimit < 0) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Usage limit cannot be negative"
            );
        }
    }

    private void validateDates(
            LocalDateTime validFrom,
            LocalDateTime validUntil
    ) {

        if (validFrom != null
                && validUntil != null
                && validUntil.isBefore(validFrom)) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Valid until cannot be before valid from"
            );
        }
    }

    private Course resolveCourse(
            CouponApplicableTo applicableTo,
            Long courseId
    ) {

        if (applicableTo == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Applicable type is required"
            );
        }

        if (applicableTo == CouponApplicableTo.ALL_COURSES) {

            if (courseId != null) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Course ID must be empty for ALL_COURSES coupon"
                );
            }

            return null;
        }

        if (applicableTo == CouponApplicableTo.SPECIFIC_COURSE) {

            if (courseId == null) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Course ID is required for SPECIFIC_COURSE coupon"
                );
            }

            return courseRepository.findById(courseId)
                    .orElseThrow(() ->
                            new ResponseStatusException(
                                    HttpStatus.NOT_FOUND,
                                    "Course not found"
                            )
                    );
        }

        throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Invalid coupon applicable type"
        );
    }

    private CouponResponse toResponse(Coupon coupon) {

      Long courseId = null;
      String courseName = null;

      if (coupon.getCourse() != null) {
        courseId = coupon.getCourse().getId();
        courseName = coupon.getCourse().getName();
      }

      return new CouponResponse(
        coupon.getId(),
        coupon.getCode(),
        coupon.getDiscountPercentage(),
        coupon.getApplicableTo(),
        courseId,
        courseName,
        coupon.getUsageLimit(),
        coupon.getUsedCount(),
        coupon.getValidFrom(),
        coupon.getValidUntil(),
        coupon.getActive(),
        coupon.getCreatedAt(),
        coupon.getUpdatedAt()
      );
    }
}