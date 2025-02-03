package com.acend.controller;


import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.acend.config.JwtProvider;
import com.acend.dto.UserSubscriptionsDTO;
import com.acend.entity.UserSubscriptions;
import com.acend.service.UserSubscriptionService;



@RestController
@RequestMapping("/api/user-subscriptions")
public class UserSubscriptionController {

    private JwtProvider jwtProvider;
    private UserSubscriptionService userSubscriptionService;

    
    public UserSubscriptionController(JwtProvider jwtProvider, UserSubscriptionService userSubscriptionService) {
		super();
		this.jwtProvider = jwtProvider;
		this.userSubscriptionService = userSubscriptionService;
	}

	@PostMapping
    public ResponseEntity<UserSubscriptions> createSubscription(
    		@RequestHeader(value = "Authorization") String jwt,
    		@RequestBody UserSubscriptionsDTO request) {
    	String email = jwtProvider.getEmailFromToken(jwt);
        UserSubscriptions subscription = userSubscriptionService.createSubscription(request,email);
        return ResponseEntity.status(HttpStatus.CREATED).body(subscription);
    }
	

	
	@GetMapping
    public ResponseEntity<?> getUserSubscriptions(@RequestHeader("Authorization") String token) {
        try {
        	String email = jwtProvider.getEmailFromToken(token);
            UserSubscriptions subscription = userSubscriptionService.getSubscriptionDetails(email);
            return ResponseEntity.ok(subscription);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        }
    }

//    @PutMapping("/{subscriptionId}/activate")
//    public ResponseEntity<Void> activateSubscription(
//    		@RequestHeader(value = "Authorization") String jwt,
//    		@PathVariable Long subscriptionId) {
//    	String email = jwtProvider.getEmailFromToken(jwt);
//        userSubscriptionService.activateSubscription(subscriptionId,email);
//        return ResponseEntity.noContent().build();
//    }
}
