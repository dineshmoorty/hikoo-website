package com.hikoo_backend.demo.service;

import com.hikoo_backend.demo.dto.AttendanceResponse;
import com.hikoo_backend.demo.dto.CreateAttendanceRequest;
import com.hikoo_backend.demo.entity.Attendance;
import com.hikoo_backend.demo.entity.Role;
import com.hikoo_backend.demo.entity.StudentCourseEnrollment;
import com.hikoo_backend.demo.entity.User;
import com.hikoo_backend.demo.repository.AttendanceRepository;
import com.hikoo_backend.demo.repository.StudentCourseEnrollmentRepository;
import com.hikoo_backend.demo.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;

    private final StudentCourseEnrollmentRepository enrollmentRepository;

    private final UserRepository userRepository;

    // =========================================================
    // EMPLOYEE MARK ATTENDANCE
    // =========================================================

    public AttendanceResponse markAttendance(
            String employeeEmail,
            CreateAttendanceRequest request
    ) {

        User employee = getUserByEmail(employeeEmail);

        // -----------------------------------------------------
        // Verify employee
        // -----------------------------------------------------

        if (employee.getRole() != Role.EMPLOYEE) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Only employees can mark attendance"
            );
        }

        if (!Boolean.TRUE.equals(employee.getActive())) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Employee account is inactive"
            );
        }

        // -----------------------------------------------------
        // Find enrollment
        // -----------------------------------------------------

        StudentCourseEnrollment enrollment =
                enrollmentRepository.findById(request.enrollmentId())
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Enrollment not found"
                                )
                        );

        // -----------------------------------------------------
        // Verify enrollment is assigned to this employee
        // -----------------------------------------------------

        if (enrollment.getEmployee() == null) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "This student has not been assigned to an employee"
            );
        }

        if (!enrollment.getEmployee().getId()
                .equals(employee.getId())) {

            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "This student is not assigned to you"
            );
        }

        // -----------------------------------------------------
        // Verify enrollment is active
        // -----------------------------------------------------

        if (!Boolean.TRUE.equals(enrollment.getActive())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "This enrollment is inactive"
            );
        }

        // -----------------------------------------------------
        // Prevent duplicate attendance
        // -----------------------------------------------------

        if (attendanceRepository
                .existsByEnrollmentIdAndAttendanceDate(
                        enrollment.getId(),
                        request.attendanceDate()
                )) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Attendance already marked for this date"
            );
        }

        // -----------------------------------------------------
        // Create attendance
        // -----------------------------------------------------

        Attendance attendance = Attendance.builder()
                .enrollment(enrollment)
                .attendanceDate(request.attendanceDate())
                .status(request.status())
                .remarks(request.remarks())
                .build();

        Attendance saved =
                attendanceRepository.save(attendance);

        return toResponse(saved);
    }

    // =========================================================
    // EMPLOYEE VIEW ATTENDANCE
    // =========================================================

    public List<AttendanceResponse> getMyStudentAttendance(
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

        List<StudentCourseEnrollment> enrollments =
                enrollmentRepository
                        .findByEmployeeId(employee.getId());

        StudentCourseEnrollment enrollment =
                enrollments.stream()
                        .filter(item ->
                                item.getStudent()
                                        .getId()
                                        .equals(studentId)
                        )
                        .findFirst()
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Student is not assigned to you"
                                )
                        );

        return attendanceRepository
                .findByEnrollmentIdOrderByAttendanceDateDesc(
                        enrollment.getId()
                )
                .stream()
                .map(this::toResponse)
                .toList();
    }

    // =========================================================
    // EMPLOYEE VIEW ENROLLMENT ATTENDANCE
    // =========================================================

    public List<AttendanceResponse> getMyEnrollmentAttendance(
            String employeeEmail,
            Long enrollmentId
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

        return attendanceRepository
                .findByEnrollmentIdOrderByAttendanceDateDesc(
                        enrollment.getId()
                )
                .stream()
                .map(this::toResponse)
                .toList();
    }

    // =========================================================
    // STUDENT VIEW OWN ATTENDANCE
    // =========================================================

    public List<AttendanceResponse> getMyAttendance(
            String studentEmail
    ) {

        User student = getUserByEmail(studentEmail);

        if (student.getRole() != Role.STUDENT) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Only students can access this"
            );
        }

        List<StudentCourseEnrollment> enrollments =
                enrollmentRepository
                        .findByStudentId(student.getId());

        return enrollments.stream()
                .flatMap(enrollment ->
                        attendanceRepository
                                .findByEnrollmentIdOrderByAttendanceDateDesc(
                                        enrollment.getId()
                                )
                                .stream()
                )
                .map(this::toResponse)
                .toList();
    }

    // =========================================================
    // GET USER
    // =========================================================

    private User getUserByEmail(String email) {

        return userRepository
                .findByEmail(
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
    // RESPONSE MAPPER
    // =========================================================

    private AttendanceResponse toResponse(
            Attendance attendance
    ) {

        StudentCourseEnrollment enrollment =
                attendance.getEnrollment();

        User student =
                enrollment.getStudent();

        User employee =
                enrollment.getEmployee();

        var course =
                enrollment.getCourse();

        return new AttendanceResponse(

                attendance.getId(),

                enrollment.getId(),

                student.getId(),
                student.getName(),
                student.getEmail(),

                course.getId(),
                course.getName(),
                course.getCode(),

                employee != null
                        ? employee.getId()
                        : null,

                employee != null
                        ? employee.getName()
                        : null,

                attendance.getAttendanceDate(),

                attendance.getStatus(),

                attendance.getRemarks(),

                attendance.getCreatedAt(),

                attendance.getUpdatedAt()
        );
    }
}