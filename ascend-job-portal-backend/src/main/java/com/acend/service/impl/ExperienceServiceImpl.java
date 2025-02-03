package com.acend.service.impl;

import org.springframework.stereotype.Service;

import com.acend.dto.EducationDto;
import com.acend.dto.ExperienceDto;
import com.acend.entity.Education;
import com.acend.entity.Experience;
import com.acend.entity.Jobseeker;
import com.acend.repository.EducationRepository;
import com.acend.repository.ExperienceRepository;
import com.acend.repository.JobseekerRepository;
import com.acend.repository.UserRepository;
import com.acend.service.ExperienceService;

@Service
public class ExperienceServiceImpl implements ExperienceService{

	private JobseekerRepository jobseekerRepository;
	private UserRepository userRepository;
	private ExperienceRepository experienceRepository;
	
	public ExperienceServiceImpl(JobseekerRepository jobseekerRepository, UserRepository userRepository,
		 ExperienceRepository experienceRepository) {
		super();
		this.jobseekerRepository = jobseekerRepository;
		this.userRepository = userRepository;
		this.experienceRepository = experienceRepository;
	}

	@Override
	public Experience saveExperience(Experience experience, String email) {
		Jobseeker jobseeker = jobseekerRepository.findByUser(userRepository.findByEmail(email));	
		experience.setJobseeker(jobseeker);
		return experienceRepository.save(experience);
	}

	@Override
	public Experience updateExperience(ExperienceDto experienceDto, Long experienceId) {
Experience exp = experienceRepository.findById(experienceId).orElseThrow(() -> new RuntimeException("Experience not found"));
       
        exp.setCompanyName(experienceDto.getCompanyName());
        exp.setJobTitle(experienceDto.getJobTitle());
        exp.setStartDate(experienceDto.getStartDate());
        exp.setEndDate(experienceDto.getEndDate());
        exp.setResponsibilities(experienceDto.getResponsibilities());
        return experienceRepository.save(exp);
	}
}
