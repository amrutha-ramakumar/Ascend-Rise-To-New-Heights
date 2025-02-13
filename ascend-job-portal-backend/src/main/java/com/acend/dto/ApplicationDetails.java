package com.acend.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.acend.entity.Skill;
import com.acend.enums.Gender;

import lombok.Data;

@Data
public class ApplicationDetails {
	private Long applicationId;
	private LocalDateTime appliedAt;
    private String applicationStatus;

    private String resumePath; 
    private Long UserId;
    private String additionalDetails;
    private String name;
    private String email;
	private String phone;
	private Gender gender;

    private String resumeUrl;
    private String aboutMe;
    private String linkedinUrl;
    private String portfolioUrl;
    private List<String> skills; 
    private List<EducationDto> education;
    private List<ExperienceDto> experience;
    private List<CertificationDto> certifications;
    private List<ExtraCurricularActivityDto> extracurricularActivities;
}
