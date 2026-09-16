package com.hikoo_backend.demo.repository;

import com.hikoo_backend.demo.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository
        extends JpaRepository<Attendance, Long> {

    List<Attendance> findByEnrollmentIdOrderByAttendanceDateDesc(
            Long enrollmentId
    );

    Optional<Attendance> findByEnrollmentIdAndAttendanceDate(
            Long enrollmentId,
            LocalDate attendanceDate
    );

    boolean existsByEnrollmentIdAndAttendanceDate(
            Long enrollmentId,
            LocalDate attendanceDate
    );

    boolean existsByEnrollmentIdAndAttendanceDateAndIdNot(
            Long enrollmentId,
            LocalDate attendanceDate,
            Long id
    );

    List<Attendance> findAllByOrderByAttendanceDateDescIdDesc();
}