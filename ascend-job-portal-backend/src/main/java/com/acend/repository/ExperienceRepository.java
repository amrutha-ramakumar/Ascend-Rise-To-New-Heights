package com.acend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acend.dto.ExperienceDto;
import com.acend.entity.Education;
import com.acend.entity.Experience;
import com.acend.entity.Jobseeker;

@Repository
public interface ExperienceRepository extends JpaRepository<Experience, Long>{
	List<Experience> findByJobseeker(Jobseeker jobseeker);
}
