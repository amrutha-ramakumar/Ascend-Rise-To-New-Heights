package com.acend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.acend.dto.JobseekerDto;
import com.acend.repository.SubscriptionPaymentRepository;
import com.acend.request.VerifyRequest;
import com.acend.response.EmployerDetails;
import com.acend.service.EmployerService;
import com.acend.service.JobseekerService;
import com.acend.service.UserService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

	private EmployerService employerService;
	private JobseekerService jobseekerService;
	private UserService userService;
	private SubscriptionPaymentRepository subscriptionPaymentRepository;

	public AdminController(EmployerService employerService, JobseekerService jobseekerService, UserService userService,
			SubscriptionPaymentRepository subscriptionPaymentRepository) {
		super();
		this.employerService = employerService;
		this.jobseekerService = jobseekerService;
		this.userService = userService;
		this.subscriptionPaymentRepository = subscriptionPaymentRepository;
	}

	@GetMapping("/getemployerdetails")
	public ResponseEntity<Page<EmployerDetails>> getAllEmployers(@RequestHeader("Authorization") String token,
			@RequestParam int page, @RequestParam int size) {
		Page<EmployerDetails> employers = employerService.getAllEmployers(page, size);
		return ResponseEntity.ok(employers);
	}

	@GetMapping("/getemployer/{id}")
	public ResponseEntity<EmployerDetails> getEmployer(@RequestHeader("Authorization") String token,
			@PathVariable Long id)
	{
		EmployerDetails employers = employerService.getEmployers(id);
		return ResponseEntity.ok(employers);
	}

	@GetMapping("/getjobseekerdetails")
	public Page<JobseekerDto> getJobseekerDetails(@RequestHeader("Authorization") String token, @RequestParam int page,
			@RequestParam int size) {
		return jobseekerService.getAllJobseekers(page, size);
	}

	@PostMapping("/verify")
	public ResponseEntity<?> verifyEmployer(@RequestHeader("Authorization") String token,
			@RequestBody VerifyRequest request) {
		return employerService.verifyEmployer(request);
	}
// works well changing because need reason for blocking
//	@PostMapping("/block/{id}")
//	public ResponseEntity<?> blockUser(@RequestHeader("Authorization") String token, @PathVariable Long id) {
//		try {
//			String message = userService.blockUser(id);
//			return ResponseEntity.ok(new HashMap<String, String>() {
//				{
//					put("message", message);
//				}
//			}); 
//		} catch (RuntimeException e) {
//			return ResponseEntity.status(404).body(new HashMap<String, String>() {
//				{
//					put("message", e.getMessage());
//				}
//			}); 
//		} catch (Exception e) {
//			return ResponseEntity.status(500).body(new HashMap<String, String>() {
//				{
//					put("message", "An error occurred while blocking the user.");
//				}
//			});
//		}
//	}

	@PostMapping("/block/{id}")
	public ResponseEntity<?> blockUser(@RequestHeader("Authorization") String token, 
	                                   @PathVariable Long id, 
	                                   @RequestBody Map<String, String> requestBody) {
	    try {
	        String reason = requestBody.get("reason"); // Extract the reason from request body
	        String message = userService.blockUser(id, reason); // Pass the reason to the service
	        return ResponseEntity.ok(new HashMap<String, String>() {{
	            put("message", message);
	        }});
	    } catch (RuntimeException e) {
	        return ResponseEntity.status(404).body(new HashMap<String, String>() {{
	            put("message", e.getMessage());
	        }});
	    } catch (Exception e) {
	        return ResponseEntity.status(500).body(new HashMap<String, String>() {{
	            put("message", "An error occurred while blocking the user.");
	        }});
	    }
	}

	@PostMapping("/unblock/{id}")
	public ResponseEntity<?> unblockUser(@RequestHeader("Authorization") String token, @PathVariable Long id) {
		try {
			String message = userService.unblockUser(id);
			return ResponseEntity.ok(new HashMap<String, String>() {
				{
					put("message", message);
				}
			});
		} catch (RuntimeException e) {
			return ResponseEntity.status(404).body(new HashMap<String, String>() {
				{
					put("message", e.getMessage());
				}
			});
		} catch (Exception e) {
			return ResponseEntity.status(500).body(new HashMap<String, String>() {
				{
					put("message", "An error occurred while unblocking the user.");
				}
			});
		}
	}

	@GetMapping("/total-amount")
	public ResponseEntity<?> total(@RequestHeader("Authorization") String token) {
		Double amount = subscriptionPaymentRepository.getTotalPaymentsAmount();
		Long count = subscriptionPaymentRepository.getTotalPersons();
		Map<String, Object> response = new HashMap<>();
		response.put("totalAmount", amount);
		response.put("totalUsers", count);
		return ResponseEntity.ok(response);
	}

}
