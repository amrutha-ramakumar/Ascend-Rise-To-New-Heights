package com.acend.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.acend.entity.Interview;

public interface InterviewRepository extends JpaRepository<Interview, Long>{

	boolean existsByInterviewDateAndInterviewTime(LocalDate interviewDate, LocalTime interviewTime);

	List<Interview> findByInterviewDate(LocalDate today);
  
}
