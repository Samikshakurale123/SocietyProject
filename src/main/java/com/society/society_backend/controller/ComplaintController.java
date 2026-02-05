package com.society.society_backend.controller;

import com.society.society_backend.entity.Complaint;
import com.society.society_backend.repository.ComplaintRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "http://localhost:3000")
public class ComplaintController {

    @Autowired
    private ComplaintRepository complaintRepository;

    @GetMapping
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    @PostMapping
    public Complaint addComplaint(@RequestBody Complaint complaint) {

        complaint.setStatus("OPEN");
        complaint.setCreatedAt(LocalDateTime.now());

        return complaintRepository.save(complaint);
    }
}

