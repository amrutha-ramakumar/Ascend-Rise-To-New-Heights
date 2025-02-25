package com.acend.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.acend.config.JwtProvider;
import com.acend.dto.ApplicationDetails;
import com.acend.dto.ApplicationDto;
import com.acend.dto.JobDto;
import com.acend.entity.Application;
import com.acend.entity.Job;
import com.acend.entity.Jobseeker;
import com.acend.entity.SavedJobs;
import com.acend.repository.ApplicaionRepository;
import com.acend.repository.JobRepository;
import com.acend.repository.JobseekerRepository;
import com.acend.repository.SavedJobRepository;
import com.acend.repository.UserRepository;
import com.acend.request.UpdateStatusRequest;
import com.acend.response.Applicationdata;
import com.acend.service.ApplicationService;
import com.acend.service.impl.ApplicationStatusChangeService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

	private ApplicationService applicationService;
	private JwtProvider jwtProvider;

	public ApplicationController(ApplicaionRepository applicationRepository, JobseekerRepository jobSeekerRepository,
			SavedJobRepository savedJobRepository, JobRepository jobRepository, ApplicationService applicationService,
			UserRepository user, JwtProvider jwtProvider,
			ApplicationStatusChangeService applicationStatusChangeService) {
		super();
		this.applicationService = applicationService;
		this.jwtProvider = jwtProvider;
	}

	private final String uploadDir = "src/main/resources/static/resumes/";

	@PostMapping("/apply")
	public ResponseEntity<?> applyToJob(@RequestHeader("Authorization") String jwt, @RequestParam Long jobId,
			@RequestParam(required = false) MultipartFile resume,
			@RequestParam(required = false) String additionalDetails) {
		String email = jwtProvider.getEmailFromToken(jwt);
		return applicationService.applyToJob(email, jobId, resume, additionalDetails);
	}

	@GetMapping("/applied-jobs")
	public ResponseEntity<List<Applicationdata>> listJob(@RequestHeader("Authorization") String jwt) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String email = jwtProvider.getEmailFromToken(jwt);
		List<Applicationdata> jobs = applicationService.findJobs(email);
		return ResponseEntity.ok(jobs);
	}

	@GetMapping("/job/{jobId}")
	public ResponseEntity<?> getApplicationsByJobId(@RequestHeader("Authorization") String jwt,
			@PathVariable Long jobId, @RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size) {
		Page<ApplicationDetails> applications = applicationService.getApplicationsByJobId(jobId, page, size);
		return ResponseEntity.ok(applications);
	}

	@GetMapping("/{aplId}")
	public ResponseEntity<Applicationdata> getApplicationsById(@RequestHeader("Authorization") String jwt,
			@PathVariable String aplId) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Long job = Long.parseLong(aplId);
		Applicationdata applications = applicationService.getApplicationsById(job);
		return ResponseEntity.ok(applications);
	}

	@PostMapping("/{applicationId}/status")
	public ResponseEntity<String> updateApplicationStatus(@RequestHeader("Authorization") String token,
			@PathVariable Long applicationId, @RequestBody UpdateStatusRequest request) {
		applicationService.updateApplicationStatus(applicationId, request.getApplicationStatus());
		return ResponseEntity.ok("Application status updated successfully");
	}

}
