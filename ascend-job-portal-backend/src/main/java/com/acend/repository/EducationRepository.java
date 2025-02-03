package com.acend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acend.dto.EducationDto;
import com.acend.entity.Education;
import com.acend.entity.Jobseeker;

@Repository
public interface EducationRepository extends JpaRepository<Education, Long>{


	List<Education> findByJobseeker(Jobseeker jobseeker);
}
