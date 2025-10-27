package com.skillforge.repository;

import com.skillforge.entity.Enrollment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends MongoRepository<Enrollment, String> {
    List<Enrollment> findByUserId(String userId);
    List<Enrollment> findByCourseId(String courseId);
    Optional<Enrollment> findByUserIdAndCourseId(String userId, String courseId);
    List<Enrollment> findByUserIdAndStatus(String userId, String status);
    long countByUserId(String userId);
    long countByUserIdAndStatus(String userId, String status);
}