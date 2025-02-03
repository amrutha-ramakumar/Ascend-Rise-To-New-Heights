package com.acend.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.acend.config.JwtProvider;
import com.acend.dto.ExtraCurricularActivityDto;
import com.acend.entity.ExtraCurricularActivity;
import com.acend.service.ExtraCurricularActivityService;

@RestController
@RequestMapping("/api/extracurricular")
public class ExtraCurricularActivityController {

    private final ExtraCurricularActivityService extraCurricularActivityService;
    private final JwtProvider jwtProvider;

    // Constructor injection
    public ExtraCurricularActivityController(ExtraCurricularActivityService extraCurricularActivityService, JwtProvider jwtProvider) {
        this.extraCurricularActivityService = extraCurricularActivityService;
        this.jwtProvider = jwtProvider;
    }

    // POST: Add a new extra-curricular activity
    @PostMapping
    public ExtraCurricularActivity addActivity(@RequestBody ExtraCurricularActivity activity, @RequestHeader("Authorization") String token) {
        String email = jwtProvider.getEmailFromToken(token);
        return extraCurricularActivityService.saveActivity(activity, email);
    }

    // PUT: Update an existing extra-curricular activity
    @PutMapping("/{activityId}")
    public ExtraCurricularActivity updateActivity(
            @PathVariable Long activityId, 
            @RequestBody ExtraCurricularActivityDto activityDto, 
            @RequestHeader("Authorization") String token) {
        String email = jwtProvider.getEmailFromToken(token);
        return extraCurricularActivityService.updateActivity(activityId, activityDto, email);
    }
}
