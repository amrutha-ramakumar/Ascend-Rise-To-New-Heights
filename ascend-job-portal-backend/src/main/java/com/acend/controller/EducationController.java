package com.acend.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.acend.config.JwtProvider;
import com.acend.dto.EducationDto;
import com.acend.entity.Education;
import com.acend.service.EducationService;

@RestController
@RequestMapping("/api/education")
public class EducationController {

    private EducationService educationService;
   
    private  JwtProvider jwtProvider;

    
    public EducationController(EducationService educationService, JwtProvider jwtProvider) {
		super();
		this.educationService = educationService;
		this.jwtProvider = jwtProvider;
	}

	@PostMapping
    public Education addEducation(@RequestBody Education education, @RequestHeader("Authorization") String token) {
        String email = jwtProvider.getEmailFromToken(token);
        return educationService.saveEducation(education,email);
    }

    // PUT: Update existing education record
    @PutMapping("/{educationId}")
    public Education updateEducation(@PathVariable Long educationId, @RequestBody EducationDto education, @RequestHeader("Authorization") String token) {
        String email = jwtProvider.getEmailFromToken(token);
        
        return educationService.updateEducation(education,educationId);
    }
}
