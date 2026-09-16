package com.hikoo_backend.demo.service;

import com.hikoo_backend.demo.dto.CourseProgressResponse;
import com.hikoo_backend.demo.dto.LessonProgressResponse;
import com.hikoo_backend.demo.entity.CourseLesson;
import com.hikoo_backend.demo.entity.Role;
import com.hikoo_backend.demo.entity.StudentCourseEnrollment;
import com.hikoo_backend.demo.entity.StudentLessonProgress;
import com.hikoo_backend.demo.entity.User;
import com.hikoo_backend.demo.repository.CourseLessonRepository;
import com.hikoo_backend.demo.repository.StudentCourseEnrollmentRepository;
import com.hikoo_backend.demo.repository.StudentLessonProgressRepository;
import com.hikoo_backend.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentLessonProgressService {

    private final StudentLessonProgressRepository progressRepository;
    private final CourseLessonRepository lessonRepository;
    private final StudentCourseEnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;


    // =========================================================
    // COMPLETE LESSON
    // =========================================================

    @Transactional
    public LessonProgressResponse completeLesson(
            String studentEmail,
            Long lessonId
    ) {

        // -----------------------------------------------------
        // GET STUDENT
        // -----------------------------------------------------

        User student = getStudent(studentEmail);


        // -----------------------------------------------------
        // GET LESSON
        // -----------------------------------------------------

        CourseLesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Lesson not found"
                        )
                );


        // -----------------------------------------------------
        // GET ACTIVE ENROLLMENT
        // -----------------------------------------------------

        StudentCourseEnrollment enrollment =
                enrollmentRepository
                        .findByStudentIdAndActiveTrue(student.getId())
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.BAD_REQUEST,
                                        "You do not have an active course"
                                )
                        );


        // -----------------------------------------------------
        // VERIFY LESSON BELONGS TO ENROLLED COURSE
        // -----------------------------------------------------

        Long lessonCourseId =
                lesson.getModule()
                        .getCourse()
                        .getId();

        Long enrolledCourseId =
                enrollment.getCourse()
                        .getId();

        if (!lessonCourseId.equals(enrolledCourseId)) {

            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "This lesson does not belong to your enrolled course"
            );
        }


        // -----------------------------------------------------
        // VERIFY LESSON IS ACTIVE
        // -----------------------------------------------------

        if (!Boolean.TRUE.equals(lesson.getActive())) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "This lesson is inactive"
            );
        }


        // -----------------------------------------------------
        // FIND EXISTING PROGRESS
        // -----------------------------------------------------

        StudentLessonProgress progress =
                progressRepository
                        .findByEnrollmentIdAndLessonId(
                                enrollment.getId(),
                                lessonId
                        )
                        .orElseGet(() ->
                                StudentLessonProgress.builder()
                                        .enrollment(enrollment)
                                        .lesson(lesson)
                                        .completed(false)
                                        .build()
                        );


        // -----------------------------------------------------
        // ALREADY COMPLETED
        // -----------------------------------------------------

        if (Boolean.TRUE.equals(progress.getCompleted())) {

            return toResponse(progress);
        }


        // -----------------------------------------------------
        // MARK LESSON COMPLETED
        // -----------------------------------------------------

        progress.setCompleted(true);
        progress.setCompletedAt(LocalDateTime.now());


        StudentLessonProgress savedProgress =
                progressRepository.saveAndFlush(progress);


        // -----------------------------------------------------
        // CHECK COURSE COMPLETION
        // -----------------------------------------------------

        checkAndCompleteCourse(enrollment);


        // -----------------------------------------------------
        // RETURN LESSON PROGRESS
        // -----------------------------------------------------

        return toResponse(savedProgress);
    }


    // =========================================================
    // CHECK AND COMPLETE COURSE
    // =========================================================

    private void checkAndCompleteCourse(
            StudentCourseEnrollment enrollment
    ) {

        Long courseId =
                enrollment.getCourse().getId();


        // -----------------------------------------------------
        // GET ALL ACTIVE LESSONS FOR COURSE
        // -----------------------------------------------------

        List<CourseLesson> lessons =
                lessonRepository.findAll()
                        .stream()
                        .filter(lesson ->
                                Boolean.TRUE.equals(
                                        lesson.getActive()
                                )
                        )
                        .filter(lesson ->
                                lesson.getModule()
                                        .getCourse()
                                        .getId()
                                        .equals(courseId)
                        )
                        .toList();


        int totalLessons = lessons.size();


        // -----------------------------------------------------
        // NO LESSONS
        // -----------------------------------------------------

        if (totalLessons == 0) {
            return;
        }


        // -----------------------------------------------------
        // COUNT COMPLETED LESSONS
        // -----------------------------------------------------

        int completedLessons =
                (int) progressRepository
                        .findByEnrollmentIdAndCompletedTrue(
                                enrollment.getId()
                        )
                        .stream()
                        .filter(progress ->
                                lessons.stream()
                                        .anyMatch(lesson ->
                                                lesson.getId()
                                                        .equals(
                                                                progress
                                                                        .getLesson()
                                                                        .getId()
                                                        )
                                        )
                        )
                        .count();


        // -----------------------------------------------------
        // COURSE 100% COMPLETED
        // -----------------------------------------------------

        if (completedLessons == totalLessons) {

            enrollment.setCompleted(true);

            enrollment.setCompletedAt(
                    LocalDateTime.now()
            );

            enrollment.setActive(false);

            enrollmentRepository.saveAndFlush(enrollment);
        }
    }


    // =========================================================
    // GET MY CURRENT COURSE PROGRESS
    // =========================================================

    @Transactional(readOnly = true)
    public CourseProgressResponse getMyCourseProgress(
            String studentEmail
    ) {

        User student = getStudent(studentEmail);


        // -----------------------------------------------------
        // GET ACTIVE ENROLLMENT
        // -----------------------------------------------------

        StudentCourseEnrollment enrollment =
                enrollmentRepository
                        .findByStudentIdAndActiveTrue(
                                student.getId()
                        )
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "No active course found"
                                )
                        );


        return buildCourseProgress(enrollment);
    }


    // =========================================================
    // BUILD COURSE PROGRESS
    // =========================================================

    @Transactional(readOnly = true)
    private CourseProgressResponse buildCourseProgress(
            StudentCourseEnrollment enrollment
    ) {

        Long courseId =
                enrollment.getCourse().getId();


        // -----------------------------------------------------
        // GET ALL ACTIVE LESSONS
        // -----------------------------------------------------

        List<CourseLesson> lessons =
                lessonRepository.findAll()
                        .stream()
                        .filter(lesson ->
                                Boolean.TRUE.equals(
                                        lesson.getActive()
                                )
                        )
                        .filter(lesson ->
                                lesson.getModule()
                                        .getCourse()
                                        .getId()
                                        .equals(courseId)
                        )
                        .sorted((a, b) -> {

                            int moduleCompare =
                                    Integer.compare(
                                            a.getModule()
                                                    .getModuleOrder(),

                                            b.getModule()
                                                    .getModuleOrder()
                                    );

                            if (moduleCompare != 0) {
                                return moduleCompare;
                            }

                            return Integer.compare(
                                    a.getLessonOrder(),
                                    b.getLessonOrder()
                            );
                        })
                        .toList();


        // -----------------------------------------------------
        // GET STUDENT PROGRESS
        // -----------------------------------------------------

        List<StudentLessonProgress> progressList =
                progressRepository.findByEnrollmentId(
                        enrollment.getId()
                );


        // -----------------------------------------------------
        // BUILD LESSON RESPONSES
        // -----------------------------------------------------

        List<LessonProgressResponse> lessonResponses =
                lessons.stream()
                        .map(lesson -> {

                            StudentLessonProgress progress =
                                    progressList.stream()
                                            .filter(p ->
                                                    p.getLesson()
                                                            .getId()
                                                            .equals(
                                                                    lesson.getId()
                                                            )
                                            )
                                            .findFirst()
                                            .orElse(null);

                            return toLessonResponse(
                                    lesson,
                                    progress,
                                    enrollment.getId()
                            );
                        })
                        .toList();


        // -----------------------------------------------------
        // TOTAL LESSONS
        // -----------------------------------------------------

        int totalLessons =
                lessons.size();


        // -----------------------------------------------------
        // COMPLETED LESSONS
        // -----------------------------------------------------

        int completedLessons =
                (int) progressList.stream()
                        .filter(progress ->
                                Boolean.TRUE.equals(
                                        progress.getCompleted()
                                )
                        )
                        .filter(progress ->
                                lessons.stream()
                                        .anyMatch(lesson ->
                                                lesson.getId()
                                                        .equals(
                                                                progress
                                                                        .getLesson()
                                                                        .getId()
                                                        )
                                        )
                        )
                        .count();


        // -----------------------------------------------------
        // CALCULATE PERCENTAGE
        // -----------------------------------------------------

        BigDecimal progressPercentage;

        if (totalLessons == 0) {

            progressPercentage =
                    BigDecimal.ZERO;

        } else {

            progressPercentage =
                    BigDecimal.valueOf(
                                    completedLessons
                            )
                            .multiply(
                                    BigDecimal.valueOf(100)
                            )
                            .divide(
                                    BigDecimal.valueOf(
                                            totalLessons
                                    ),
                                    2,
                                    RoundingMode.HALF_UP
                            );
        }


        // -----------------------------------------------------
        // COURSE COMPLETED
        // -----------------------------------------------------

        boolean courseCompleted =
                totalLessons > 0
                        && completedLessons == totalLessons;


        return new CourseProgressResponse(
                enrollment.getId(),
                courseId,
                enrollment.getCourse().getName(),
                totalLessons,
                completedLessons,
                progressPercentage,
                courseCompleted,
                lessonResponses
        );
    }


    // =========================================================
    // GET STUDENT
    // =========================================================

    private User getStudent(
            String email
    ) {

        User student =
                userRepository.findByEmail(
                                email.trim().toLowerCase()
                        )
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.UNAUTHORIZED,
                                        "User not found"
                                )
                        );


        // -----------------------------------------------------
        // VERIFY ROLE
        // -----------------------------------------------------

        if (student.getRole() != Role.STUDENT) {

            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Only students can access lesson progress"
            );
        }


        // -----------------------------------------------------
        // VERIFY ACTIVE
        // -----------------------------------------------------

        if (!Boolean.TRUE.equals(
                student.getActive()
        )) {

            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Student account is inactive"
            );
        }


        return student;
    }


    // =========================================================
    // LESSON RESPONSE
    // =========================================================

    private LessonProgressResponse toResponse(
            StudentLessonProgress progress
    ) {

        CourseLesson lesson =
                progress.getLesson();

        return toLessonResponse(
                lesson,
                progress,
                progress.getEnrollment().getId()
        );
    }


    // =========================================================
    // LESSON RESPONSE BUILDER
    // =========================================================

    private LessonProgressResponse toLessonResponse(
            CourseLesson lesson,
            StudentLessonProgress progress,
            Long enrollmentId
    ) {

        return new LessonProgressResponse(

                progress == null
                        ? null
                        : progress.getId(),

                enrollmentId,

                lesson.getId(),

                lesson.getTitle(),

                lesson.getLessonOrder(),

                lesson.getModule().getId(),

                lesson.getModule().getTitle(),

                lesson.getModule()
                        .getCourse()
                        .getId(),

                lesson.getModule()
                        .getCourse()
                        .getName(),

                progress != null
                        && Boolean.TRUE.equals(
                        progress.getCompleted()
                ),

                progress == null
                        ? null
                        : progress.getCompletedAt()
        );
    }
}