package com.acend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.acend.entity.SubscriptionPayment;
import com.acend.entity.Users;

@Repository
public interface SubscriptionPaymentRepository extends JpaRepository<SubscriptionPayment, Long> {

	SubscriptionPayment findByUser(Users user);

	SubscriptionPayment findFirstByUserOrderByCreatedAtDesc(Users user);

	@Query("SELECT SUM(sp.amount) FROM SubscriptionPayment sp")
	Double getTotalPaymentsAmount();
	
	@Query("SELECT Count(sp.amount) FROM SubscriptionPayment sp")
	Long getTotalPersons();
}
