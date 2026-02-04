package com.society.society_backend.controller;

import com.society.society_backend.entity.Payment;
import com.society.society_backend.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepository;

    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @PostMapping
    public Payment addPayment(@RequestBody Payment payment) {
        payment.setStatus("PAID");
        payment.setPaidAt(LocalDateTime.now());
        return paymentRepository.save(payment);
    }
}
