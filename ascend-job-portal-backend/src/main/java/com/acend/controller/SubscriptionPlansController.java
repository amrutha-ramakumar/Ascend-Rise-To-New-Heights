package com.acend.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.acend.dto.SubscriptionPlanDTO;
import com.acend.entity.SubscriptionPlans;
import com.acend.service.SubscriptionPlansService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/subscription-plans")

public class SubscriptionPlansController {

	private SubscriptionPlansService subscriptionPlansService;
	
	public SubscriptionPlansController(SubscriptionPlansService subscriptionPlansService) {
		super();
		this.subscriptionPlansService = subscriptionPlansService;
	}

	// Add a new subscription plan
    @PostMapping
    public ResponseEntity<SubscriptionPlans> addPlan(
            @RequestHeader(value = "Authorization") String authorizationHeader,
            @Valid @RequestBody SubscriptionPlanDTO plan) {
        SubscriptionPlans createdPlan = subscriptionPlansService.addPlan(plan);
        return ResponseEntity.ok("successfull").status(201).body(createdPlan);
    }
    
//    All plans
    @GetMapping
    public ResponseEntity<Page<SubscriptionPlans>> getAllPlans(
            @RequestHeader(value = "Authorization") String authorizationHeader,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        // Token validation is handled by the security filter
        Page<SubscriptionPlans> plansPage = subscriptionPlansService.getAllPlansPaginated(page, size);
        return ResponseEntity.ok(plansPage);
    }
    
//    Single plan 
    @GetMapping("/{id}")
    public ResponseEntity<SubscriptionPlans> getSubscriptionPlanById(
    		@RequestHeader(value = "Authorization") String authorizationHeader,
    		@PathVariable Long id) {
        SubscriptionPlans subscriptionPlan = subscriptionPlansService.getSubscriptionPlanById(id);
        return ResponseEntity.ok(subscriptionPlan);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<SubscriptionPlans> updatePlan(
            @RequestHeader(value = "Authorization") String authorizationHeader,
            @PathVariable Long id,
            @Valid @RequestBody SubscriptionPlanDTO updatedPlan) {
        // Token validation is handled by the security filter
        SubscriptionPlans updatedSubscriptionPlan = subscriptionPlansService.updatePlan(id, updatedPlan);
        return ResponseEntity.ok(updatedSubscriptionPlan);
    }
    
    @GetMapping("/role/{role}")
    public ResponseEntity<List<SubscriptionPlans>> getPlansByRole(
    		@RequestHeader(value = "Authorization") String authorizationHeader,
    		@PathVariable String role) {
    	return ResponseEntity.ok(subscriptionPlansService.getPlansByUserRole(role));
    }
}
