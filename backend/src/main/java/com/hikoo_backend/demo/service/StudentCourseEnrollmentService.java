package com.hikoo_backend.demo.service;

import com.hikoo_backend.demo.dto.AssignEmployeeRequest;
import com.hikoo_backend.demo.dto.CreateEnrollmentRequest;
import com.hikoo_backend.demo.dto.EnrollmentResponse;
import com.hikoo_backend.demo.entity.Coupon;
import com.hikoo_backend.demo.entity.Course;
import com.hikoo_backend.demo.entity.EnrollmentStatus;
import com.hikoo_backend.demo.entity.Role;
import com.hikoo_backend.demo.entity.StudentCourseEnrollment;
import com.hikoo_backend.demo.entity.User;
import com.hikoo_backend.demo.repository.CourseRepository;
import com.hikoo_backend.demo.repository.StudentCourseEnrollmentRepository;
import com.hikoo_backend.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class StudentCourseEnrollmentService {

    private final StudentCourseEnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final CouponService couponService;


    // =========================================================
    // STUDENT
    // =========================================================

    /**
     * Student enrolls themselves into a course.
     *
     * Rules:
     *
     * 1. Student must be active.
     * 2. Course must be active.
     * 3. Student can have only one active/scheduled course.
     * 4. Same course can never be joined again.
     * 5. Courses must be completed sequentially.
     * 6. Start date cannot be in the past.
     * 7. End date is calculated from course duration.
     * 8. Coupon is optional.
     * 9. Course fee/GST/coupon values are stored as snapshot.
     */
    @Transactional
    public EnrollmentResponse enrollStudent(
            String email,
            CreateEnrollmentRequest request
    ) {

        // -----------------------------------------------------
        // GET STUDENT
        // -----------------------------------------------------

        User student = getUserByEmail(email);

        // -----------------------------------------------------
        // VERIFY STUDENT ROLE
        // -----------------------------------------------------

        if (student.getRole() != Role.STUDENT) {

            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Only students can enroll"
            );
        }

        // -----------------------------------------------------
        // VERIFY STUDENT ACTIVE
        // -----------------------------------------------------

        if (!Boolean.TRUE.equals(student.getActive())) {

            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Student account is inactive"
            );
        }

        // -----------------------------------------------------
        // GET COURSE
        // -----------------------------------------------------

        Course course =
                courseRepository.findById(request.courseId())
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Course not found"
                                )
                        );

        // -----------------------------------------------------
        // VERIFY COURSE ACTIVE
        // -----------------------------------------------------

        if (!Boolean.TRUE.equals(course.getActive())) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Course is inactive"
            );
        }

        // -----------------------------------------------------
        // VERIFY COURSE ORDER
        // -----------------------------------------------------

        if (course.getCourseOrder() == null) {

            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Course order is not configured"
            );
        }


        // =====================================================
        // RULE 1
        // ONE ACTIVE / SCHEDULED COURSE AT A TIME
        // =====================================================

        if (enrollmentRepository.existsByStudentIdAndActiveTrue(
                student.getId()
        )) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "You already have an active or scheduled course. Complete it before joining another course."
            );
        }


        // =====================================================
        // RULE 2
        // SAME COURSE CANNOT BE JOINED AGAIN
        // =====================================================

        if (enrollmentRepository.existsByStudentIdAndCourseId(
                student.getId(),
                course.getId()
        )) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "You have already joined this course and cannot rejoin it."
            );
        }


        // =====================================================
        // RULE 3
        // SEQUENTIAL COURSE UNLOCK
        // =====================================================

        // Course previousCourse =
        //         courseRepository
        //                 .findTopByCourseOrderLessThanOrderByCourseOrderDesc(
        //                         course.getCourseOrder()
        //                 )
        //                 .orElse(null);


        // // -----------------------------------------------------
        // // FIRST COURSE
        // // -----------------------------------------------------

        // if (previousCourse == null) {

        //     // Course 1 is always available.

        // } else {

        //     // -------------------------------------------------
        //     // PREVIOUS COURSE MUST BE COMPLETED
        //     // -------------------------------------------------

        //     boolean previousCompleted =
        //             enrollmentRepository
        //                     .existsByStudentIdAndCourseIdAndCompletedTrue(
        //                             student.getId(),
        //                             previousCourse.getId()
        //                     );

        //     if (!previousCompleted) {

        //         throw new ResponseStatusException(
        //                 HttpStatus.CONFLICT,
        //                 "Complete the previous course before joining this course."
        //         );
        //     }
        // }


        // =====================================================
        // START DATE
        // =====================================================

        LocalDate startDate = request.startDate();

        if (startDate == null) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Start date is required"
            );
        }

        // -----------------------------------------------------
        // START DATE CANNOT BE IN THE PAST
        // -----------------------------------------------------

        if (startDate.isBefore(LocalDate.now())) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Start date cannot be in the past"
            );
        }


        // =====================================================
        // COURSE DURATION
        // =====================================================

        int durationDays =
                parseDurationDays(course.getDuration());

        LocalDate endDate =
                startDate.plusDays(durationDays - 1L);


        // =====================================================
        // ENROLLMENT STATUS
        // =====================================================

        EnrollmentStatus status;

        if (startDate.isEqual(LocalDate.now())) {

            status = EnrollmentStatus.ACTIVE;

        } else {

            status = EnrollmentStatus.SCHEDULED;
        }


        // =====================================================
        // COURSE PRICE
        // =====================================================

        BigDecimal courseFee =
                course.getBaseFee() != null
                        ? course.getBaseFee()
                        : BigDecimal.ZERO;

        BigDecimal gstPercentage =
                course.getGstPercentage() != null
                        ? course.getGstPercentage()
                        : BigDecimal.ZERO;


        // =====================================================
        // COUPON
        // =====================================================

        Coupon coupon = null;

        BigDecimal discountPercentage =
                BigDecimal.ZERO;

        BigDecimal discountAmount =
                BigDecimal.ZERO;


        if (request.couponCode() != null
                && !request.couponCode().isBlank()) {

            coupon = couponService.validateCoupon(
                    request.couponCode(),
                    course.getId()
            );

            discountPercentage =
                    coupon.getDiscountPercentage() != null
                            ? coupon.getDiscountPercentage()
                            : BigDecimal.ZERO;

            discountAmount =
                    courseFee
                            .multiply(discountPercentage)
                            .divide(
                                    BigDecimal.valueOf(100),
                                    2,
                                    RoundingMode.HALF_UP
                            );
        }


        // =====================================================
        // AFTER DISCOUNT
        // =====================================================

        BigDecimal discountedAmount =
                courseFee.subtract(discountAmount);


        // =====================================================
        // GST
        // =====================================================

        BigDecimal gstAmount =
                discountedAmount
                        .multiply(gstPercentage)
                        .divide(
                                BigDecimal.valueOf(100),
                                2,
                                RoundingMode.HALF_UP
                        );


        // =====================================================
        // FINAL AMOUNT
        // =====================================================

        BigDecimal finalAmount =
                discountedAmount
                        .add(gstAmount)
                        .setScale(
                                2,
                                RoundingMode.HALF_UP
                        );


        // =====================================================
        // CREATE ENROLLMENT
        // =====================================================

        StudentCourseEnrollment enrollment =
                StudentCourseEnrollment.builder()
                        .student(student)
                        .course(course)

                        // Existing state
                        .active(true)
                        .completed(false)

                        // Schedule
                        .startDate(startDate)
                        .endDate(endDate)
                        .status(status)

                        // Price snapshot
                        .courseFee(courseFee)
                        .discountPercentage(discountPercentage)
                        .discountAmount(discountAmount)
                        .gstPercentage(gstPercentage)
                        .gstAmount(gstAmount)
                        .finalAmount(finalAmount)

                        // Coupon
                        .coupon(coupon)

                        .build();


        StudentCourseEnrollment saved =
                enrollmentRepository.save(enrollment);


        // =====================================================
        // INCREMENT COUPON USAGE
        // =====================================================

        if (coupon != null) {

            couponService.incrementUsage(
                    coupon.getId()
            );
        }


        return toResponse(saved);
    }


    // =========================================================
    // GET MY ENROLLMENTS
    // =========================================================

    public List<EnrollmentResponse> getMyEnrollments(
            String email
    ) {

        User student = getUserByEmail(email);

        if (student.getRole() != Role.STUDENT) {

            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Only students can access this"
            );
        }

        return enrollmentRepository
                .findByStudentId(student.getId())
                .stream()
                .map(this::toResponse)
                .toList();
    }


    // =========================================================
    // ADMIN / SUPER ADMIN
    // =========================================================

    public List<EnrollmentResponse> getAllEnrollments() {

        return enrollmentRepository
                .findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }


    // =========================================================
    // ASSIGN EMPLOYEE
    // =========================================================

    public EnrollmentResponse assignEmployee(
            Long enrollmentId,
            AssignEmployeeRequest request
    ) {

            StudentCourseEnrollment enrollment = enrollmentRepository.findById(enrollmentId)
                            .orElseThrow(() -> new ResponseStatusException(
                                            HttpStatus.NOT_FOUND,
                                            "Enrollment not found"));

            User employee = userRepository.findById(request.employeeId())
                            .orElseThrow(() -> new ResponseStatusException(
                                            HttpStatus.NOT_FOUND,
                                            "Employee not found"));

            // -----------------------------------------------------
            // VERIFY EMPLOYEE ROLE
            // -----------------------------------------------------

            if (employee.getRole() != Role.EMPLOYEE) {

                    throw new ResponseStatusException(
                                    HttpStatus.BAD_REQUEST,
                                    "Selected user is not an employee");
            }

            // -----------------------------------------------------
            // VERIFY EMPLOYEE ACTIVE
            // -----------------------------------------------------

            if (!Boolean.TRUE.equals(employee.getActive())) {

                    throw new ResponseStatusException(
                                    HttpStatus.BAD_REQUEST,
                                    "Employee is inactive");
            }

            // -----------------------------------------------------
            // ASSIGN
            // -----------------------------------------------------

            enrollment.setEmployee(employee);

            enrollment.setAssignedAt(
                            LocalDateTime.now());

            StudentCourseEnrollment saved = enrollmentRepository.save(enrollment);

            return toResponse(saved);
    }

    


    // =========================================================
    // EMPLOYEE
    // =========================================================

    /**
     * Get all course enrollments assigned
     * to the logged-in employee.
     */
    public List<EnrollmentResponse> getMyAssignedStudents(
            String employeeEmail
    ) {

        User employee =
                getUserByEmail(employeeEmail);


        if (employee.getRole() != Role.EMPLOYEE) {

            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Only employees can access this"
            );
        }


        return enrollmentRepository
                .findByEmployeeId(employee.getId())
                .stream()
                .map(this::toResponse)
                .toList();
    }


    // =========================================================
    // EMPLOYEE → SPECIFIC STUDENT
    // =========================================================

    public EnrollmentResponse getStudentForEmployee(
            String employeeEmail,
            Long studentId
    ) {

        User employee =
                getUserByEmail(employeeEmail);


        if (employee.getRole() != Role.EMPLOYEE) {

            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Only employees can access this"
            );
        }


        StudentCourseEnrollment enrollment =
                enrollmentRepository
                        .findByStudentIdAndEmployeeId(
                                studentId,
                                employee.getId()
                        )
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Student is not assigned to you"
                                )
                        );


        return toResponse(enrollment);
    }


    // =========================================================
    // EMPLOYEE → COMPLETE COURSE
    // =========================================================

    @Transactional
    public EnrollmentResponse completeCourse(
            String employeeEmail,
            Long enrollmentId
    ) {

        // -----------------------------------------------------
        // GET EMPLOYEE
        // -----------------------------------------------------

        User employee =
                getUserByEmail(employeeEmail);


        // -----------------------------------------------------
        // VERIFY EMPLOYEE ROLE
        // -----------------------------------------------------

        if (employee.getRole() != Role.EMPLOYEE) {

            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Only employees can complete courses"
            );
        }


        // -----------------------------------------------------
        // GET ONLY ASSIGNED ENROLLMENT
        // -----------------------------------------------------

        StudentCourseEnrollment enrollment =
                enrollmentRepository
                        .findByIdAndEmployeeId(
                                enrollmentId,
                                employee.getId()
                        )
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Enrollment is not assigned to you"
                                )
                        );


        // -----------------------------------------------------
        // ALREADY COMPLETED
        // -----------------------------------------------------

        if (Boolean.TRUE.equals(
                enrollment.getCompleted()
        )) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Course is already completed"
            );
        }


        // -----------------------------------------------------
        // VERIFY ACTIVE
        // -----------------------------------------------------

        if (!Boolean.TRUE.equals(
                enrollment.getActive()
        )) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "This course is not active"
            );
        }


        // -----------------------------------------------------
        // COMPLETE COURSE
        // -----------------------------------------------------

        enrollment.setCompleted(true);

        enrollment.setCompletedAt(
                LocalDateTime.now()
        );

        enrollment.setActive(false);

        enrollment.setStatus(
                EnrollmentStatus.COMPLETED
        );


        StudentCourseEnrollment saved =
                enrollmentRepository.save(enrollment);


        return toResponse(saved);
    }


    // =========================================================
    // STUDENT ENROLLMENT HISTORY
    // =========================================================

    public List<EnrollmentResponse> getStudentEnrollments(
            Long studentId
    ) {

        return enrollmentRepository
                .findByStudentId(studentId)
                .stream()
                .map(this::toResponse)
                .toList();
    }


    // =========================================================
    // EMPLOYEE ENROLLMENT HISTORY
    // =========================================================

    public List<EnrollmentResponse> getEmployeeEnrollments(
            Long employeeId
    ) {

        return enrollmentRepository
                .findByEmployeeId(employeeId)
                .stream()
                .map(this::toResponse)
                .toList();
    }


    // =========================================================
    // GET ONE ENROLLMENT
    // =========================================================

    public EnrollmentResponse getEnrollment(
            Long id
    ) {

        StudentCourseEnrollment enrollment =
                enrollmentRepository.findById(id)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Enrollment not found"
                                )
                        );


        return toResponse(enrollment);
    }


    // =========================================================
    // DURATION → DAYS
    // =========================================================

    private int parseDurationDays(
            String duration
    ) {

        if (duration == null
                || duration.isBlank()) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Course duration is not configured"
            );
        }


        String normalized =
                duration
                        .trim()
                        .toLowerCase();


        Matcher matcher =
                Pattern
                        .compile("(\\d+)")
                        .matcher(normalized);


        if (!matcher.find()) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid course duration: " + duration
            );
        }


        int days;

        try {

            days = Integer.parseInt(
                    matcher.group(1)
            );

        } catch (NumberFormatException ex) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid course duration: " + duration
            );
        }


        if (days <= 0) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Course duration must be greater than zero"
            );
        }


        return days;
    }


    // =========================================================
    // COMMON USER LOOKUP
    // =========================================================

    private User getUserByEmail(
            String email
    ) {

        return userRepository.findByEmail(
                        email.trim().toLowerCase()
                )
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "User not found"
                        )
                );
    }


    // =========================================================
    // ENTITY → RESPONSE
    // =========================================================

    private EnrollmentResponse toResponse(
            StudentCourseEnrollment enrollment
    ) {

        User student = enrollment.getStudent();
        Course course = enrollment.getCourse();
        User employee = enrollment.getEmployee();

        Long employeeId = employee != null
                ? employee.getId()
                : null;

        String employeeName = employee != null
                ? employee.getName()
                : null;

        String employeeEmail = employee != null
                ? employee.getEmail()
                : null;

        Coupon coupon = enrollment.getCoupon();

        Long couponId = coupon != null
                ? coupon.getId()
                : null;

        String couponCode = coupon != null
                ? coupon.getCode()
                : null;

        return new EnrollmentResponse(

                // Student
                enrollment.getId(),

                student.getId(),
                student.getName(),
                student.getEmail(),

                // Course
                course.getId(),
                course.getName(),
                course.getCode(),

                // Employee
                employeeId,
                employeeName,
                employeeEmail,

                // Existing enrollment state
                enrollment.getActive(),
                enrollment.getCompleted(),

                enrollment.getEnrolledAt(),
                enrollment.getAssignedAt(),
                enrollment.getCompletedAt(),

                // Schedule
                enrollment.getStartDate(),
                enrollment.getEndDate(),
                enrollment.getStatus(),

                // Pricing
                enrollment.getCourseFee(),
                enrollment.getDiscountPercentage(),
                enrollment.getDiscountAmount(),
                enrollment.getGstPercentage(),
                enrollment.getGstAmount(),
                enrollment.getFinalAmount(),

                // Coupon
                couponId,
                couponCode
        );
    }


    public EnrollmentResponse removeEmployeeAssignment(Long enrollmentId) {
      // TODO Auto-generated method stub
      throw new UnsupportedOperationException("Unimplemented method 'removeEmployeeAssignment'");
    }
}