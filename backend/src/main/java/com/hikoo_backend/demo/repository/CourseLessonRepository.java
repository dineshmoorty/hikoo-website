package com.hikoo_backend.demo.repository;

import com.hikoo_backend.demo.entity.CourseLesson;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CourseLessonRepository
extends JpaRepository<CourseLesson, Long> {

List<CourseLesson> findByModuleIdAndActiveTrueOrderByLessonOrderAsc(
        Long moduleId
);

List<CourseLesson> findByModuleIdOrderByLessonOrderAsc(
        Long moduleId
);

Optional<CourseLesson> findByModuleIdAndLessonOrder(
        Long moduleId,
        Integer lessonOrder
);

boolean existsByModuleIdAndLessonOrder(
        Long moduleId,
        Integer lessonOrder
);

boolean existsByModuleIdAndLessonOrderAndIdNot(
        Long moduleId,
        Integer lessonOrder,
        Long id
);
}