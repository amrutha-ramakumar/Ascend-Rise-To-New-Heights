package com.acend.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.acend.dto.ApplicationDetails;
import com.acend.dto.ApplicationDto;
import com.acend.dto.CertificationDto;
import com.acend.dto.EducationDto;
import com.acend.dto.ExperienceDto;
import com.acend.dto.ExtraCurricularActivityDto;
import com.acend.dto.JobDto;
import com.acend.entity.Application;
import com.acend.entity.Certification;
import com.acend.entity.Education;
import com.acend.entity.Experience;
import com.acend.entity.ExtraCurricularActivity;
import com.acend.entity.Job;
import com.acend.entity.Jobseeker;
import com.acend.entity.Users;
import com.acend.exception.ResourceNotFoundException;
import com.acend.repository.ApplicaionRepository;
import com.acend.repository.JobRepository;
import com.acend.repository.JobseekerRepository;
import com.acend.response.Applicationdata;
import com.acend.service.ApplicationService;

@Service
public class ApplicationServiceImpl implements ApplicationService {

	private JobseekerRepository jobSeekerRepository;
	private ApplicaionRepository applicationRepository;
	private JobRepository jobRepository;

	public ApplicationServiceImpl(JobRepository jobRepository, JobseekerRepository jobSeekerRepository,
			ApplicaionRepository applicationRepository) {
		super();
		this.jobSeekerRepository = jobSeekerRepository;
		this.applicationRepository = applicationRepository;
		this.jobRepository = jobRepository;
	}

	@Override
	public List<Applicationdata> findJobs(String email) {
		Jobseeker jobseeker = jobSeekerRepository.findByUserEmail(email).get();
		List<Application> applications = applicationRepository.findByJobSeeker(jobseeker);
		List<Applicationdata> applicationDataList = applications.stream().map(this::convertToApplicaitonData).toList();

		return applicationDataList;
	}

	@Override
	public Page<ApplicationDetails> getApplicationsByJobId(Long jobId, int page, int size) {
		Optional<Job> jobOptional = jobRepository.findById(jobId);
		if (!jobOptional.isPresent()) {
			throw new RuntimeException("Job not found with id: " + jobId);
		}
		Job job = jobOptional.get();
		Pageable pageable = PageRequest.of(page, size);
		Page<Application> applicationPage = applicationRepository.findByJobPost(job, pageable);
		Page<ApplicationDetails> applicationDetailsPage = applicationPage.map(this::convertToApplicationDetails);

		return applicationDetailsPage;
	}

	@Override
	public Applicationdata getApplicationsById(Long job) {
		Optional<Application> application = applicationRepository.findById(job);
		return convertToApplicaitonData(application.get());
	}

	@Override
	public void updateApplicationStatus(Long applicationId, String applicationStatus) {
		Application application = applicationRepository.findById(applicationId)
				.orElseThrow(() -> new ResourceNotFoundException("Application not found  " ));

		application.setApplicationStatus(applicationStatus);
		applicationRepository.save(application);
	}

	public Applicationdata convertToApplicaitonData(Application application) {
		Applicationdata applicationData = new Applicationdata();
		Job jobPost = application.getJobPost();

		// Set job details from the jobPost entity
		applicationData.setPosition(jobPost.getPosition());
		applicationData.setDescription(jobPost.getDescription());
		applicationData.setLocation(jobPost.getLocation());
		applicationData.setExperience(jobPost.getExperience());
		applicationData.setEducation(jobPost.getEducation());
		applicationData.setIndustryName(jobPost.getIndustry().getIndustryType());
		applicationData.setSkills(jobPost.getSkills().stream().map(skill -> skill.getSkillName()).toList());

		applicationData.setSalary(jobPost.getSalary());
		applicationData.setPostedAt(jobPost.getPostedAt());
		applicationData.setExpiryDate(jobPost.getExpiryDate());
		applicationData.setCompany(jobPost.getEmployer().getCompany().getCompanyName());
		applicationData.setApplicationStatus(application.getApplicationStatus());
		applicationData.setAppliedAt(application.getAppliedAt());
		applicationData.setApplicationId(application.getId());
		applicationData.setUser(application.getJobSeeker().getUser().getId());

		return applicationData;
	}

