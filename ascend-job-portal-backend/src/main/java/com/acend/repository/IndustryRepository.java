package com.acend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acend.entity.Industry;

@Repository
public interface IndustryRepository extends JpaRepository<Industry, Long>{
 
	Industry findByIndustryType(String industryType);
}
