package com.acend.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.acend.dto.SubscriptionPlanDTO;
import com.acend.entity.SubscriptionPlans;
import com.acend.entity.UserSubscriptions;



public interface SubscriptionPlansService {

	public SubscriptionPlans addPlan(SubscriptionPlanDTO plan);
	
	public Page<SubscriptionPlans> getAllPlansPaginated(int page, int size);
	
	public SubscriptionPlans getSubscriptionPlanById(Long id);
	
	public SubscriptionPlans updatePlan(Long id, SubscriptionPlanDTO updatedPlan);
	
	public List<SubscriptionPlans> getPlansByUserRole(String role);

	public UserSubscriptions getSubscriptionById(String subscriptionId);
}
