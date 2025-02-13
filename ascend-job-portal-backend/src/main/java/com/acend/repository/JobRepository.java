package com.acend.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.acend.entity.Employer;
import com.acend.entity.Job;

@Repository
public interface JobRepository extends JpaRepository<Job, Long>{

	Page<Job> findAllByEmployer(Employer employer, Pageable pageable);

	Page<Job> findByApproved(boolean approved,Pageable pagable);
	int countByEmployer(Employer employer);

	List<Job> findByEmployer(Employer employer);
	List<Job> findByApproved(boolean approved);

	boolean existsByPositionAndLocationAndExpiryDate(String position, String location, Date expiryDate);

	boolean existsByPositionAndLocationAndExpiryDateAndIdNot(String position, String location, Date expiryDate,
			Long jobId);
}
