package com.acend.dto;

import java.util.List;

import com.acend.entity.Certification;
import com.acend.entity.Education;
import com.acend.entity.Experience;
import com.acend.entity.ExtraCurricularActivity;
import com.acend.entity.Skill;
import com.acend.entity.Users;

import lombok.Data;

@Data
public class JobseekerDto {
private Long id;
private String name;
private String email;
private String phone;
	private String resumeUrl;
    private String aboutMe;
    private String linkedinUrl;
    private String portfolioUrl;
    private List<String> skills; 
    private List<Skill> skillList; // List of skill names selected from the skills table
    private List<EducationDto> education;
    private List<ExperienceDto> experience;
    private List<CertificationDto> certifications;
    private List<ExtraCurricularActivityDto> extracurricularActivities;
    private Users user;
    
}
