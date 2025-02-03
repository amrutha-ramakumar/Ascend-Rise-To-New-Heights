package com.acend.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acend.entity.Jobseeker;
import com.acend.entity.Users;

@Repository
public interface JobseekerRepository extends JpaRepository<Jobseeker, Long>{

	Jobseeker findByUser(Users user);

	Optional<Jobseeker> findByUserEmail(String email);
}
