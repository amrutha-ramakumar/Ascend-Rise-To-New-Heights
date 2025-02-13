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

	private ApplicaionRepository applicationRepository;
	private JobseekerRepository jobSeekerRepository;
	private SavedJobRepository savedJobRepository;
	private JobRepository jobRepository;
	private ApplicationService applicationService;
	private UserRepository user;
	private ApplicationStatusChangeService applicationStatusChangeService;
	private JwtProvider jwtProvider; // Your JWT provider to parse the token

	

	public ApplicationController(ApplicaionRepository applicationRepository, JobseekerRepository jobSeekerRepository,
			SavedJobRepository savedJobRepository, JobRepository jobRepository, ApplicationService applicationService,
			UserRepository user, JwtProvider jwtProvider,ApplicationStatusChangeService applicationStatusChangeService) {
		super();
		this.applicationRepository = applicationRepository;
		this.jobSeekerRepository = jobSeekerRepository;
		this.savedJobRepository = savedJobRepository;
		this.jobRepository = jobRepository;
		this.applicationService = applicationService;
		this.user = user;
		this.jwtProvider = jwtProvider;
		this.applicationStatusChangeService = applicationStatusChangeService;
	}


	private final String uploadDir = "src/main/resources/static/resumes/";
	@PostMapping("/apply")
    public ResponseEntity<?> applyToJob(@RequestHeader("Authorization") String jwt,
                                        @RequestParam Long jobId,
                                        @RequestParam(required = false) MultipartFile resume,
                                        @RequestParam(required = false) String additionalDetails) {
		String email = jwtProvider.getEmailFromToken(jwt);
        return applicationService.applyToJob(email, jobId, resume, additionalDetails);
    }
//	@PostMapping("/apply")
//	public ResponseEntity<?> applyToJob(@RequestHeader("Authorization") String jwt, // Get JWT from the request header
//			@RequestParam Long jobId, @RequestParam(required = false) MultipartFile resume,
//			@RequestParam(required = false) String additionalDetails) {
//		try {
//			String email = jwtProvider.getEmailFromToken(jwt);
//			if (email == null) {
//				return ResponseEntity.badRequest().body("Invalid or expired token.");
//			}
//
//			Optional<Jobseeker> jobSeekerOpt = jobSeekerRepository.findByUserEmail(email); // Assuming findByUserEmail
//																							// exists
//			Optional<Job> jobOpt = jobRepository.findById(jobId);
//
//			if (jobSeekerOpt.isEmpty() || jobOpt.isEmpty()) {
//				return ResponseEntity.badRequest().body("Invalid JobSeeker or Job ID");
//			}
//
//			Jobseeker jobSeeker = jobSeekerOpt.get();
//			Job job = jobOpt.get();
//
//			String resumePath = null;
//			if (resume != null && !resume.isEmpty()) {
//				Path uploadPath = Paths.get(uploadDir);
//				if (!Files.exists(uploadPath)) {
//					Files.createDirectories(uploadPath);
//				}
//				resumePath = uploadDir + resume.getOriginalFilename();
//				Files.write(Paths.get(resumePath), resume.getBytes());
//			}
//
//			
//			// Create Application
//			Application application = new Application();
//			application.setAppliedAt(LocalDateTime.now());
//			application.setApplicationStatus("Applied");
//			application.setJobSeeker(jobSeeker);
//			application.setJobPost(job);
//			application.setResumePath(resumePath);
//			application.setAdditionalDetails(additionalDetails);
//
//			applicationRepository.save(application);
//
//			SavedJobs savedJobs = savedJobRepository.findByJobAndUser(job, user.findByEmail(email));
//			
//			if(savedJobs != null) {
//					savedJobs.setStatus("Applied");
//			savedJobRepository.save(savedJobs);
//			}
//			applicationStatusChangeService.sendApplicationEmail(jobSeeker.getUser().getEmail(), job.getEmployer().getUser().getEmail(), job.getPosition());
//			return ResponseEntity.ok("Application submitted successfully!");
//		} catch (IOException e) {
//			return ResponseEntity.status(500).body("Error saving resume: " + e.getMessage());
//		}
//	}

	@GetMapping("/applied-jobs")
	public ResponseEntity<List<Applicationdata>> listJob(@RequestHeader("Authorization") String jwt) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String email = jwtProvider.getEmailFromToken(jwt);
		List<Applicationdata> jobs =applicationService.findJobs(email);
		return ResponseEntity.ok(jobs);
	}
		
	
	@GetMapping("/job/{jobId}")
	public ResponseEntity<?> getApplicationsByJobId(@RequestHeader("Authorization") String jwt,
	                                                @PathVariable Long jobId,
	                                                @RequestParam(defaultValue = "0") int page,
	                                                @RequestParam(defaultValue = "10") int size) {
	    Page<ApplicationDetails> applications = applicationService.getApplicationsByJobId(jobId, page, size);
	    return ResponseEntity.ok(applications);
	}


	@GetMapping("/{aplId}")
    public ResponseEntity<Applicationdata> getApplicationsById(@RequestHeader("Authorization") String jwt,@PathVariable String aplId) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Long job= Long.parseLong(aplId);
		Applicationdata applications = applicationService.getApplicationsById(job);
        return ResponseEntity.ok(applications);
    }


	@PostMapping("/{applicationId}/status")
    public ResponseEntity<String> updateApplicationStatus(
    		@RequestHeader("Authorization") String token,
            @PathVariable Long applicationId,
            @RequestBody UpdateStatusRequest request) {
        applicationService.updateApplicationStatus(applicationId, request.getApplicationStatus());
        return ResponseEntity.ok("Application status updated successfully");
    }

}

