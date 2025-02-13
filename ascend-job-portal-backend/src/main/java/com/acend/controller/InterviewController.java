package com.acend.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.acend.entity.Interview;
import com.acend.repository.InterviewRepository;

@RestController
@RequestMapping("/api/interviews")
public class InterviewController {

    @Autowired
    private InterviewRepository interviewRepository;

    @GetMapping("/today")
    public List<Interview> getTodayInterviews() {
        LocalDate today = LocalDate.now();
        return interviewRepository.findByInterviewDate(today);
    }
}
