package com.skillforge.service;

import com.skillforge.entity.PasswordResetToken;
import com.skillforge.entity.User;
import com.skillforge.repository.PasswordResetTokenRepository;
import com.skillforge.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;

@Service
public class PasswordResetService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final long EXPIRATION_MINUTES = 30; // token valid for 30 minutes

    public String createResetToken(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        // Remove existing tokens for this user
        tokenRepository.deleteByUserId(user.getId());

        // Generate secure token
        byte[] randomBytes = new byte[32];
        new SecureRandom().nextBytes(randomBytes);
        String token = Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);

        PasswordResetToken prt = new PasswordResetToken(user.getId(), token, LocalDateTime.now().plusMinutes(EXPIRATION_MINUTES));
        tokenRepository.save(prt);
        return token;
    }

    public void resetPassword(String token, String newPassword) {
        PasswordResetToken prt = tokenRepository.findByToken(token).orElseThrow(() -> new RuntimeException("Invalid token"));
        if (prt.isUsed() || prt.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token expired or already used");
        }
        User user = userRepository.findById(prt.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        // Mark token as used
        prt.setUsed(true);
        tokenRepository.save(prt);
    }
}
