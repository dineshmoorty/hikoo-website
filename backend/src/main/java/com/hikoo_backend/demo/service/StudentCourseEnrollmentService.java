package com.hikoo_backend.demo.service;

import com.hikoo_backend.demo.dto.AssignEmployeeRequest;
import com.hikoo_backend.demo.dto.CreateEnrollmentRequest;
import com.hikoo_backend.demo.dto.EnrollmentResponse;
import com.hikoo_backend.demo.entity.Course;
import com.hikoo_backend.demo.entity.Role;
import com.hikoo_backend.demo.entity.StudentCourseEnrollment;
import com.hikoo_backend.demo.entity.User;
import com.hikoo_backend.demo.repository.CourseRepository;
import com.hikoo_backend.demo.repository.StudentCourseEnrollmentRepository;
import com.hikoo_backend.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentCourseEnrollmentService {

    private final StudentCourseEnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    // =========================================================
    // STUDENT
    // =========================================================

    /**
     * Student enrolls themselves into a course.
     * Student identity comes from the JWT email.
     */
    public EnrollmentResponse enrollStudent(
            String email,
            CreateEnrollmentRequest request
    ) {

        User student = getUserByEmail(email);

        if (student.getRole() != Role.STUDENT) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Only students can enroll"
            );
        }

        if (!student.getActive()) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Student account is inactive"
            );
        }

        Course course = courseRepository.findById(request.courseId())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Course not found"
                        )
                );

        if (!course.getActive()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Course is inactive"
            );
        }

        if (enrollmentRepository.existsByStudentIdAndCourseId(
                student.getId(),
                course.getId()
        )) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "You are already enrolled in this course"
            );
        }

        StudentCourseEnrollment enrollment =
                StudentCourseEnrollment.builder()
                        .student(student)
                        .course(course)
                        .active(true)
                        .build();

        StudentCourseEnrollment saved =
                enrollmentRepository.save(enrollment);

        return toResponse(saved);
    }

    /**
     * Get courses enrolled by the logged-in student.
     */
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

    /**
     * Get all enrollments.
     */
    public List<EnrollmentResponse> getAllEnrollments() {

        return enrollmentRepository
                .findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    /**
     * Assign an employee/mentor to a student's course enrollment.
     */
    public EnrollmentResponse assignEmployee(
            Long enrollmentId,
            AssignEmployeeRequest request
    ) {

        StudentCourseEnrollment enrollment =
                enrollmentRepository.findById(enrollmentId)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Enrollment not found"
                                )
                        );

        User employee = userRepository.findById(
                request.employeeId()
        ).orElseThrow(() ->
                new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Employee not found"
                )
        );

        if (employee.getRole() != Role.EMPLOYEE) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Selected user is not an employee"
            );
        }

        if (!employee.getActive()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Employee is inactive"
            );
        }

        enrollment.setEmployee(employee);
        enrollment.setAssignedAt(LocalDateTime.now());

        StudentCourseEnrollment saved =
                enrollmentRepository.save(enrollment);

        return toResponse(saved);
    }

    // =========================================================
    // EMPLOYEE
    // =========================================================

    /**
     * Get all course enrollments assigned to the logged-in employee.
     */
    public List<EnrollmentResponse> getMyAssignedStudents(
            String employeeEmail
    ) {

        User employee = getUserByEmail(employeeEmail);

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

    /**
     * Get a specific student's enrollment only if
     * that student is assigned to the logged-in employee.
     */
    public EnrollmentResponse getStudentForEmployee(
            String employeeEmail,
            Long studentId
    ) {

        User employee = getUserByEmail(employeeEmail);

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
    // OPTIONAL ADMIN / SUPER ADMIN HELPERS
    // =========================================================

    /**
     * Get enrollments for a specific student.
     * Keep this only for Admin/Super Admin APIs that need it.
     */
    public List<EnrollmentResponse> getStudentEnrollments(
            Long studentId
    ) {

        return enrollmentRepository
                .findByStudentId(studentId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    /**
     * Get enrollments for a specific employee.
     * Keep this only for Admin/Super Admin APIs.
     */
    public List<EnrollmentResponse> getEmployeeEnrollments(
            Long employeeId
    ) {

        return enrollmentRepository
                .findByEmployeeId(employeeId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    /**
     * Get one enrollment by ID.
     * Should only be exposed to Admin/Super Admin.
     */
    public EnrollmentResponse getEnrollment(Long id) {

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
    // COMMON
    // =========================================================

    private User getUserByEmail(String email) {

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

    private EnrollmentResponse toResponse(
            StudentCourseEnrollment enrollment
    ) {

        User student = enrollment.getStudent();
        Course course = enrollment.getCourse();
        User employee = enrollment.getEmployee();

        return new EnrollmentResponse(
                enrollment.getId(),

                // Student
                student.getId(),
                student.getName(),
                student.getEmail(),

                // Course
                course.getId(),
                course.getName(),
                course.getCode(),

                // Employee
                employee != null
                        ? employee.getId()
                        : null,

                employee != null
                        ? employee.getName()
                        : null,

                employee != null
                        ? employee.getEmail()
                        : null,

                // Enrollment
                enrollment.getActive(),
                enrollment.getEnrolledAt(),
                enrollment.getAssignedAt()
        );
    }
}