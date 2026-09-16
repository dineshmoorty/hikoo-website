package com.hikoo_backend.demo.repository;

import com.hikoo_backend.demo.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CourseRepository
        extends JpaRepository<Course, Long> {

    List<Course> findAllByOrderByCourseOrderAsc();

    Optional<Course>
    findTopByOrderByCourseOrderDesc();

    Optional<Course>
    findTopByCourseOrderLessThanOrderByCourseOrderDesc(
            Integer courseOrder
    );

    boolean existsByCodeIgnoreCase(String code);

    Optional<Course> findByCodeIgnoreCase(String code);
}