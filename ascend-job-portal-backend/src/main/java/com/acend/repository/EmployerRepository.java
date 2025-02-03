package com.acend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.acend.entity.Employer;
import com.acend.entity.Users;

public interface EmployerRepository extends JpaRepository<Employer, Long>{

	Employer findByUser(Users user);
	
	 @Query(value = "SELECT e.* FROM employer e " +
             "JOIN users u ON e.user_id = u.id " +
             "WHERE u.is_approved = false", nativeQuery = true)
Page<Employer> findAllEmployersWithUnapprovedUsers(Pageable pageable);
	
	
}
