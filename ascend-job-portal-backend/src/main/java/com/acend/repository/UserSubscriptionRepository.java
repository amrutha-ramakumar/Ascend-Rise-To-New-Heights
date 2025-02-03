package com.acend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acend.entity.UserSubscriptions;
import com.acend.entity.Users;
import com.acend.enums.SubscriptionStatus;

@Repository
public interface UserSubscriptionRepository extends JpaRepository<UserSubscriptions, Long> {

	boolean existsByUserAndStatus(Users user, SubscriptionStatus status);

	Optional<UserSubscriptions> findByUser(Users user);
}