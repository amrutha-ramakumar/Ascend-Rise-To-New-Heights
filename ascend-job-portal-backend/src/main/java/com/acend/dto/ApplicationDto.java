package com.acend.dto;

import java.time.LocalDateTime;

import com.acend.entity.Job;
import com.acend.entity.Jobseeker;

import jakarta.persistence.Lob;
import lombok.Data;
@Data
public class ApplicationDto {

	private Long id;
	private LocalDateTime appliedAt;
    private String applicationStatus;

    private Jobseeker jobSeeker; 

    private Job jobPost; 

    private String resumePath; 

    private String additionalDetails; 
}
