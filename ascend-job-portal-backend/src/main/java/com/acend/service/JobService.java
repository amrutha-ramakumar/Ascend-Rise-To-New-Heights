package com.acend.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.acend.dto.JobDto;
import com.acend.entity.Job;

public interface JobService {

    Page<JobDto> listJob(String email, Pageable pageable);
	List<JobDto> getAllJobs(String email);
	JobDto getJobById(Long id);
	Job saveJob(JobDto jobDTO, String email);
	Job verifyJob(Long jobId);
	Job updateJob(Long jobId, JobDto jobDTO, String email);
	Page<JobDto> getUnapprovedJobs(Pageable pageable);
	Page<JobDto> listexpiredJob(String email, Pageable pageable);

}
