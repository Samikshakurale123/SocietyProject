package com.society.society_backend.controller;

import com.society.society_backend.dto.*;
import com.society.society_backend.entity.User;
import com.society.society_backend.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /* ---------------- REGISTER ---------------- */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest dto) {

        User user = authService.register(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    /* ---------------- LOGIN ---------------- */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest dto) {

        User user = authService.login(dto);
        return ResponseEntity.ok(user);
    }

    /* ---------------- FORGOT PASSWORD ---------------- */
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest dto) {

        authService.forgotPassword(dto);
        return ResponseEntity.ok("Password updated successfully");
    }
}

