package com.acend.service.impl;

import org.springframework.stereotype.Service;

import com.acend.dto.ExtraCurricularActivityDto;
import com.acend.entity.ExtraCurricularActivity;
import com.acend.entity.Jobseeker;
import com.acend.repository.ExtraCurricularActivityRepository;
import com.acend.repository.JobseekerRepository;
import com.acend.repository.UserRepository;
import com.acend.service.ExtraCurricularActivityService;

@Service
public class ExtraCurricularActivityServiceImpl implements ExtraCurricularActivityService {

    private final JobseekerRepository jobseekerRepository;
    private final UserRepository userRepository;
    private final ExtraCurricularActivityRepository extraCurricularActivityRepository;

    public ExtraCurricularActivityServiceImpl(JobseekerRepository jobseekerRepository, UserRepository userRepository,
                                              ExtraCurricularActivityRepository extraCurricularActivityRepository) {
        this.jobseekerRepository = jobseekerRepository;
        this.userRepository = userRepository;
        this.extraCurricularActivityRepository = extraCurricularActivityRepository;
    }

    // Save Extra-Curricular Activity
    @Override
    public ExtraCurricularActivity saveActivity(ExtraCurricularActivity activity, String email) {
        Jobseeker jobseeker = jobseekerRepository.findByUser(userRepository.findByEmail(email));
        if (jobseeker == null) {
            throw new RuntimeException("Jobseeker not found for email: " + email);
        }
        activity.setJobseeker(jobseeker);
        return extraCurricularActivityRepository.save(activity);
    }

    // Update Extra-Curricular Activity
    @Override
    public ExtraCurricularActivity updateActivity(Long activityId, ExtraCurricularActivityDto activityDto, String email) {
        ExtraCurricularActivity existingActivity = extraCurricularActivityRepository.findById(activityId)
                .orElseThrow(() -> new RuntimeException("Extra-curricular activity not found"));

        // Check if the activity belongs to the current jobseeker
        Jobseeker jobseeker = jobseekerRepository.findByUser(userRepository.findByEmail(email));
        if (!existingActivity.getJobseeker().equals(jobseeker)) {
            throw new RuntimeException("You are not authorized to update this activity");
        }

        // Update fields
        existingActivity.setActivityName(activityDto.getActivityName());
        existingActivity.setDescription(activityDto.getDescription());
        existingActivity.setAchievementDate(activityDto.getAchievementDate());

        return extraCurricularActivityRepository.save(existingActivity);
    }
}
