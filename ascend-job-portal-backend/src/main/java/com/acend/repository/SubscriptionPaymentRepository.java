package com.acend.repository;

import java.util.List;

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
	
	@Query("SELECT SUM(sp.amount) FROM SubscriptionPayment sp WHERE YEAR(sp.paymentDate) = :year")
    Double getTotalIncomeByYear(int year);

    @Query("SELECT MONTH(sp.paymentDate), SUM(sp.amount) FROM SubscriptionPayment sp WHERE YEAR(sp.paymentDate) = :year GROUP BY MONTH(sp.paymentDate)")
    List<Object[]> getMonthlyIncomeByYear(int year);

    @Query("SELECT DAY(sp.paymentDate), SUM(sp.amount) FROM SubscriptionPayment sp WHERE YEAR(sp.paymentDate) = :year AND MONTH(sp.paymentDate) = :month GROUP BY DAY(sp.paymentDate)")
    List<Object[]> getDailyIncomeByMonth(int year, int month);
}
