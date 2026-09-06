package com.hikoo_backend.demo.service;

import com.hikoo_backend.demo.dto.CreateAdminRequest;
import com.hikoo_backend.demo.dto.CreateEmployeeRequest;
import com.hikoo_backend.demo.dto.EmployeeResponse;
import com.hikoo_backend.demo.dto.SuperAdminDashboardResponse;
import com.hikoo_backend.demo.dto.UpdateEmployeeRequest;
import com.hikoo_backend.demo.dto.UserResponse;
import com.hikoo_backend.demo.dto.UpdateAdminRequest;
import com.hikoo_backend.demo.dto.CreateStudentRequest;
import com.hikoo_backend.demo.dto.UpdateStudentRequest;

import com.hikoo_backend.demo.entity.EmployeeProfile;
import com.hikoo_backend.demo.entity.Role;
import com.hikoo_backend.demo.entity.User;

import com.hikoo_backend.demo.repository.EmployeeProfileRepository;
import com.hikoo_backend.demo.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SuperAdminService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmployeeProfileRepository employeeProfileRepository;


    // ================================
    // GET ALL USERS
    // ================================

    public List<UserResponse> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }


    // ================================
    // CREATE ADMIN
    // ================================

    public UserResponse createAdmin(CreateAdminRequest request) {

        String email = request.email()
                .trim()
                .toLowerCase();

        if (userRepository.existsByEmail(email)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Email already exists"
            );
        }

        User admin = User.builder()
                .name(request.name().trim())
                .email(email)
                .password(passwordEncoder.encode(request.password()))
                .role(Role.ADMIN)
                .active(true)
                .build();

        User savedUser = userRepository.save(admin);

        return toResponse(savedUser);
    }

    // ================================
    // GET ALL ADMINS
    // ================================

    public List<UserResponse> getAllAdmins() {

        return userRepository.findAll()
                .stream()
                .filter(user -> user.getRole() == Role.ADMIN)
                .map(this::toResponse)
                .toList();
    }


    // ================================
    // GET ADMIN
    // ================================

    public UserResponse getAdmin(Long id) {

        User admin = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Admin not found"
                ));

        if (admin.getRole() != Role.ADMIN) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "User is not an admin"
            );
        }

        return toResponse(admin);
    }


    // ================================
    // UPDATE ADMIN
    // ================================

    public UserResponse updateAdmin(
            Long id,
            UpdateAdminRequest request
    ) {

        User admin = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Admin not found"
                ));

        if (admin.getRole() != Role.ADMIN) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "User is not an admin"
            );
        }

        // ----------------------------
        // UPDATE NAME
        // ----------------------------

        if (request.name() != null &&
                !request.name().trim().isEmpty()) {

            admin.setName(
                    request.name().trim()
            );
        }


        // ----------------------------
        // UPDATE EMAIL
        // ----------------------------

        if (request.email() != null &&
                !request.email().trim().isEmpty()) {

            String email =
                    request.email()
                            .trim()
                            .toLowerCase();

            userRepository.findByEmail(email)
                    .ifPresent(existing -> {

                        if (!existing.getId().equals(id)) {

                            throw new ResponseStatusException(
                                    HttpStatus.CONFLICT,
                                    "Email already exists"
                            );
                        }
                    });

            admin.setEmail(email);
        }


        // ----------------------------
        // UPDATE PASSWORD
        // ----------------------------

        if (request.password() != null &&
                !request.password().trim().isEmpty()) {

            admin.setPassword(
                    passwordEncoder.encode(
                            request.password()
                    )
            );
        }

        User savedAdmin =
                userRepository.save(admin);

        return toResponse(savedAdmin);
    }


    // ================================
    // ADMIN ACTIVE / INACTIVE
    // ================================

    public UserResponse updateAdminStatus(
            Long id,
            boolean active
    ) {

        User admin = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Admin not found"
                ));

        if (admin.getRole() != Role.ADMIN) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "User is not an admin"
            );
        }

        admin.setActive(active);

        User updatedAdmin =
                userRepository.save(admin);

        return toResponse(updatedAdmin);
    }


    // ================================
    // CREATE EMPLOYEE
    // ================================

    public UserResponse createEmployee(CreateEmployeeRequest request) {

        String email = request.email()
                .trim()
                .toLowerCase();

        if (userRepository.existsByEmail(email)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Email already exists"
            );
        }

        User employee = User.builder()
                .name(request.name().trim())
                .email(email)
                .password(passwordEncoder.encode(request.password()))
                .role(Role.EMPLOYEE)
                .active(true)
                .build();

        User savedUser = userRepository.save(employee);

        EmployeeProfile profile = EmployeeProfile.builder()
                .user(savedUser)
                .profileCompleted(false)
                .build();

        employeeProfileRepository.save(profile);

        return toResponse(savedUser);
    }


    // ================================
    // GET ALL EMPLOYEES
    // ================================

    public List<EmployeeResponse> getAllEmployees() {

        return userRepository.findAll()
                .stream()
                .filter(user -> user.getRole() == Role.EMPLOYEE)
                .map(this::toEmployeeResponse)
                .toList();
    }


    // ================================
    // GET EMPLOYEE
    // ================================

    public EmployeeResponse getEmployee(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Employee not found"
                ));

        if (user.getRole() != Role.EMPLOYEE) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "User is not an employee"
            );
        }

        return toEmployeeResponse(user);
    }


    // ================================
    // UPDATE EMPLOYEE
    // ================================

    public EmployeeResponse updateEmployee(
            Long id,
            UpdateEmployeeRequest request
    ) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Employee not found"
                ));

        if (user.getRole() != Role.EMPLOYEE) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "User is not an employee"
            );
        }

        if (request.name() != null &&
                !request.name().trim().isEmpty()) {

            user.setName(request.name().trim());
        }

        if (request.email() != null &&
                !request.email().trim().isEmpty()) {

            String email = request.email()
                    .trim()
                    .toLowerCase();

            userRepository.findByEmail(email)
                    .ifPresent(existing -> {

                        if (!existing.getId().equals(id)) {

                            throw new ResponseStatusException(
                                    HttpStatus.CONFLICT,
                                    "Email already exists"
                            );
                        }
                    });

            user.setEmail(email);
        }

        EmployeeProfile profile =
                employeeProfileRepository.findByUserId(id)
                        .orElseGet(() ->
                                EmployeeProfile.builder()
                                        .user(user)
                                        .profileCompleted(false)
                                        .build()
                        );

        profile.setDesignation(
                normalizeText(request.designation())
        );

        profile.setSpecialization(
                normalizeText(request.specialization())
        );

        profile.setDepartment(
                normalizeText(request.department())
        );

        profile.setPhone(
                normalizeText(request.phone())
        );

        profile.setAddress(
                normalizeText(request.address())
        );

        profile.setCity(
                normalizeText(request.city())
        );

        profile.setState(
                normalizeText(request.state())
        );

        profile.setPincode(
                normalizeText(request.pincode())
        );


        boolean completed =
                profile.getDesignation() != null &&
                        profile.getSpecialization() != null &&
                        profile.getDepartment() != null &&
                        profile.getPhone() != null;

        profile.setProfileCompleted(completed);


        userRepository.save(user);

        employeeProfileRepository.save(profile);

        return toEmployeeResponse(user);
    }


    // ================================
    // EMPLOYEE → RESPONSE
    // ================================

    private EmployeeResponse toEmployeeResponse(User user) {

        EmployeeProfile profile =
                employeeProfileRepository.findByUserId(user.getId())
                        .orElse(null);

        return new EmployeeResponse(
                profile != null ? profile.getId() : null,
                user.getId(),
                user.getName(),
                user.getEmail(),
                profile != null ? profile.getDesignation() : null,
                profile != null ? profile.getSpecialization() : null,
                profile != null ? profile.getDepartment() : null,
                profile != null ? profile.getPhone() : null,
                profile != null ? profile.getAddress() : null,
                profile != null ? profile.getCity() : null,
                profile != null ? profile.getState() : null,
                profile != null ? profile.getPincode() : null,
                profile != null ? profile.getProfileCompleted() : false,
                user.getActive()
        );
    }


    // ================================
    // NORMALIZE TEXT
    // ================================

    private String normalizeText(String value) {

        if (value == null || value.trim().isEmpty()) {
            return null;
        }

        return value.trim();
    }


    // ================================
    // ACTIVATE / DEACTIVATE USER
    // ================================

    public UserResponse updateUserStatus(
            Long id,
            boolean active
    ) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));

        user.setActive(active);

        User updatedUser = userRepository.save(user);

        return toResponse(updatedUser);
    }


    // ================================
    // DASHBOARD STATS
    // ================================

    public SuperAdminDashboardResponse getDashboardStats() {

        long totalUsers = userRepository.count();

        long totalStudents =
                userRepository.countByRole(Role.STUDENT);

        long totalAdmins =
                userRepository.countByRole(Role.ADMIN);

        long totalEmployees =
                userRepository.countByRole(Role.EMPLOYEE);

        long totalSuperAdmins =
                userRepository.countByRole(Role.SUPER_ADMIN);

        long activeUsers =
                userRepository.countByActive(true);

        long inactiveUsers =
                userRepository.countByActive(false);


        return new SuperAdminDashboardResponse(
                totalUsers,
                totalStudents,
                totalAdmins,
                totalEmployees,
                totalSuperAdmins,
                activeUsers,
                inactiveUsers
        );
    }


    // ================================
    // ENTITY → RESPONSE
    // ================================

    private UserResponse toResponse(User user) {

        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getActive()
        );
    }

    // ================================
    // GET ALL STUDENTS
    // ================================

    public List<UserResponse> getAllStudents() {

        return userRepository.findAll()
                .stream()
                .filter(user -> user.getRole() == Role.STUDENT)
                .map(this::toResponse)
                .toList();
    }


    // ================================
    // CREATE OFFLINE STUDENT
    // ================================

    public UserResponse createStudent(CreateStudentRequest request) {

        String email = request.email()
                .trim()
                .toLowerCase();

        if (userRepository.existsByEmail(email)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Email already exists"
            );
        }

        User student = User.builder()
                .name(request.name().trim())
                .email(email)
                .password(passwordEncoder.encode(request.password()))
                .role(Role.STUDENT)
                .active(true)
                .build();

        User savedStudent = userRepository.save(student);

        return toResponse(savedStudent);
    }


    // ================================
    // UPDATE STUDENT
    // ================================

    public UserResponse updateStudent(
            Long id,
            UpdateStudentRequest request
    ) {

        User student = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Student not found"
                ));

        // Safety check
        if (student.getRole() != Role.STUDENT) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "User is not a student"
            );
        }

        String email = request.email()
                .trim()
                .toLowerCase();

        // Check email belongs to another user
        userRepository.findByEmail(email)
                .ifPresent(existingUser -> {

                    if (!existingUser.getId().equals(id)) {
                        throw new ResponseStatusException(
                                HttpStatus.CONFLICT,
                                "Email already exists"
                        );
                    }
                });

        student.setName(request.name().trim());
        student.setEmail(email);

        User updatedStudent = userRepository.save(student);

        return toResponse(updatedStudent);
    }


    // ================================
    // ACTIVATE / DEACTIVATE STUDENT
    // ================================

    public UserResponse updateStudentStatus(
            Long id,
            boolean active
    ) {

        User student = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Student not found"
                ));

        if (student.getRole() != Role.STUDENT) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "User is not a student"
            );
        }

        student.setActive(active);

        User updatedStudent = userRepository.save(student);

        return toResponse(updatedStudent);
    }
}