package com.acend.service;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

import com.acend.dto.JobseekerDto;
import com.acend.entity.Jobseeker;

public interface JobseekerService {

	ResponseEntity<?> saveProfile(JobseekerDto profileRequest, String jwt);

	ResponseEntity<?> getProfile(String jwt);

	Jobseeker saveJobseeker(JobseekerDto jobseekerDTO, String jwt);

	JobseekerDto updateJobseeker(Long jobseekerId, JobseekerDto jobseekerDto);

	Page<JobseekerDto> getAllJobseekers(int page, int size);


}
