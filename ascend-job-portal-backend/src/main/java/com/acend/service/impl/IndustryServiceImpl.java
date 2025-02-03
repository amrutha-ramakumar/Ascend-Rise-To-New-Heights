package com.acend.service.impl;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.acend.dto.IndustryDto;
import com.acend.entity.Industry;
import com.acend.entity.Skill;
import com.acend.repository.IndustryRepository;
import com.acend.repository.JobRepository;
import com.acend.repository.JobseekerRepository;
import com.acend.service.IndustryService;

import jakarta.validation.Valid;

@Service
public class IndustryServiceImpl implements IndustryService{

	private IndustryRepository industryRepository;
	private JobRepository jobsRepository;
	
	public IndustryServiceImpl(IndustryRepository industryRepository,JobRepository jobsRepository) {
		super();
		this.industryRepository = industryRepository;
		this.jobsRepository = jobsRepository;
	}

	@Override
	public ResponseEntity<?> addIndustry(@Valid IndustryDto industry) {
		try {
			Industry s = industryRepository.findByIndustryType(industry.getIndustryType());
			if(s!=null) {
				return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body("Already Exist");
			}
			
			Industry industry2 = new Industry();
			industry2.setIndustryType(industry.getIndustryType());
			industryRepository.save(industry2);
			ResponseEntity.ok("successfull");
			return ResponseEntity.status(201).body(industry2);		}
		catch(Exception e){
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Cann't save this.");
		}
	}

	@Override
	public ResponseEntity<?> getIndustries() {
		try {
			List<Industry> industries = industryRepository.findAll();
			ResponseEntity.ok("successfull");
			return ResponseEntity.status(201).body(industries);	
		}
		catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Cann't get any skills.");
		}
	}

}
