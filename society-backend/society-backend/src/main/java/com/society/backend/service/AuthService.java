package com.society.backend.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.society.backend.dto.ForgotPasswordRequest;
import com.society.backend.dto.LoginRequest;
import com.society.backend.dto.RegisterRequest;
import com.society.backend.entity.user;
import com.society.backend.repository.userRepository;

@Service
public class AuthService {

    private final userRepository userRepository;

    public AuthService(userRepository userRepository) {
        this.userRepository = userRepository;
    }

    /* ================= REGISTER ================= */
    public user register(RegisterRequest request) {

        // check email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        // check mobile already exists
        if (userRepository.existsByMobile(request.getMobile())) {
            throw new RuntimeException("Mobile number already registered");
        }

        user user = new user();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setMobile(request.getMobile());
        user.setPassword(request.getPassword());
        user.setDob(request.getDob());
        user.setAddress(request.getAddress());
        user.setWing(request.getWing());
        user.setFlatNumber(request.getFlatNumber());
        user.setPincode(request.getPincode());
        user.setSecurityA1(request.getSecurityA1());
        user.setSecurityA2(request.getSecurityA2());
        user.setSecurityA3(request.getSecurityA3());

        return userRepository.save(user);
    }

    /* ================= LOGIN ================= */
    public user login(LoginRequest request) {

        Optional<user> userOpt = userRepository.findByEmail(request.getEmail());

        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not registered");
        }

        user user = userOpt.get();

        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Incorrect password");
        }

        return user;
    }

    /* ================= FORGOT PASSWORD ================= */
    public void forgotPassword(ForgotPasswordRequest request) {

        Optional<user> userOpt = userRepository.findByEmail(request.getEmail());

        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        user user = userOpt.get();

        if (!user.getSecurityA1().equalsIgnoreCase(request.getSecurityA1()) ||
            !user.getSecurityA2().equalsIgnoreCase(request.getSecurityA2()) ||
            !user.getSecurityA3().equalsIgnoreCase(request.getSecurityA3())) {

            throw new RuntimeException("Security answers do not match");
        }

        user.setPassword(request.getNewPassword());
        userRepository.save(user);
    }
}

