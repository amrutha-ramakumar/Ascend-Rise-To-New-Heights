package com.acend.service;

import org.springframework.http.ResponseEntity;

import com.acend.dto.IndustryDto;

import jakarta.validation.Valid;

public interface IndustryService {

	ResponseEntity<?> addIndustry(@Valid IndustryDto skill);

	ResponseEntity<?> getIndustries();

}
