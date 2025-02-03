package com.acend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.acend.dto.IndustryDto;
import com.acend.service.IndustryService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/industry")
public class IndustryController {
	
	@Autowired
	private IndustryService industryService;
	@PostMapping
    public ResponseEntity<?> addIndustry(
//            @RequestHeader(value = "Authorization") String authorizationHeader,
    		@Valid @RequestBody IndustryDto industry) {  
        return industryService.addIndustry(industry);
    }
	
	@GetMapping
    public ResponseEntity<?> getIndustriess(
//            @RequestHeader(value = "Authorization") String authorizationHeader
            ) {  
        return industryService.getIndustries();
    }
}
