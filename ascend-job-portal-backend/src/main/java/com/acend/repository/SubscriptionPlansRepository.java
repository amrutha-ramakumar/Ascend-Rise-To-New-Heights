package com.acend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.acend.entity.SubscriptionPlans;

public interface SubscriptionPlansRepository extends JpaRepository<SubscriptionPlans, Long>{

	boolean existsByPlanName(String planName);

	List<SubscriptionPlans> findByUserType(String role);

}
