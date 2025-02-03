package com.acend.service;

import com.acend.dto.ExperienceDto;
import com.acend.entity.Experience;

public interface ExperienceService {

	Experience saveExperience(Experience experience, String email);

	Experience updateExperience(ExperienceDto experience, Long experienceId);

}
