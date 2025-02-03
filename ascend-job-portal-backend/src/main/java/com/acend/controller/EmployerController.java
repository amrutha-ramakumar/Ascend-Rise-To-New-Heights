package com.acend.controller;

import com.acend.config.JwtProvider;
import com.acend.dto.EmployerDto;
import com.acend.entity.Employer;
import com.acend.response.EmployerDetails;
import com.acend.service.EmployerService;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/employers")
public class EmployerController {

	private final EmployerService employerService;

	private JwtProvider jwtProvider;

	public EmployerController(EmployerService employerService, JwtProvider jwtProvider) {
		this.employerService = employerService;
		this.jwtProvider = jwtProvider;
	}

	@PostMapping("/details")
	public ResponseEntity<Employer> createEmployer(@RequestHeader("Authorization") String jwt,
			@RequestBody EmployerDto employerDto) {
		String email = jwtProvider.getEmailFromToken(jwt);
		Employer savedEmployer = employerService.saveEmployer(employerDto, email);
		return ResponseEntity.ok(savedEmployer);
	}

	@GetMapping("/getdetails")
	public ResponseEntity<EmployerDetails> getDetails(@RequestHeader("Authorization") String jwt) {
		String email = jwtProvider.getEmailFromToken(jwt);
		EmployerDetails employee = employerService.getEmployeeDetails(email);
		return ResponseEntity.ok(employee);
	}

	@PutMapping("/update")
	public ResponseEntity<String> updateEmployer(@RequestBody EmployerDetails request) {
		try {
			employerService.updateEmployerDetails(request);
			return ResponseEntity.ok("Employer details updated successfully.");
		} catch (Exception e) {
			return ResponseEntity.badRequest().body("Error updating employer details: " + e.getMessage());
		}
	}

	@GetMapping("/dashboard")
	public ResponseEntity<Map<String, Object>> getEmployerDashboard(@RequestHeader("Authorization") String token) {
		String email = jwtProvider.getEmailFromToken(token);

		Map<String, Object> dashboardData = employerService.getEmployerDashboardData(email);

		return ResponseEntity.ok(dashboardData);
	}
}
