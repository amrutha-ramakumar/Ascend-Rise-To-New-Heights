package com.acend.service;

import com.acend.dto.EducationDto;
import com.acend.entity.Education;

public interface EducationService {

	Education saveEducation(Education education, String email);

	Education updateEducation(EducationDto education, Long educationId);

}
