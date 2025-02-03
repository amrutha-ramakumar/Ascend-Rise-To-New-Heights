package com.acend.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acend.dto.CertificationDto;
import com.acend.entity.Certification;
import com.acend.entity.Jobseeker;

@Repository
public interface CertificationRepository extends JpaRepository<Certification, Long>{
	List<Certification> findByJobseeker(Jobseeker jobseeker);
}
