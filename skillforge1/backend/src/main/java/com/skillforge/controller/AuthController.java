package com.skillforge.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillforge.dto.AuthResponse;
import com.skillforge.dto.LoginRequest;
import com.skillforge.dto.RegisterRequest;
import com.skillforge.service.AuthService;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            System.out.println("Login request: " + request.getEmail());
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            System.out.println("Login error: " + e.getMessage());
            return ResponseEntity.badRequest().body("{\"error\":\"" + e.getMessage() + "\"}");
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            System.out.println("Register request: " + request.getEmail());
            AuthResponse response = authService.register(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            System.out.println("Register error: " + e.getMessage());
            return ResponseEntity.badRequest().body("{\"error\":\"" + e.getMessage() + "\"}");
        }
    }
    
    @GetMapping("/debug/users")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(authService.getAllUsers());
    }
    
    @PostMapping("/debug/cleanup")
    public ResponseEntity<?> cleanupUsers() {
        String result = authService.cleanupDuplicateUsers();
        return ResponseEntity.ok("{\"message\":\"" + result + "\"}");
    }
    
    @PostMapping("/debug/create-test-user")
    public ResponseEntity<?> createTestUser() {
        RegisterRequest request = new RegisterRequest();
        request.setEmail("student@test.com");
        request.setPassword("password123");
        request.setName("Test Student");
        try {
            AuthResponse response = authService.register(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.ok("{\"message\":\"User already exists or error: " + e.getMessage() + "\"}");
        }
    }
    
    @PostMapping("/debug/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String result = authService.resetUserPassword(request.get("email"), request.get("newPassword"));
        return ResponseEntity.ok("{\"message\":\"" + result + "\"}");
    }
    
    @PostMapping("/debug/check-password")
    public ResponseEntity<?> checkPassword(@RequestBody Map<String, String> request) {
        String result = authService.debugPassword(request.get("email"), request.get("password"));
        return ResponseEntity.ok("{\"debug\":\"" + result + "\"}");
    }
}