package com.acend.request;

import java.util.List;

import com.acend.entity.Certification;
import com.acend.entity.Education;
import com.acend.entity.Experience;
import com.acend.entity.ExtraCurricularActivity;

import lombok.Data;

@Data
public class JobseekerProfileRequest {

	private String resumeUrl;
    private String aboutMe;
    private String linkedinUrl;
    private String portfolioUrl;

    private List<String> skills; // Skill names
    private List<Education> educationList;
    private List<Experience> experienceList;
    private List<Certification> certificationList;
    private List<ExtraCurricularActivity> extraCurricularActivities;
}
