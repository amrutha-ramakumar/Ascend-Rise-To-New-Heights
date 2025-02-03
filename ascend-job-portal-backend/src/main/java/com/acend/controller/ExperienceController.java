package com.acend.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.acend.config.JwtProvider;
import com.acend.dto.ExperienceDto;
import com.acend.entity.Experience;
import com.acend.service.ExperienceService;

@RestController
@RequestMapping("/api/experience")
public class ExperienceController {
	private ExperienceService experienceService;
	   
    private  JwtProvider jwtProvider;
    public ExperienceController(ExperienceService experienceService, JwtProvider jwtProvider) {
		super();
		this.experienceService = experienceService;
		this.jwtProvider = jwtProvider;
	}
    
	@PostMapping
    public Experience addEducation(@RequestBody Experience experience, @RequestHeader("Authorization") String token) {
        String email = jwtProvider.getEmailFromToken(token);
        return experienceService.saveExperience(experience,email);
    }

    // PUT: Update existing education record
    @PutMapping("/{experienceId}")
    public Experience updateEducation(@PathVariable Long experienceId, @RequestBody ExperienceDto experience, @RequestHeader("Authorization") String token) {
        String email = jwtProvider.getEmailFromToken(token);
        
        return experienceService.updateExperience(experience,experienceId);
    }

	
}
