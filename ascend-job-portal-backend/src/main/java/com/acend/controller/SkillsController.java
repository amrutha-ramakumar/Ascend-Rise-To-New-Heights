package com.acend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.acend.dto.SkillsDto;
import com.acend.entity.Skill;
import com.acend.service.SkillService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/skills")
public class SkillsController {

	private SkillService skillService;
	
	public SkillsController(SkillService skillService) {
		super();
		this.skillService = skillService;
	}

	@PostMapping
    public ResponseEntity<?> addSkills(
            @RequestHeader(value = "Authorization") String authorizationHeader,
            @Valid @RequestBody SkillsDto skill) {  
        return skillService.addSkill(skill);
    }
	
	@GetMapping
    public ResponseEntity<?> getSkills(
            @RequestHeader(value = "Authorization") String authorizationHeader) {  
        return skillService.getSkill();
    }
}

