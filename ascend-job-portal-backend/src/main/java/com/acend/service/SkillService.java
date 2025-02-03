package com.acend.service;

import org.springframework.http.ResponseEntity;

import com.acend.dto.SkillsDto;
import jakarta.validation.Valid;

public interface SkillService {

	ResponseEntity<?> addSkill(@Valid SkillsDto skill);

	ResponseEntity<?> getSkill();

}
