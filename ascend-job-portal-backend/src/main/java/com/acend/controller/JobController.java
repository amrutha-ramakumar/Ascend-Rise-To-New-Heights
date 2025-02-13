package com.acend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.acend.config.JwtProvider;
import com.acend.dto.JobDto;
import com.acend.entity.Job;
import com.acend.service.JobService;

@RestController
@RequestMapping("/api/jobs")

public class JobController {

	private JobService jobService;
	private JwtProvider jwtProvider;

	public JobController(JobService jobService, JwtProvider jwtProvider) {
		super();
		this.jobService = jobService;
		this.jwtProvider = jwtProvider;
	}

	@PostMapping
	public ResponseEntity<?> createJob(
	        @RequestBody JobDto jobDTO, 
	        @RequestHeader("Authorization") String token) {
	    try {
	        String email = jwtProvider.getEmailFromToken(token);
	        Job savedJob = jobService.saveJob(jobDTO, email);
	        return ResponseEntity.status(HttpStatus.CREATED).body(savedJob);
	    } catch (RuntimeException ex) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", ex.getMessage()));
	    } catch (Exception ex) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "An unexpected error occurred"));
	    }
	}

	
	@PutMapping("/{jobId}")
    public ResponseEntity<Job> updateJob(
            @PathVariable Long jobId, 
            @RequestBody JobDto jobDTO, 
            @RequestHeader("Authorization") String token) {
		String email = jwtProvider.getEmailFromToken(token);
        Job job = jobService.updateJob(jobId, jobDTO, email);
        return ResponseEntity.ok(job);
    }

	@PutMapping("/{jobId}/approve")
	public ResponseEntity<Job> verifyJob(@PathVariable Long jobId) {
	    Job verifiedJob = jobService.verifyJob(jobId);
	    return ResponseEntity.ok(verifiedJob);
	}


	@GetMapping("/listactivejobs")
	public ResponseEntity<Page<JobDto>> listJob(@RequestHeader("Authorization") String jwt,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
		Pageable pageable = PageRequest.of(page, size);
		String email = jwtProvider.getEmailFromToken(jwt);
		Page<JobDto> jobs = jobService.listJob(email, pageable);
		return ResponseEntity.ok(jobs);
	}

	@GetMapping("/listexpiredjobs")
	public ResponseEntity<Page<JobDto>> listExpiredJob(@RequestHeader("Authorization") String jwt,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
		Pageable pageable = PageRequest.of(page, size);
		String email = jwtProvider.getEmailFromToken(jwt);
		Page<JobDto> jobs = jobService.listexpiredJob(email, pageable);
		return ResponseEntity.ok(jobs);
	}
	
	@GetMapping("/listalljob")
	public ResponseEntity<List<JobDto>> listJob(@RequestHeader("Authorization") String jwt) {
		String email = jwtProvider.getEmailFromToken(jwt);
		List<JobDto> jobs = jobService.getAllJobs(email);
		return ResponseEntity.ok(jobs);
	}
	
	@GetMapping("/getNotApproved")
	public ResponseEntity<Page<JobDto>> unapprovedJobs(@RequestHeader("Authorization") String jwt,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size){
		Pageable pageable = PageRequest.of(page, size);
		Page<JobDto> jobs = jobService.getUnapprovedJobs(pageable);
		return ResponseEntity.ok(jobs);
	}

	@GetMapping("/{jobId}")
	public ResponseEntity<JobDto> getJobById(@RequestHeader("Authorization") String jwt, @PathVariable String jobId) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Long id = Long.parseLong(jobId);
		JobDto jobDto = jobService.getJobById(id);

		return ResponseEntity.ok(jobDto);
	}
}
