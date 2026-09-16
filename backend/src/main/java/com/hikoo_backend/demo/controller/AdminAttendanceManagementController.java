package com.hikoo_backend.demo.controller;

import com.hikoo_backend.demo.dto.AttendanceResponse;
import com.hikoo_backend.demo.dto.UpdateAttendanceRequest;
import com.hikoo_backend.demo.service.AttendanceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/attendance")
@RequiredArgsConstructor
public class AdminAttendanceManagementController {

private final AttendanceService attendanceService;

@GetMapping
public List<AttendanceResponse> getAllAttendance(
Authentication authentication
) {
return attendanceService.getAllAttendance(
  authentication.getName()
);
}

@PutMapping("/{id}")
public AttendanceResponse updateAttendance(
Authentication authentication,
@PathVariable Long id,
@Valid @RequestBody UpdateAttendanceRequest request
) {
return attendanceService.updateAttendance(
  authentication.getName(),
  id,
  request
);
}

@PatchMapping("/{id}/status")
public AttendanceResponse updateAttendanceStatus(
Authentication authentication,
@PathVariable Long id,
@RequestParam Boolean active
) {
return attendanceService.updateAttendanceStatus(
  authentication.getName(),
  id,
  active
);
}
}