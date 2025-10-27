package com.skillforge.service;

import com.skillforge.dto.LoginRequest;
import com.skillforge.dto.RegisterRequest;
import com.skillforge.dto.AuthResponse;
import com.skillforge.entity.User;
import com.skillforge.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtService jwtService;
    
    @Autowired
    private ProfileService profileService;
    
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setName(request.getName());
        user.setRole(request.getRole() != null ? request.getRole() : User.Role.STUDENT);
        
        user = userRepository.save(user);
        
        // Create default profile for new user
        profileService.createDefaultProfile(user.getId(), user.getName(), user.getEmail());
        
        String token = jwtService.generateTokenWithRole(user.getEmail(), user.getRole().toString(), user.getId());
        
        return new AuthResponse(token, user.getId(), user.getEmail(), user.getName(), user.getRole());
    }
    
    public AuthResponse login(LoginRequest request) {
        System.out.println("Login attempt: " + request.getEmail());
        
        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> {
                System.out.println("User not found: " + request.getEmail());
                return new RuntimeException("Invalid credentials");
            });
        
        System.out.println("User found: " + user.getEmail());
        
        // Validate password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            System.out.println("Invalid password for user: " + request.getEmail());
            throw new RuntimeException("Invalid credentials");
        }
        
        System.out.println("Password validated successfully");
        String token = jwtService.generateTokenWithRole(user.getEmail(), user.getRole().toString(), user.getId());
        return new AuthResponse(token, user.getId(), user.getEmail(), user.getName(), user.getRole());
    }
    
    public Object getAllUsers() {
        return userRepository.findAll();
    }
    
    public String cleanupDuplicateUsers() {
        var allUsers = userRepository.findAll();
        var emailSet = new java.util.HashSet<String>();
        var toDelete = new java.util.ArrayList<String>();
        
        for (var user : allUsers) {
            if (emailSet.contains(user.getEmail())) {
                toDelete.add(user.getId());
            } else {
                emailSet.add(user.getEmail());
            }
        }
        
        for (String id : toDelete) {
            userRepository.deleteById(id);
        }
        
        return "Deleted " + toDelete.size() + " duplicate users";
    }
    
    public String resetUserPassword(String email, String newPassword) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return "User not found";
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        return "Password reset for " + email;
    }
    
    public String debugPassword(String email, String password) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) return "User not found";
        
        String stored = user.getPassword();
        String encoded = passwordEncoder.encode(password);
        boolean matches = passwordEncoder.matches(password, stored);
        
        return "Stored: " + stored.substring(0, 20) + "... | Matches: " + matches + " | Input: " + password;
    }
}