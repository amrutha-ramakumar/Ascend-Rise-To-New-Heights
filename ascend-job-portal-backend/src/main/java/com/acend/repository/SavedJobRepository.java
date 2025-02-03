package com.acend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acend.entity.Job;
import com.acend.entity.SavedJobs;
import com.acend.entity.Users;

@Repository
public interface SavedJobRepository extends JpaRepository<SavedJobs, Long>{

	SavedJobs findByJobAndUser(Job job, Users byEmail);

	public boolean existsByUserIdAndJobId(Long id,Long jobId);

	Page<SavedJobs> findByUserAndStatusAndIsActive(Users user, String string, boolean b, Pageable pageable);

	boolean existsByJobAndUser(Job job, Users currentUser);


}
