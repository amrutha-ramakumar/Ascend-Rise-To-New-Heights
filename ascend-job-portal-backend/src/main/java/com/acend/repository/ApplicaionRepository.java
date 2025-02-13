package com.acend.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acend.entity.Application;
import com.acend.entity.Employer;
import com.acend.entity.Job;
import com.acend.entity.Jobseeker;

@Repository
public interface ApplicaionRepository extends JpaRepository<Application, Long>{

	Page<Application> findByJobPost(Job job, Pageable pageable);

	boolean existsByJobPostAndJobSeeker(Job job, Jobseeker jobSeeker);

	List<Application> findByJobSeeker(Jobseeker jobSeeker);
	
	long countByJobPost(Job jobPost);

    int countByAppliedAt(LocalDateTime date);

	boolean existsByJobSeekerAndJobPost(Jobseeker jobSeeker, Job job);
	
}
