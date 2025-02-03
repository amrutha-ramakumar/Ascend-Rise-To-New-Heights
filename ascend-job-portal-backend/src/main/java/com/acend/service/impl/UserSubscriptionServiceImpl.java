package com.acend.service.impl;

import java.time.LocalDateTime;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.acend.dto.UserSubscriptionsDTO;
import com.acend.entity.SubscriptionPlans;
import com.acend.entity.UserSubscriptions;
import com.acend.entity.Users;
import com.acend.enums.SubscriptionStatus;
import com.acend.exception.ResourceNotFoundException;
import com.acend.repository.SubscriptionPlansRepository;
import com.acend.repository.UserRepository;
import com.acend.repository.UserSubscriptionRepository;
import com.acend.service.UserSubscriptionService;

import java.util.Optional;



@Service
public class UserSubscriptionServiceImpl implements UserSubscriptionService {

	private UserRepository userRepository;

	private UserSubscriptionRepository userSubscriptionRepository;

	private SubscriptionPlansRepository subscriptionPlansRepository;
	
	public UserSubscriptionServiceImpl(UserRepository userRepository,
			UserSubscriptionRepository userSubscriptionRepository,
			SubscriptionPlansRepository subscriptionPlansRepository) {
		super();
		this.userRepository = userRepository;
		this.userSubscriptionRepository = userSubscriptionRepository;
		this.subscriptionPlansRepository = subscriptionPlansRepository;
	}

	@Override
	public UserSubscriptions createSubscription(UserSubscriptionsDTO request,String email) {
        Users user = userRepository.findByEmail(email);
        try {
        	if(userSubscriptionRepository.existsByUserAndStatus(user, SubscriptionStatus.ACTIVE)) {
        		throw new ResourceNotFoundException("User already have an active subscription");
        	}
        	SubscriptionPlans plans =subscriptionPlansRepository.findById(request.getPlan()).get();
        	UserSubscriptions subscription = new UserSubscriptions();
            subscription.setUser(user);
            subscription.setPlan(plans);
            subscription.setAutoRenewal(request.getAutoRenewal());
            subscription.setStatus(SubscriptionStatus.INACTIVE);
            subscription.setCreatedAt(LocalDateTime.now());
            subscription.setUpdatedAt(LocalDateTime.now());
            return userSubscriptionRepository.save(subscription);
        }
	catch (DataIntegrityViolationException ex) {
        throw new IllegalArgumentException("User with an active plan already exists.");
    }
    }


	 public UserSubscriptions getSubscriptionDetails(String token) {	      
	        return userSubscriptionRepository.findByUser(userRepository.findByEmail(token)).get();
	    }

	@Override
	public UserSubscriptions findUserSubscriptionById(Long subscriptionId) {
		
		return userSubscriptionRepository.findById(subscriptionId).get();
	}

}
