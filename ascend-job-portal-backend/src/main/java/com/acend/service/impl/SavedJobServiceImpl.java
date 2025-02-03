package com.acend.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.acend.dto.JobDto;
import com.acend.entity.Job;
import com.acend.entity.SavedJobs;
import com.acend.entity.Skill;
import com.acend.entity.Users;
import com.acend.exception.JobException;
import com.acend.repository.JobRepository;
import com.acend.repository.SavedJobRepository;
import com.acend.repository.UserRepository;
import com.acend.service.SavedJobService;

import jakarta.transaction.Transactional;

@Service
public class SavedJobServiceImpl implements SavedJobService {

	private SavedJobRepository savedJobRepository;

	private JobRepository jobRepository;
	private UserRepository userRepository;

	public SavedJobServiceImpl(SavedJobRepository savedJobRepository, JobRepository jobRepository,
			UserRepository userRepository) {
		super();
		this.savedJobRepository = savedJobRepository;
		this.jobRepository = jobRepository;
		this.userRepository = userRepository;
	}

	@Transactional
	public SavedJobs saveJob(Users user, Long jobId) throws JobException {
		Job job = jobRepository.findById(jobId).orElseThrow(() -> new JobException("Job not found"));
		if (savedJobRepository.existsByUserIdAndJobId(user.getId(), jobId)) {
			throw new JobException("Job already saved");
		}

		SavedJobs savedJob = new SavedJobs();
		savedJob.setActive(true);
		savedJob.setJob(job);
		savedJob.setUser(user);
		savedJob.setSavedDate(LocalDateTime.now());
		savedJobRepository.save(savedJob);
		return savedJob;
	}

	@Override
	public Page<JobDto> getSavedJobsForUser(String email, int page, int size) {
		Users user = userRepository.findByEmail(email);
		Pageable pageable = PageRequest.of(page, size);

		// Modify the repository method to filter by status and isActive
		Page<SavedJobs> savedJobsPage = savedJobRepository.findByUserAndStatusAndIsActive(user, "Active", true,
				pageable);

		return savedJobsPage.map(savedJob -> convertToDto(savedJob.getJob()));
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

		return jobDto;
	}
}