	public ApplicationDetails convertToApplicationDetails(Application application) {
		ApplicationDetails detail = new ApplicationDetails();
		detail.setApplicationId(application.getId());
		detail.setName(application.getJobSeeker().getUser().getFirstName() + " "
				+ application.getJobSeeker().getUser().getLastName());
		detail.setEmail(application.getJobSeeker().getUser().getEmail());
		detail.setPhone(application.getJobSeeker().getUser().getPhone());
		detail.setGender(application.getJobSeeker().getUser().getGender());
		detail.setEducation(application.getJobSeeker().getEducation().stream().map(this::mapToEducationDto).toList());
		detail.setExperience(
				application.getJobSeeker().getExperience().stream().map(this::mapToExperienceDto).toList());
		detail.setCertifications(
				application.getJobSeeker().getCertifications().stream().map(this::mapToCertificationDto).toList());
		detail.setExtracurricularActivities(application.getJobSeeker().getExtracurricularActivities().stream()
				.map(this::mapToExtraCurricularActivityDto).toList());
		detail.setAdditionalDetails(application.getAdditionalDetails());
		detail.setAppliedAt(application.getAppliedAt());
		detail.setApplicationStatus(application.getApplicationStatus());
		detail.setResumePath(application.getResumePath());
		detail.setLinkedinUrl(application.getJobSeeker().getLinkedinUrl());
		detail.setAboutMe(application.getJobSeeker().getAboutMe());
		detail.setResumeUrl(application.getJobSeeker().getResumeUrl());
		detail.setPortfolioUrl(application.getJobSeeker().getPortfolioUrl());
		detail.setSkills(application.getJobSeeker().getSkills().stream().map(skill -> skill.getSkillName()).toList());
		return detail;
	}

	public EducationDto mapToEducationDto(Education education) {
		EducationDto educationDto = new EducationDto();
		educationDto.setId(education.getEducationId());
		educationDto.setQualificationLevel(education.getQualificationLevel());
		educationDto.setInstitutionName(education.getInstitutionName());
		educationDto.setBoardOrUniversity(education.getBoardOrUniversity());
		educationDto.setFieldOfStudy(education.getFieldOfStudy());
		educationDto.setStartYear(education.getStartYear());
		educationDto.setEndYear(education.getEndYear());
		educationDto.setPercentage(education.getPercentage());
		return educationDto;

	}

	public ExperienceDto mapToExperienceDto(Experience experience) {
		ExperienceDto experienceDto = new ExperienceDto();
		experienceDto.setId(experience.getExperienceId());
		experienceDto.setCompanyName(experience.getCompanyName());
		experienceDto.setJobTitle(experience.getJobTitle());
		experienceDto.setStartDate(experience.getStartDate());
		experienceDto.setEndDate(experience.getEndDate());
		experienceDto.setResponsibilities(experience.getResponsibilities());
		return experienceDto;
	}

	public CertificationDto mapToCertificationDto(Certification certification) {
		CertificationDto certificationDto = new CertificationDto();
		certificationDto.setId(certification.getCertificationId());
		certificationDto.setCertificationName(certification.getCertificationName());
		certificationDto.setIssuedBy(certification.getIssuedBy());
		certificationDto.setIssueDate(certification.getIssueDate());
		certificationDto.setExpiryDate(certification.getExpiryDate());
		return certificationDto;
	}

	public ExtraCurricularActivityDto mapToExtraCurricularActivityDto(ExtraCurricularActivity activity) {
		ExtraCurricularActivityDto activityDto = new ExtraCurricularActivityDto();
		activityDto.setId(activity.getActivityId());
		activityDto.setActivityName(activity.getActivityName());
		activityDto.setDescription(activity.getDescription());
		activityDto.setAchievementDate(activity.getAchievementDate());
		return activityDto;
	}
}
