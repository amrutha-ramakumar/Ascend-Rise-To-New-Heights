package com.acend.service.impl;

import org.springframework.stereotype.Service;

import com.acend.dto.EducationDto;
import com.acend.entity.Education;
import com.acend.entity.Jobseeker;
import com.acend.repository.EducationRepository;
import com.acend.repository.JobseekerRepository;
import com.acend.repository.UserRepository;
import com.acend.service.EducationService;

@Service
public class EducationServiceImpl implements EducationService{

	private JobseekerRepository jobseekerRepository;
	private UserRepository userRepository;
	private EducationRepository educationRepository;
	
	public EducationServiceImpl(JobseekerRepository jobseekerRepository, UserRepository userRepository,
			EducationRepository educationRepository) {
		super();
		this.jobseekerRepository = jobseekerRepository;
		this.userRepository = userRepository;
		this.educationRepository = educationRepository;
	}
	@Override
	public Education saveEducation(Education education, String email) {
		  Jobseeker jobseeker = jobseekerRepository.findByUser(userRepository.findByEmail(email)); // Find Jobseeker by email
	        education.setJobseeker(jobseeker);
	        return educationRepository.save(education);
	}
	@Override
	public Education updateEducation(EducationDto education, Long educationId) {
		Education edu =educationRepository.getById(educationId);
		edu.setBoardOrUniversity(education.getBoardOrUniversity());
		edu.setInstitutionName(education.getInstitutionName());
		edu.setFieldOfStudy(education.getFieldOfStudy());
		edu.setQualificationLevel(education.getQualificationLevel());
		edu.setStartYear(education.getStartYear());
		edu.setEndYear(education.getEndYear());
		edu.setPercentage(education.getPercentage());
		
		return educationRepository.save(edu);
	}

}
