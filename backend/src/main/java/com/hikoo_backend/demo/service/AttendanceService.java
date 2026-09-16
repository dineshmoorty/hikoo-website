package com.hikoo_backend.demo.service;

import com.hikoo_backend.demo.dto.AttendanceResponse;
import com.hikoo_backend.demo.dto.CreateAttendanceRequest;
import com.hikoo_backend.demo.dto.UpdateAttendanceRequest;
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

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final StudentCourseEnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;

    // =========================================================
    // MARK ATTENDANCE
    //
    // EMPLOYEE:
    //   - Today only
    //   - Assigned students only
    //
    // ADMIN / SUPER_ADMIN:
    //   - Any date
    //   - No employee-assignment restriction
    // =========================================================

    public AttendanceResponse markAttendance(
            String userEmail,
            CreateAttendanceRequest request
    ) {

        if (request == null
                || request.enrollmentId() == null
                || request.attendanceDate() == null
                || request.status() == null) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Enrollment ID, attendance date and status are required"
            );
        }

        User user = getUserByEmail(userEmail);

        if (!Boolean.TRUE.equals(user.getActive())) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "User account is inactive"
            );
        }

        Role role = user.getRole();

        if (role != Role.EMPLOYEE
                && role != Role.ADMIN
                && role != Role.SUPER_ADMIN) {

            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "You are not allowed to mark attendance"
            );
        }

        // -----------------------------------------------------
        // EMPLOYEE = TODAY ONLY
        // -----------------------------------------------------

        if (role == Role.EMPLOYEE
                && !request.attendanceDate().equals(LocalDate.now())) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Employees can mark attendance only for today"
            );
        }

        // -----------------------------------------------------
        // FIND ENROLLMENT
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
        // EMPLOYEE = ASSIGNED STUDENT ONLY
        // ADMIN / SUPER_ADMIN = NO ASSIGNMENT RESTRICTION
        // -----------------------------------------------------

        if (role == Role.EMPLOYEE) {

            if (enrollment.getEmployee() == null) {
                throw new ResponseStatusException(
                        HttpStatus.FORBIDDEN,
                        "This student has not been assigned to an employee"
                );
            }

            Long assignedEmployeeId =
                    enrollment.getEmployee().getId();

            if (!assignedEmployeeId.equals(user.getId())) {
                throw new ResponseStatusException(
                        HttpStatus.FORBIDDEN,
                        "This student is not assigned to you"
                );
            }
        }

        // -----------------------------------------------------
        // ENROLLMENT MUST BE ACTIVE
        // -----------------------------------------------------

        if (!Boolean.TRUE.equals(enrollment.getActive())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "This enrollment is inactive"
            );
        }

        // -----------------------------------------------------
        // PREVENT DUPLICATE ATTENDANCE
        // One attendance per enrollment per date
        // -----------------------------------------------------

        if (attendanceRepository.existsByEnrollmentIdAndAttendanceDate(
                enrollment.getId(),
                request.attendanceDate()
        )) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Attendance already marked for this date"
            );
        }

        // -----------------------------------------------------
        // CREATE
        // -----------------------------------------------------

        Attendance attendance =
                Attendance.builder()
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
    // ADMIN / SUPER ADMIN - VIEW ALL ATTENDANCE
    // =========================================================

    public List<AttendanceResponse> getAllAttendance(String userEmail) {
        User user = getUserByEmail(userEmail);

        if (user.getRole() != Role.ADMIN
                && user.getRole() != Role.SUPER_ADMIN) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Only admins can access attendance management"
            );
        }

        return attendanceRepository
                .findAllByOrderByAttendanceDateDescIdDesc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    // =========================================================
    // ADMIN / SUPER ADMIN - UPDATE ATTENDANCE
    // =========================================================

    public AttendanceResponse updateAttendance(
            String userEmail,
            Long attendanceId,
            UpdateAttendanceRequest request
    ) {
        User user = getUserByEmail(userEmail);

        if (user.getRole() != Role.ADMIN
                && user.getRole() != Role.SUPER_ADMIN) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Only admins can update attendance"
            );
        }

        if (request == null
                || request.attendanceDate() == null
                || request.status() == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Attendance date and status are required"
            );
        }

        Attendance attendance = attendanceRepository.findById(attendanceId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Attendance not found"
                ));

        if (attendanceRepository
                .existsByEnrollmentIdAndAttendanceDateAndIdNot(
                        attendance.getEnrollment().getId(),
                        request.attendanceDate(),
                        attendanceId
                )) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Attendance already exists for this enrollment and date"
            );
        }

        attendance.setAttendanceDate(request.attendanceDate());
        attendance.setStatus(request.status());
        attendance.setRemarks(
                request.remarks() == null
                        ? null
                        : request.remarks().trim()
        );

        return toResponse(attendanceRepository.save(attendance));
    }

    // =========================================================
    // ADMIN / SUPER ADMIN - ACTIVE / INACTIVE
    // =========================================================

    public AttendanceResponse updateAttendanceStatus(
            String userEmail,
            Long attendanceId,
            Boolean active
    ) {
        User user = getUserByEmail(userEmail);

        if (user.getRole() != Role.ADMIN
                && user.getRole() != Role.SUPER_ADMIN) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Only admins can change attendance status"
            );
        }

        if (active == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Active status is required"
            );
        }

        Attendance attendance = attendanceRepository.findById(attendanceId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Attendance not found"
                ));

        attendance.setActive(active);

        return toResponse(attendanceRepository.save(attendance));
    }

    // =========================================================
    // EMPLOYEE VIEW ATTENDANCE BY STUDENT
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
                enrollmentRepository.findByEmployeeId(employee.getId());

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
                enrollmentRepository.findByIdAndEmployeeId(
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
                enrollmentRepository.findByStudentId(student.getId());

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
                .findByEmail(email.trim().toLowerCase())
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
                attendance.getUpdatedAt(),
                attendance.getActive()
        );
    }
}
