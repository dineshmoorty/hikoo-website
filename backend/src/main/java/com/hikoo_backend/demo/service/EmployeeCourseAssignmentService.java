package com.hikoo_backend.demo.service;

import com.hikoo_backend.demo.dto.*;
import com.hikoo_backend.demo.entity.*;
import com.hikoo_backend.demo.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeCourseAssignmentService {

    private final EmployeeCourseAssignmentRepository assignmentRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final CourseModuleRepository courseModuleRepository;
    private final CourseService courseService;
    private final CourseModuleService courseModuleService;
    private final CourseLessonService courseLessonService;

    @Transactional(readOnly = true)
    public List<EmployeeCourseAssignmentResponse> getAllAssignments() {
        return assignmentRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public EmployeeCourseAssignmentResponse assignCourse(
            AssignEmployeeCourseRequest request) {

        User employee = userRepository.findById(request.employeeId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Employee not found"));

        if (employee.getRole() != Role.EMPLOYEE) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Selected user is not an employee");
        }

        if (!Boolean.TRUE.equals(employee.getActive())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Employee account is inactive");
        }

        Course course = courseRepository.findById(request.courseId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Course not found"));

        if (!Boolean.TRUE.equals(course.getActive())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Course is inactive");
        }

        if (assignmentRepository.existsByEmployeeIdAndCourseId(
                employee.getId(), course.getId())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Course is already assigned to this employee");
        }

        EmployeeCourseAssignment assignment =
                EmployeeCourseAssignment.builder()
                        .employee(employee)
                        .course(course)
                        .build();

        return toResponse(assignmentRepository.save(assignment));
    }

    @Transactional
    public void removeAssignment(Long assignmentId) {
        EmployeeCourseAssignment assignment =
                assignmentRepository.findById(assignmentId)
                        .orElseThrow(() -> new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Course assignment not found"));

        assignmentRepository.delete(assignment);
    }

    @Transactional(readOnly = true)
    public List<CourseResponse> getMyCourses(
            Authentication authentication) {

        User employee = getAuthenticatedEmployee(authentication);

        return assignmentRepository
                .findByEmployeeIdAndCourseActiveTrueOrderByCourseCourseOrderAsc(
                        employee.getId())
                .stream()
                .map(EmployeeCourseAssignment::getCourse)
                .map(courseService::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public CourseResponse getMyCourse(
            Authentication authentication,
            Long courseId) {

        User employee = getAuthenticatedEmployee(authentication);
        ensureAssigned(employee.getId(), courseId);

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Course not found"));

        if (!Boolean.TRUE.equals(course.getActive())) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Course not found");
        }

        return courseService.toResponse(course);
    }

    @Transactional(readOnly = true)
    public List<CourseModuleResponse> getMyModules(
            Authentication authentication,
            Long courseId) {

        User employee = getAuthenticatedEmployee(authentication);
        ensureAssigned(employee.getId(), courseId);

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Course not found"));

        if (!Boolean.TRUE.equals(course.getActive())) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Course not found");
        }

        return courseModuleService.getActiveModules(courseId);
    }

    @Transactional(readOnly = true)
    public List<CourseLessonResponse> getMyLessons(
            Authentication authentication,
            Long courseId,
            Long moduleId) {

        User employee = getAuthenticatedEmployee(authentication);
        ensureAssigned(employee.getId(), courseId);

        CourseModule module = courseModuleRepository.findById(moduleId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Module not found"));

        if (!module.getCourse().getId().equals(courseId)
                || !Boolean.TRUE.equals(module.getActive())) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Module not found");
        }

        return courseLessonService.getActiveLessons(moduleId);
    }

    private void ensureAssigned(Long employeeId, Long courseId) {
        if (!assignmentRepository.existsByEmployeeIdAndCourseId(
                employeeId, courseId)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "This course is not assigned to you");
        }
    }

    private User getAuthenticatedEmployee(Authentication authentication) {
        if (authentication == null || authentication.getName() == null) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED, "Authentication required");
        }

        User employee = userRepository
                .findByEmail(authentication.getName().toLowerCase())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED, "User not found"));

        if (employee.getRole() != Role.EMPLOYEE) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Only employees can access employee courses");
        }

        if (!Boolean.TRUE.equals(employee.getActive())) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "Account is inactive");
        }

        return employee;
    }

    private EmployeeCourseAssignmentResponse toResponse(
            EmployeeCourseAssignment assignment) {

        User employee = assignment.getEmployee();
        Course course = assignment.getCourse();

        return new EmployeeCourseAssignmentResponse(
                assignment.getId(),
                employee.getId(),
                employee.getName(),
                employee.getEmail(),
                course.getId(),
                course.getName(),
                course.getCode(),
                course.getActive(),
                assignment.getAssignedAt()
        );
    }
}
