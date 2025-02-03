package com.acend.service;

import com.acend.dto.UserSubscriptionsDTO;
import com.acend.entity.UserSubscriptions;

public interface UserSubscriptionService {

	UserSubscriptions createSubscription(UserSubscriptionsDTO request, String email);

	UserSubscriptions getSubscriptionDetails(String email);

	UserSubscriptions findUserSubscriptionById(Long subscriptionId);

}
