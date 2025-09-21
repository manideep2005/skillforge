package com.skillforge.repository;

import com.skillforge.entity.Course;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CourseRepository extends MongoRepository<Course, String> {
    
    List<Course> findByInstructorId(String instructorId);
    
    List<Course> findByPublishedTrue();
    
    List<Course> findByDifficulty(String difficulty);
    
    List<Course> findByTagsContaining(String tag);
    
    List<Course> findByTitleContainingIgnoreCase(String title);
}