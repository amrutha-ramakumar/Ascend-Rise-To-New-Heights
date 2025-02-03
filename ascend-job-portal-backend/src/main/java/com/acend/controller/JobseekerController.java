package com.acend.controller;

import com.acend.dto.JobseekerDto;
import com.acend.entity.*;
import com.acend.service.JobseekerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jobseeker")
public class JobseekerController {

	private final JobseekerService jobseekerService;

	public JobseekerController(JobseekerService jobseekerService) {
		this.jobseekerService = jobseekerService;
	}

	@PostMapping("/details")
	public ResponseEntity<?> saveJobseekerProfile(@RequestBody JobseekerDto profileRequest,
			@RequestHeader("Authorization") String jwt) {
		return jobseekerService.saveProfile(profileRequest, jwt);

	}

	@GetMapping("/getdetails")
	public ResponseEntity<?> getUserDetails(@RequestHeader("Authorization") String jwt) {
		return jobseekerService.getProfile(jwt);
	}

	@PostMapping("/save")
	public Jobseeker saveJobseeker(@RequestHeader("Authorization") String jwt, @RequestBody JobseekerDto jobseekerDTO) {

		return jobseekerService.saveJobseeker(jobseekerDTO, jwt);
	}
	
	@PutMapping("/update/{jobseekerId}")
    public ResponseEntity<?> updateJobseeker(@RequestHeader("Authorization") String jwt,@PathVariable Long jobseekerId, @RequestBody JobseekerDto jobseekerDto) {
        try {
            JobseekerDto updatedJobseeker = jobseekerService.updateJobseeker(jobseekerId, jobseekerDto);
            return ResponseEntity.ok(updatedJobseeker);
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error updating jobseeker: " + e.getMessage());
        }
    }

}
