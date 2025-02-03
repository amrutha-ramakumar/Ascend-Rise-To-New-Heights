package com.acend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acend.dto.ExtraCurricularActivityDto;
import com.acend.entity.ExtraCurricularActivity;
import com.acend.entity.Jobseeker;

@Repository
public interface ExtraCurricularActivityRepository extends JpaRepository<ExtraCurricularActivity, Long>{
	List<ExtraCurricularActivity> findByJobseeker(Jobseeker jobseeker);

}
