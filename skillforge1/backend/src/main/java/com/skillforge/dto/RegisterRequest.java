package com.skillforge.dto;

import com.skillforge.entity.User;

public class RegisterRequest {
    private String email;
    private String password;
    private String name;
    private User.Role role;
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public User.Role getRole() { return role; }
    public void setRole(User.Role role) { this.role = role; }
}