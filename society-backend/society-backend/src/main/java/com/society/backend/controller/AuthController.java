package com.society.backend.controller;

import com.society.backend.dto.*;
import com.society.backend.entity.user;
import com.society.backend.service.AuthService;
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

        user user = authService.register(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    /* ---------------- LOGIN ---------------- */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest dto) {

        user user = authService.login(dto);
        return ResponseEntity.ok(user);
    }

    /* ---------------- FORGOT PASSWORD ---------------- */
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest dto) {

        authService.forgotPassword(dto);
        return ResponseEntity.ok("Password updated successfully");
    }
}
