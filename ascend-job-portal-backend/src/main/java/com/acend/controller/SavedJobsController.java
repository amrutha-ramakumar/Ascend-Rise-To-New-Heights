package com.acend.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.acend.config.JwtProvider;
import com.acend.dto.JobDto;
import com.acend.dto.SaveJobDto;
import com.acend.entity.SavedJobs;
import com.acend.entity.Users;
import com.acend.repository.UserRepository;
import com.acend.response.SuccessResponse;
import com.acend.service.JobService;
import com.acend.service.SavedJobService;

@RestController
@RequestMapping("/api/jobseeker")
public class SavedJobsController {
	private JwtProvider jwtProvider;
	private UserRepository userRepository;
	private SavedJobService savedJobService;

	public SavedJobsController(JwtProvider jwtProvider, JobService jobService, UserRepository userRepository,
			SavedJobService savedJobService) {
		super();
		this.jwtProvider = jwtProvider;
		this.userRepository = userRepository;
		this.savedJobService = savedJobService;
	}

//	@PostMapping("/savejob")
//	public ResponseEntity<?> postUserDetails(@RequestHeader("Authorization") String jwt,
//			@RequestBody SaveJobDto savejobDto) {
//		try {
//			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//			String email = jwtProvider.getEmailFromToken(jwt);
//			Users user = userRepository.findByEmail(email);
//			SavedJobs savedJob = savedJobService.saveJob(user, savejobDto.getJobId());
//			System.out.println(savedJob);
//            return ResponseEntity.ok("Saved successfully");
//		} catch (Exception e) {
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//					.body(new SuccessResponse("Error saving job"));
//		}
//	}

	@PostMapping("/savejob")
	public ResponseEntity<?> postUserDetails(@RequestHeader("Authorization") String jwt,
			@RequestBody SaveJobDto savejobDto) {
		try {
			String email = jwtProvider.getEmailFromToken(jwt);

			if (email == null) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid token");
			}

			Users user = userRepository.findByEmail(email);

			if (user == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
			}

			// Save the job
			SavedJobs savedJob = savedJobService.saveJob(user, savejobDto.getJobId());

			// Log the saved job for debugging purposes
			System.out.println("Saved Job: " + savedJob);

			return ResponseEntity.ok("Saved successfully");
		} catch (Exception e) {
			// Log the exception for debugging purposes
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new SuccessResponse("Error saving job"));
		}
	}

	@GetMapping("/saved-jobs")
	public ResponseEntity<?> getSavedJobs(@RequestHeader("Authorization") String jwt,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String email = jwtProvider.getEmailFromToken(jwt);
		Page<JobDto> savedJobs = savedJobService.getSavedJobsForUser(email, page, size);
		return ResponseEntity.ok(savedJobs);
	}

}
