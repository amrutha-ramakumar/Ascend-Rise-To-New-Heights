package com.acend.service.impl;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.acend.dto.SkillsDto;
import com.acend.entity.Skill;
import com.acend.repository.SkillRepository;
import com.acend.service.SkillService;

import jakarta.validation.Valid;

@Service
public class SkillServiceImpl implements SkillService{

	private SkillRepository skillRepository;
	
	
	public SkillServiceImpl(SkillRepository skillRepository) {
		super();
		this.skillRepository = skillRepository;
	}
	@Override
	public ResponseEntity<?> addSkill(@Valid SkillsDto skill) {
		try {
			Skill s = skillRepository.findBySkillName(skill.getSkillName());
			if(s!=null) {
				return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body("Already Exist");
			}
			
			Skill skills = new Skill();
			skills.setSkillName(skill.getSkillName());
			skillRepository.save(skills);
			ResponseEntity.ok("successfull");
			return ResponseEntity.status(201).body(skills);		}
		catch(Exception e){
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Cann't save this.");
		}
	}
	@Override
	public ResponseEntity<?> getSkill() {
		try {
			List<Skill> skills = skillRepository.findAll();
			if(skills==null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No skill exist");
			}
			ResponseEntity.ok("successfull");
			return ResponseEntity.status(201).body(skills);	
		}
		catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Cann't get any skills.");
		}
	}

}
