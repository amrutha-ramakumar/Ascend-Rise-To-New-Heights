package com.acend.service;


import org.springframework.data.domain.Page;

import com.acend.dto.JobDto;
import com.acend.entity.SavedJobs;
import com.acend.entity.Users;
import com.acend.exception.JobException;

public interface SavedJobService {

	SavedJobs saveJob(Users user, Long jobId) throws JobException;

	Page<JobDto> getSavedJobsForUser(String email, int page, int size);

}
