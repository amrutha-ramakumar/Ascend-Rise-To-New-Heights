package com.acend.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.acend.dto.JobDto;
import com.acend.entity.Employer;
import com.acend.entity.Industry;
import com.acend.entity.Job;
import com.acend.entity.Jobseeker;
import com.acend.entity.Skill;
import com.acend.entity.Users;
import com.acend.repository.ApplicaionRepository;
import com.acend.repository.EmployerRepository;
import com.acend.repository.IndustryRepository;
import com.acend.repository.JobRepository;
import com.acend.repository.JobseekerRepository;
import com.acend.repository.SavedJobRepository;
import com.acend.repository.SkillRepository;
import com.acend.repository.UserRepository;
import com.acend.service.JobService;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class JobServiceImpl implements JobService {

	private JobRepository jobRepository;

	private JobseekerRepository jobseekerRepository;
	private IndustryRepository industryRepository;

	private EmployerRepository employerRepository;

	private SkillRepository skillRepository;
	private SavedJobRepository savedJobRepository;
	private UserRepository userRepository;
	private ApplicaionRepository applicationRepository;

	public JobServiceImpl(JobRepository jobRepository, JobseekerRepository jobseekerRepository,
			IndustryRepository industryRepository, EmployerRepository employerRepository,
			SkillRepository skillRepository, UserRepository userRepository, SavedJobRepository savedJobRepository,
			ApplicaionRepository applicationRepository) {
		super();
		this.jobRepository = jobRepository;
		this.jobseekerRepository = jobseekerRepository;
		this.industryRepository = industryRepository;
		this.employerRepository = employerRepository;
		this.skillRepository = skillRepository;
		this.userRepository = userRepository;
		this.applicationRepository = applicationRepository;
		this.savedJobRepository = savedJobRepository;
	}

//	@Transactional
//	public Job saveJob(JobDto jobDTO, String email) {
//		Industry industry = industryRepository.findById(jobDTO.getIndustryId())
//				.orElseThrow(() -> new RuntimeException("Industry not found"));
//
//		Users user = userRepository.findByEmail(email);
//		Employer employer = employerRepository.findByUser(user);
//
//		// Create Job from DTO
//		Job job = new Job();
//		job.setPosition(jobDTO.getPosition());
//		job.setDescription(jobDTO.getDescription());
//		job.setLocation(jobDTO.getLocation());
//		job.setExperience(jobDTO.getExperience());
//		job.setEducation(jobDTO.getEducation());
//		job.setIndustry(industry);
//		job.setSalary(jobDTO.getSalary());
//		job.setPostedAt(new Date());
//		job.setExpiryDate(jobDTO.getExpiryDate());
//		job.setEmployer(employer);
//		job.setDeleted(jobDTO.isDeleted());
//
//		if (jobDTO.getSkills() != null) {
//			List<Skill> skills = jobDTO.getSkills().stream()
//					.map(skillName -> skillRepository.findBySkillName(skillName)).filter(skill -> skill != null)
//					.collect(Collectors.toList());
//			job.setSkills(skills);
//		}
//
//		return jobRepository.save(job);
//	}

	@Override
	public Page<JobDto> listJob(String email, Pageable pageable) {
		Users user = userRepository.findByEmail(email);
		Employer employer = employerRepository.findByUser(user);
		Page<Job> jobs = jobRepository.findAllByEmployer(employer, pageable);
//		return jobs.map(this::convertToDto);
	    LocalDate currentDate = LocalDate.now();

		List<JobDto> activeJobs = jobs.getContent().stream()
		        .filter(job -> job.getExpiryDate().toInstant()
		                         .atZone(ZoneId.systemDefault())
		                         .toLocalDate()
		                         .isAfter(currentDate)) // Convert Date to LocalDate and filter
		        .map(this::convertToDto)
		        .collect(Collectors.toList());

		    return new PageImpl<>(activeJobs, pageable, activeJobs.size());
	}
	
	@Override
	public Page<JobDto> listexpiredJob(String email, Pageable pageable) {
		Users user = userRepository.findByEmail(email);
		Employer employer = employerRepository.findByUser(user);
		Page<Job> jobs = jobRepository.findAllByEmployer(employer, pageable);
//		return jobs.map(this::convertToDto);
	    LocalDate currentDate = LocalDate.now();

		List<JobDto> activeJobs = jobs.getContent().stream()
		        .filter(job -> job.getExpiryDate().toInstant()
		                         .atZone(ZoneId.systemDefault())
		                         .toLocalDate()
		                         .isBefore(currentDate)) // Convert Date to LocalDate and filter
		        .map(this::convertToDto)
		        .collect(Collectors.toList());

		    return new PageImpl<>(activeJobs, pageable, activeJobs.size());
	}

	@Override
	public List<JobDto> getAllJobs(String email) {
		Users currentUser = userRepository.findByEmail(email); // Make sure to adjust this query to match your user
																// retrieval method
		Jobseeker jobSeeker = jobseekerRepository.findByUser(currentUser);
		List<Job> jobs = jobRepository.findAll();
//		return jobs.stream().map(this::convertToDto).toList();
		return jobRepository.findByApproved(true).stream().map(job -> {
			JobDto jobDto = convertToDto(job);
			boolean hasApplied = applicationRepository.existsByJobPostAndJobSeeker(job, jobSeeker);
			boolean hasSaved = savedJobRepository.existsByJobAndUser(job, currentUser);
			jobDto.setHasApplied(hasApplied);
			jobDto.setHasSaved(hasSaved);
			return jobDto;
		}).collect(Collectors.toList());

	}

	@Override
	public JobDto getJobById(Long id) {
		Job job = jobRepository.findById(id).get();
		return convertToDto(job);
	}
	
	@Transactional
	public Job saveJob(JobDto jobDTO, String email) {
	    Industry industry = industryRepository.findById(jobDTO.getIndustryId())
	            .orElseThrow(() -> new RuntimeException("Industry not found"));

	    Users user = userRepository.findByEmail(email);
	    Employer employer = employerRepository.findByUser(user);

	    Job job = new Job();

	    // Check for duplicate job only during creation
//	    if ( jobRepository.existsByPositionAndLocationAndExpiryDate(
//	            jobDTO.getPosition(), jobDTO.getLocation(), jobDTO.getExpiryDate())) {
//	        throw new RuntimeException("Duplicate job found with same position, location, and expiry date.");
//	    }
	    if (jobRepository.existsByPositionAndLocationAndEmployerAndExperienceAndEducationAndIndustryAndSalaryAndDescription(
	            jobDTO.getPosition(),
	            jobDTO.getLocation(),
	            employer,
	            jobDTO.getExperience(),
	            jobDTO.getEducation(),
	            industry,
	            jobDTO.getSalary(),
//	            jobDTO.getSkills(),
	            jobDTO.getDescription()
	    )) {
	        throw new RuntimeException("Duplicate job found.");
	    }

	    // Convert DTO to Job entity
	    convertToJob(job, jobDTO, industry, employer);

	    return jobRepository.save(job);
	}
	
	@Transactional
	public Job verifyJob(Long jobId) {
	    Job job = jobRepository.findById(jobId)
	            .orElseThrow(() -> new RuntimeException("Job not found"));
	    
	    job.setApproved(true);
	    return jobRepository.save(job);
	}
	@Transactional
	public Job updateJob(Long jobId, JobDto jobDTO, String email) {
	    Industry industry = industryRepository.findById(jobDTO.getIndustryId())
	            .orElseThrow(() -> new RuntimeException("Industry not found"));

	    Users user = userRepository.findByEmail(email);
	    Employer employer = employerRepository.findByUser(user);

	    Job job = jobRepository.findById(jobId)
	            .orElseThrow(() -> new RuntimeException("Job not found"));

	    // Check if another job exists with the same position, location, and expiry date
	    boolean isDuplicate = jobRepository.existsByPositionAndLocationAndExpiryDateAndIdNot(
	            jobDTO.getPosition(), jobDTO.getLocation(), jobDTO.getExpiryDate(), jobId);

	    if (isDuplicate) {
	        throw new RuntimeException("Duplicate job found with same position, location, and expiry date.");
	    }

	    convertToJob(job, jobDTO, industry, employer);
	    return jobRepository.save(job);
	}
	
	
	@Override
	public Page<JobDto> getUnapprovedJobs(Pageable pageable) {
//		Page<Job> jobs = jobRepository.findByApproved(false,pageable);
		Page<Job> jobs = jobRepository.findByApprovedFalseAndExpiryDateAfterOrExpiryDateIsNull(
		        new Date(), pageable);
		return jobs.map(this::convertToDto);
	}



	private void convertToJob(Job job, JobDto jobDTO, Industry industry, Employer employer) {
	    job.setPosition(jobDTO.getPosition());
	    job.setDescription(jobDTO.getDescription());
	    job.setLocation(jobDTO.getLocation());
	    job.setExperience(jobDTO.getExperience());
	    job.setEducation(jobDTO.getEducation());
	    job.setSalary(jobDTO.getSalary());
	    job.setExpiryDate(jobDTO.getExpiryDate());
	    job.setIndustry(industry);
	    job.setEmployer(employer);
	    job.setDeleted(jobDTO.isDeleted());
	    if (jobDTO.getSkills() != null) {
	        List<Skill> skills = jobDTO.getSkills().stream()
	                .map(skillRepository::findBySkillName)
	                .filter(Objects::nonNull)
	                .collect(Collectors.toList());
	        job.setSkills(skills);
	    }

	    if (job.getPostedAt() == null) {  // Set posted date only for new jobs
	        job.setPostedAt(new Date());
	    }
	}

	public JobDto convertToDto(Job job) {
		JobDto jobDto = new JobDto();
		jobDto.setId(job.getId());
		jobDto.setPosition(job.getPosition());
		jobDto.setDescription(job.getDescription());
		jobDto.setLocation(job.getLocation());
		jobDto.setExperience(job.getExperience());
		jobDto.setEducation(job.getEducation());
		jobDto.setIndustryId(job.getIndustry().getId());
		jobDto.setSalary(job.getSalary());
		List<String> skillsList = new ArrayList<>();
		for (Skill skill : job.getSkills()) {
			skillsList.add(skill.getSkillName());
		}
		jobDto.setSkills(skillsList);

		jobDto.setPostedAt(job.getPostedAt());
		jobDto.setExpiryDate(job.getExpiryDate());
		jobDto.setDeleted(job.isDeleted());
		jobDto.setApproved(job.isApproved());
		return jobDto;
	}

	
	
}
