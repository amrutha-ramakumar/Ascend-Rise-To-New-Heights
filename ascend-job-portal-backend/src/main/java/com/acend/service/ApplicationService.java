package com.acend.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.acend.dto.ApplicationDetails;
import com.acend.dto.ApplicationDto;
import com.acend.dto.JobDto;
import com.acend.response.Applicationdata;

public interface ApplicationService {

	List<Applicationdata> findJobs(String email);

	Page<ApplicationDetails> getApplicationsByJobId(Long jobId, int page, int size);

	Applicationdata getApplicationsById(Long job);

	void updateApplicationStatus(Long applicationId, String applicationStatus);

}
