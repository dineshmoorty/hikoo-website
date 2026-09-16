package com.hikoo_backend.demo.repository;

import com.hikoo_backend.demo.entity.CourseModule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CourseModuleRepository
extends JpaRepository<CourseModule, Long> {

List<CourseModule> findByCourseIdAndActiveTrueOrderByModuleOrderAsc(
        Long courseId
);

List<CourseModule> findByCourseIdOrderByModuleOrderAsc(
        Long courseId
);

Optional<CourseModule> findByCourseIdAndModuleOrder(
        Long courseId,
        Integer moduleOrder
);

boolean existsByCourseIdAndModuleOrder(
        Long courseId,
        Integer moduleOrder
);

boolean existsByCourseIdAndModuleOrderAndIdNot(
        Long courseId,
        Integer moduleOrder,
        Long id
);
}