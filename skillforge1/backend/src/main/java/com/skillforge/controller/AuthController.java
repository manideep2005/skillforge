package com.skillforge.controller;

import com.skillforge.dto.LoginRequest;
import com.skillforge.dto.RegisterRequest;
import com.skillforge.dto.AuthResponse;
import com.skillforge.entity.User;
import com.skillforge.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // For demo, accept both encoded and plain passwords
            if (passwordEncoder.matches(request.getPassword(), user.getPassword()) || 
                request.getPassword().equals(user.getPassword())) {
                AuthResponse response = new AuthResponse("jwt-token", user.getEmail(), user.getName(), user.getRole());
                return ResponseEntity.ok(response);
            }
        }
        
        return ResponseEntity.badRequest().build();
    }
    
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().build();
        }
        
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setName(request.getName());
        user.setRole(request.getRole());
        
        User savedUser = userRepository.save(user);
        AuthResponse response = new AuthResponse("jwt-token", savedUser.getEmail(), savedUser.getName(), savedUser.getRole());
        return ResponseEntity.ok(response);
    }
}