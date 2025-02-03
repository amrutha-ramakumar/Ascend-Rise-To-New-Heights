package com.acend.service;

import com.acend.dto.ExtraCurricularActivityDto;
import com.acend.entity.ExtraCurricularActivity;

public interface ExtraCurricularActivityService {

	ExtraCurricularActivity saveActivity(ExtraCurricularActivity activity, String email);

	ExtraCurricularActivity updateActivity(Long activityId, ExtraCurricularActivityDto activityDto, String email);

}
