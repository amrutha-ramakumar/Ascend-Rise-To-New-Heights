package com.acend.service.impl;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.acend.dto.SubscriptionPlanDTO;
import com.acend.entity.SubscriptionPlans;
import com.acend.entity.UserSubscriptions;
import com.acend.exception.ResourceNotFoundException;
import com.acend.repository.SubscriptionPlansRepository;
import com.acend.repository.UserSubscriptionRepository;
import com.acend.service.SubscriptionPlansService;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;



@Service
public class SubscriptionPlansServiceImpl implements SubscriptionPlansService{
	
	private SubscriptionPlansRepository repository;
	private UserSubscriptionRepository userSubscriptionRepository;
	
	public SubscriptionPlansServiceImpl(SubscriptionPlansRepository repository,UserSubscriptionRepository userSubscriptionRepository) {
		super();
		this.repository = repository;
		this.userSubscriptionRepository = userSubscriptionRepository;
	}



	public SubscriptionPlans addPlan(SubscriptionPlanDTO plan) {
	    try {
	    	 if (repository.existsByPlanName(plan.getPlanName())) {
			        throw new IllegalArgumentException("A plan with this name already exists.");
			    }
	        SubscriptionPlans subPlan = new SubscriptionPlans();
	        subPlan.setPlanName(plan.getPlanName());
	        subPlan.setUserType(plan.getUserType());
	        subPlan.setPrice(plan.getPrice());
	        subPlan.setFeatures(plan.getFeatures());
	        subPlan.setDuration(plan.getDuration());
	        subPlan.setIs_active(true);
	        subPlan.setCreated_at(LocalDateTime.now());
	        subPlan.setUpdated_at(LocalDateTime.now());
	        return repository.save(subPlan);
	    } catch (DataIntegrityViolationException ex) {
	        throw new IllegalArgumentException("A plan with the name '" + plan.getPlanName() + "' already exists.");
	    }
	}
	
	@Override
	public Page<SubscriptionPlans> getAllPlansPaginated(int page, int size) {
        return repository.findAll(PageRequest.of(page, size));
    }
	
	@Override
	public SubscriptionPlans getSubscriptionPlanById(Long id) {
        Optional<SubscriptionPlans> subscriptionPlan = repository.findById(id);
        if (subscriptionPlan.isPresent()) {
            return subscriptionPlan.get();
        } else {
            throw new ResourceNotFoundException("Subscription plan not found with id " + id);
        }
    }
	
	@Override
	public SubscriptionPlans updatePlan(Long id, SubscriptionPlanDTO updatedPlan) {
        Optional<SubscriptionPlans> existingPlanOpt = repository.findById(id);
        if (existingPlanOpt.isPresent()) {
            SubscriptionPlans existingPlan = existingPlanOpt.get();
            existingPlan.setPlanName(updatedPlan.getPlanName());
            existingPlan.setUserType(updatedPlan.getUserType());
            existingPlan.setPrice(updatedPlan.getPrice());
            existingPlan.setDuration(updatedPlan.getDuration());
            existingPlan.setFeatures(updatedPlan.getFeatures());
            existingPlan.setIs_active(updatedPlan.getIs_active());
            existingPlan.setUpdated_at(LocalDateTime.now());
            return repository.save(existingPlan);
        } else {
            throw new ResourceNotFoundException("Subscription plan not found with id " + id);
        }
    }
	
	@Override
	public List<SubscriptionPlans> getPlansByUserRole(String role) {
        return repository.findByUserType(role);
    }

	@Override
	public UserSubscriptions getSubscriptionById(String subscriptionId) {
		UserSubscriptions userSubscriptions = userSubscriptionRepository.findById(Long.parseLong(subscriptionId)).get();
		return userSubscriptions;
	}
}
