package com.hikoo_backend.demo.service;

import com.hikoo_backend.demo.dto.CourseLessonResponse;
import com.hikoo_backend.demo.dto.CreateCourseLessonRequest;
import com.hikoo_backend.demo.dto.UpdateCourseLessonRequest;
import com.hikoo_backend.demo.entity.CourseLesson;
import com.hikoo_backend.demo.entity.CourseModule;
import com.hikoo_backend.demo.repository.CourseLessonRepository;
import com.hikoo_backend.demo.repository.CourseModuleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseLessonService {

private final CourseLessonRepository courseLessonRepository;
private final CourseModuleRepository courseModuleRepository;

// =========================================================
// CREATE LESSON
// =========================================================

public CourseLessonResponse createLesson(
        CreateCourseLessonRequest request
) {

        CourseModule module = courseModuleRepository.findById(
                        request.moduleId()).orElseThrow(
                                        () -> new ResponseStatusException(
                                                        HttpStatus.NOT_FOUND,
                                                        "Module not found"));

        if (courseLessonRepository.existsByModuleIdAndLessonOrder(
                        request.moduleId(),
                        request.lessonOrder())) {
                throw new ResponseStatusException(
                                HttpStatus.CONFLICT,
                                "Lesson order already exists for this module");
        }

        CourseLesson lesson = CourseLesson.builder()
                        .module(module)
                        .title(request.title().trim())
                        .description(
                                        request.description() == null
                                                        ? null
                                                        : request.description().trim())
                        .lessonOrder(request.lessonOrder())
                        .content(request.content())
                        .active(true)
                        .build();

        return toResponse(
                        courseLessonRepository.save(lesson));
}

// =========================================================
// UPDATE LESSON
// =========================================================

public CourseLessonResponse updateLesson(
Long lessonId,
UpdateCourseLessonRequest request
) {

CourseLesson lesson = courseLessonRepository.findById(
        lessonId
).orElseThrow(() ->
        new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Lesson not found"
        )
);

Long moduleId = lesson.getModule().getId();

// Prevent duplicate lesson order inside same module
if (courseLessonRepository.existsByModuleIdAndLessonOrderAndIdNot(
        moduleId,
        request.lessonOrder(),
        lessonId
)) {
throw new ResponseStatusException(
        HttpStatus.CONFLICT,
        "Lesson order already exists for this module"
);
}

lesson.setTitle(
        request.title().trim()
);

lesson.setDescription(
        request.description() == null
                ? null
                : request.description().trim()
);

lesson.setLessonOrder(
        request.lessonOrder()
);

lesson.setContent(
        request.content()
);

return toResponse(
        courseLessonRepository.save(lesson)
);
}

// =========================================================
// GET ACTIVE LESSONS
// =========================================================

public List<CourseLessonResponse> getActiveLessons(
        Long moduleId
) {

ensureModuleExists(moduleId);

return courseLessonRepository
        .findByModuleIdAndActiveTrueOrderByLessonOrderAsc(moduleId)
        .stream()
        .map(this::toResponse)
        .toList();
}

// =========================================================
// GET ALL LESSONS
// =========================================================

public List<CourseLessonResponse> getAllLessons(
        Long moduleId
) {

ensureModuleExists(moduleId);

return courseLessonRepository
        .findByModuleIdOrderByLessonOrderAsc(moduleId)
        .stream()
        .map(this::toResponse)
        .toList();
}

// =========================================================
// GET SINGLE LESSON
// =========================================================

public CourseLessonResponse getLesson(Long lessonId) {

CourseLesson lesson = courseLessonRepository.findById(lessonId)
        .orElseThrow(() ->
                new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Lesson not found"
                )
        );

return toResponse(lesson);
}

// =========================================================
// UPDATE STATUS
// =========================================================

public CourseLessonResponse updateStatus(
        Long lessonId,
        Boolean active
) {

CourseLesson lesson = courseLessonRepository.findById(lessonId)
        .orElseThrow(() ->
                new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Lesson not found"
                )
        );

lesson.setActive(active);

return toResponse(
        courseLessonRepository.save(lesson)
);
}

// =========================================================
// HELPERS
// =========================================================

private void ensureModuleExists(Long moduleId) {

if (!courseModuleRepository.existsById(moduleId)) {
        throw new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Module not found"
        );
}
}

private CourseLessonResponse toResponse(
        CourseLesson lesson
) {

CourseModule module = lesson.getModule();

return new CourseLessonResponse(
        lesson.getId(),
        module.getId(),
        module.getCourse().getId(),
        module.getCourse().getName(),
        module.getTitle(),
        lesson.getTitle(),
        lesson.getDescription(),
        lesson.getLessonOrder(),
        lesson.getContent(),
        lesson.getActive()
);
}
}