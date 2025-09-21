package com.skillforge.repository;

import com.skillforge.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    
    Optional<User> findByEmail(String email);
    
    List<User> findByRole(User.Role role);
    
    List<User> findByActiveTrue();
    
    boolean existsByEmail(String email);
    
    long countByRole(User.Role role);
}