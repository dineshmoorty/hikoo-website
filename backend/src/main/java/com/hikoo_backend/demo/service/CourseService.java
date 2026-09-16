package com.hikoo_backend.demo.service;

import com.hikoo_backend.demo.dto.CourseResponse;
import com.hikoo_backend.demo.dto.CreateCourseRequest;
import com.hikoo_backend.demo.dto.UpdateCourseRequest;
import com.hikoo_backend.demo.entity.Course;
import com.hikoo_backend.demo.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;


    // =========================================================
    // GET ALL COURSES
    // =========================================================

    public List<CourseResponse> getAllCourses() {

        return courseRepository
                .findAllByOrderByCourseOrderAsc()
                .stream()
                .map(this::toResponse)
                .toList();
    }


    // =========================================================
    // GET COURSE
    // =========================================================

    public CourseResponse getCourse(Long id) {

        Course course =
                courseRepository.findById(id)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Course not found"
                                )
                        );

        return toResponse(course);
    }


    // =========================================================
    // CREATE COURSE
    // =========================================================

    public CourseResponse createCourse(
            CreateCourseRequest request
    ) {

        String name =
                request.name().trim();

        String code =
                normalizeCode(request.code());


        // -----------------------------------------------------
        // CHECK DUPLICATE CODE
        // -----------------------------------------------------

        if (code != null &&
                courseRepository.existsByCodeIgnoreCase(code)) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Course code already exists"
            );
        }


        // -----------------------------------------------------
        // PRICING
        // -----------------------------------------------------

        BigDecimal baseFee =
                request.baseFee() != null
                        ? request.baseFee()
                        : BigDecimal.ZERO;

        BigDecimal gstPercentage =
                request.gstPercentage() != null
                        ? request.gstPercentage()
                        : BigDecimal.ZERO;


        // -----------------------------------------------------
        // VALIDATE PRICING
        // -----------------------------------------------------

        validatePricing(
                baseFee,
                gstPercentage
        );


        // -----------------------------------------------------
        // CALCULATE TOTAL FEE
        // -----------------------------------------------------

        BigDecimal totalFee =
                calculateTotalFee(
                        baseFee,
                        gstPercentage
                );


        // -----------------------------------------------------
        // FIND NEXT COURSE ORDER
        // -----------------------------------------------------

        Integer nextCourseOrder =
                courseRepository
                        .findTopByOrderByCourseOrderDesc()
                        .map(course ->
                                course.getCourseOrder() + 1
                        )
                        .orElse(1);


        // -----------------------------------------------------
        // CREATE COURSE
        // -----------------------------------------------------

        Course course =
                Course.builder()
                        .courseOrder(nextCourseOrder)
                        .name(name)
                        .code(code)
                        .description(
                                normalizeText(
                                        request.description()
                                )
                        )
                        .duration(
                                normalizeText(
                                        request.duration()
                                )
                        )
                        .baseFee(baseFee)
                        .gstPercentage(gstPercentage)
                        .totalFee(totalFee)
                        .active(true)
                        .build();


        // -----------------------------------------------------
        // SAVE COURSE
        // -----------------------------------------------------

        Course savedCourse =
                courseRepository.save(course);


        return toResponse(savedCourse);
    }


    // =========================================================
    // UPDATE COURSE
    // =========================================================

    public CourseResponse updateCourse(
            Long id,
            UpdateCourseRequest request
    ) {

        Course course =
                courseRepository.findById(id)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Course not found"
                                )
                        );


        // -----------------------------------------------------
        // NORMALIZE CODE
        // -----------------------------------------------------

        String code =
                normalizeCode(request.code());


        // -----------------------------------------------------
        // CHECK DUPLICATE CODE
        // -----------------------------------------------------

        if (code != null) {

            courseRepository
                    .findByCodeIgnoreCase(code)
                    .ifPresent(existing -> {

                        if (!existing.getId().equals(id)) {

                            throw new ResponseStatusException(
                                    HttpStatus.CONFLICT,
                                    "Course code already exists"
                            );
                        }
                    });
        }


        // -----------------------------------------------------
        // UPDATE BASIC FIELDS
        // -----------------------------------------------------

        if (request.name() != null &&
                !request.name().trim().isEmpty()) {

            course.setName(
                    request.name().trim()
            );
        }

        course.setCode(code);

        course.setDescription(
                normalizeText(
                        request.description()
                )
        );

        course.setDuration(
                normalizeText(
                        request.duration()
                )
        );


        // -----------------------------------------------------
        // UPDATE PRICING
        // -----------------------------------------------------

        BigDecimal baseFee =
                request.baseFee() != null
                        ? request.baseFee()
                        : course.getBaseFee();

        BigDecimal gstPercentage =
                request.gstPercentage() != null
                        ? request.gstPercentage()
                        : course.getGstPercentage();


        // -----------------------------------------------------
        // VALIDATE PRICING
        // -----------------------------------------------------

        validatePricing(
                baseFee,
                gstPercentage
        );


        // -----------------------------------------------------
        // SAVE PRICING
        // -----------------------------------------------------

        course.setBaseFee(baseFee);

        course.setGstPercentage(
                gstPercentage
        );


        // -----------------------------------------------------
        // RECALCULATE TOTAL FEE
        // -----------------------------------------------------

        BigDecimal totalFee =
                calculateTotalFee(
                        baseFee,
                        gstPercentage
                );

        course.setTotalFee(totalFee);


        // -----------------------------------------------------
        // UPDATE ACTIVE
        // -----------------------------------------------------

        if (request.active() != null) {

            course.setActive(
                    request.active()
            );
        }


        // -----------------------------------------------------
        // SAVE COURSE
        // -----------------------------------------------------

        Course updatedCourse =
                courseRepository.save(course);


        return toResponse(updatedCourse);
    }


    // =========================================================
    // UPDATE COURSE STATUS
    // =========================================================

    public CourseResponse updateCourseStatus(
            Long id,
            Boolean active
    ) {

        Course course =
                courseRepository.findById(id)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Course not found"
                                )
                        );


        course.setActive(active);


        Course updatedCourse =
                courseRepository.save(course);


        return toResponse(updatedCourse);
    }


    // =========================================================
    // RESPONSE
    // =========================================================

    public CourseResponse toResponse(
            Course course
    ) {

        BigDecimal totalFee =
                course.getTotalFee();

        // -----------------------------------------------------
        // FALLBACK FOR OLD COURSES
        // -----------------------------------------------------
        // If old database records have NULL totalFee,
        // calculate it from baseFee + GST.
        // -----------------------------------------------------

        if (totalFee == null) {

            totalFee =
                    calculateTotalFee(
                            course.getBaseFee(),
                            course.getGstPercentage()
                    );
        }


        return new CourseResponse(
                course.getId(),
                course.getCourseOrder(),
                course.getName(),
                course.getCode(),
                course.getDescription(),
                course.getDuration(),
                course.getBaseFee(),
                course.getGstPercentage(),
                totalFee,
                course.getActive()
        );
    }


    // =========================================================
    // CALCULATE TOTAL FEE
    // =========================================================

    private BigDecimal calculateTotalFee(
            BigDecimal baseFee,
            BigDecimal gstPercentage
    ) {

        BigDecimal fee =
                baseFee != null
                        ? baseFee
                        : BigDecimal.ZERO;

        BigDecimal gst =
                gstPercentage != null
                        ? gstPercentage
                        : BigDecimal.ZERO;


        BigDecimal gstAmount =
                fee.multiply(gst)
                        .divide(
                                BigDecimal.valueOf(100),
                                2,
                                RoundingMode.HALF_UP
                        );


        return fee
                .add(gstAmount)
                .setScale(
                        2,
                        RoundingMode.HALF_UP
                );
    }


    // =========================================================
    // VALIDATE PRICING
    // =========================================================

    private void validatePricing(
            BigDecimal baseFee,
            BigDecimal gstPercentage
    ) {

        if (baseFee == null) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Course fee is required"
            );
        }


        if (baseFee.compareTo(BigDecimal.ZERO) < 0) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Course fee cannot be negative"
            );
        }


        if (gstPercentage == null) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "GST percentage is required"
            );
        }


        if (gstPercentage.compareTo(BigDecimal.ZERO) < 0 ||
                gstPercentage.compareTo(
                        new BigDecimal("100")
                ) > 0) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "GST percentage must be between 0 and 100"
            );
        }
    }


    // =========================================================
    // NORMALIZE CODE
    // =========================================================

    private String normalizeCode(
            String value
    ) {

        if (value == null ||
                value.trim().isEmpty()) {

            return null;
        }

        return value
                .trim()
                .toUpperCase();
    }


    // =========================================================
    // NORMALIZE TEXT
    // =========================================================

    private String normalizeText(
            String value
    ) {

        if (value == null ||
                value.trim().isEmpty()) {

            return null;
        }

        return value.trim();
    }
}