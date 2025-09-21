package com.skillforge.controller;

import com.skillforge.entity.Course;
import com.skillforge.entity.UserProgress;
import com.skillforge.repository.CourseRepository;
import com.skillforge.repository.UserProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private UserProgressRepository userProgressRepository;

    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> courses = courseRepository.findByPublishedTrue();
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable String id) {
        Optional<Course> course = courseRepository.findById(id);
        return course.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserProgress>> getUserCourses(@PathVariable String userId) {
        List<UserProgress> userCourses = userProgressRepository.findByUserId(userId);
        return ResponseEntity.ok(userCourses);
    }
}