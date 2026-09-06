package com.hikoo_backend.demo.service;

import com.hikoo_backend.demo.dto.StudentResponse;
import com.hikoo_backend.demo.dto.UpdateStudentRequest;
import com.hikoo_backend.demo.entity.Role;
import com.hikoo_backend.demo.entity.StudentProfile;
import com.hikoo_backend.demo.entity.User;
import com.hikoo_backend.demo.repository.StudentProfileRepository;
import com.hikoo_backend.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeStudentService {

    private final UserRepository userRepository;
    private final StudentProfileRepository studentProfileRepository;

    public List<StudentResponse> getAllStudents() {

        return userRepository.findAll()
                .stream()
                .filter(user -> user.getRole() == Role.STUDENT)
                .map(this::toResponse)
                .toList();
    }

    public StudentResponse getStudent(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Student not found"
                        )
                );

        if (user.getRole() != Role.STUDENT) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Student not found"
            );
        }

        return toResponse(user);
    }

    public StudentResponse updateStudent(
            Long userId,
            UpdateStudentRequest request
    ) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Student not found"
                        )
                );

        if (user.getRole() != Role.STUDENT) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Student not found"
            );
        }

        StudentProfile profile =
                studentProfileRepository
                        .findByUserId(userId)
                        .orElseGet(() ->
                                StudentProfile.builder()
                                        .user(user)
                                        .build()
                        );

        profile.setPhone(request.phone());
        profile.setCourse(request.course());
        profile.setProgram(request.program());
        profile.setInternshipDuration(
                request.internshipDuration()
        );
        profile.setCourseDuration(
                request.courseDuration()
        );
        profile.setAddress(request.address());
        profile.setCity(request.city());
        profile.setState(request.state());
        profile.setPincode(request.pincode());

        if (request.profileCompleted() != null) {
            profile.setProfileCompleted(
                    request.profileCompleted()
            );
        }

        StudentProfile savedProfile =
                studentProfileRepository.save(profile);

        return toResponse(user);
    }

    private StudentResponse toResponse(User user) {

        StudentProfile profile =
                studentProfileRepository
                        .findByUserId(user.getId())
                        .orElse(null);

        return new StudentResponse(
                profile != null ? profile.getId() : null,
                user.getId(),
                user.getName(),
                user.getEmail(),
                profile != null ? profile.getPhone() : null,
                profile != null ? profile.getCourse() : null,
                profile != null ? profile.getProgram() : null,
                profile != null ? profile.getInternshipDuration() : null,
                profile != null ? profile.getCourseDuration() : null,
                profile != null ? profile.getAddress() : null,
                profile != null ? profile.getCity() : null,
                profile != null ? profile.getState() : null,
                profile != null ? profile.getPincode() : null,
                profile != null && profile.getProfileCompleted(),
                user.getActive()
        );
    }
}