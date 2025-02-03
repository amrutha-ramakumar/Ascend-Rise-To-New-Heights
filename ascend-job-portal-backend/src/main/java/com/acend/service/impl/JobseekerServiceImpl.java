package com.acend.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.acend.config.JwtProvider;
import com.acend.dto.CertificationDto;
import com.acend.dto.EducationDto;
import com.acend.dto.ExperienceDto;
import com.acend.dto.ExtraCurricularActivityDto;
import com.acend.dto.JobseekerDto;
import com.acend.entity.Certification;
import com.acend.entity.Education;
import com.acend.entity.Experience;
import com.acend.entity.ExtraCurricularActivity;
import com.acend.entity.Jobseeker;
import com.acend.entity.Skill;
import com.acend.entity.Users;
import com.acend.repository.CertificationRepository;
import com.acend.repository.EducationRepository;
import com.acend.repository.ExperienceRepository;
import com.acend.repository.ExtraCurricularActivityRepository;
import com.acend.repository.JobseekerRepository;
import com.acend.repository.SkillRepository;
import com.acend.repository.UserRepository;
import com.acend.service.JobseekerService;

import jakarta.transaction.Transactional;

@Service
public class JobseekerServiceImpl implements JobseekerService {

	private final JwtProvider jwtProvider;
	private final UserRepository userRepository;
	private final JobseekerRepository jobseekerRepository;
	private final SkillRepository skillRepository;
	private final EducationRepository educationRepository;
	private final ExperienceRepository experienceRepository;
	private final CertificationRepository certificationRepository;
	private final ExtraCurricularActivityRepository extraCurricularActivityRepository;

	public JobseekerServiceImpl(JwtProvider jwtProvider, UserRepository userRepository,
			JobseekerRepository jobseekerRepository, SkillRepository skillRepository,
			EducationRepository educationRepository, ExperienceRepository experienceRepository,
			CertificationRepository certificationRepository,
			ExtraCurricularActivityRepository extraCurricularActivityRepository) {
		this.jwtProvider = jwtProvider;
		this.userRepository = userRepository;
		this.jobseekerRepository = jobseekerRepository;
		this.skillRepository = skillRepository;
		this.educationRepository = educationRepository;
		this.experienceRepository = experienceRepository;
		this.certificationRepository = certificationRepository;
		this.extraCurricularActivityRepository = extraCurricularActivityRepository;
	}

	@Override
	public ResponseEntity<?> saveProfile(JobseekerDto profileRequest, String jwt) {
		try {
			String email = jwtProvider.getEmailFromToken(jwt);
			Users user = userRepository.findByEmail(email);

			if (user == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No user found");
			}

			Jobseeker jobseeker = new Jobseeker();
			jobseeker.setUser(user);
			jobseeker.setResumeUrl(profileRequest.getResumeUrl());
			jobseeker.setAboutMe(profileRequest.getAboutMe());
			jobseeker.setLinkedinUrl(profileRequest.getLinkedinUrl());
			jobseeker.setPortfolioUrl(profileRequest.getPortfolioUrl());

			jobseekerRepository.save(jobseeker);

			if (profileRequest.getSkills() != null) {
				List<Skill> skills = profileRequest.getSkills().stream()
						.map(skillName -> skillRepository.findBySkillName(skillName)).filter(skill -> skill != null)
						.toList();
				jobseeker.setSkills(skills);
			}

			// Handle Education
			if (profileRequest.getEducation() != null) {
				profileRequest.getEducation().forEach(education -> {
					Education educationEntity = new Education();
					educationEntity.setQualificationLevel(education.getQualificationLevel());
					educationEntity.setInstitutionName(education.getInstitutionName());
					educationEntity.setBoardOrUniversity(education.getBoardOrUniversity());
					educationEntity.setFieldOfStudy(education.getFieldOfStudy());
					educationEntity.setStartYear(education.getStartYear());
					educationEntity.setEndYear(education.getEndYear());
					educationEntity.setPercentage(education.getPercentage());
					educationEntity.setJobseeker(jobseeker);
					educationRepository.save(educationEntity);
				});
			}

			// Handle Experience
			if (profileRequest.getExperience() != null) {
				profileRequest.getExperience().forEach(experience -> {
					Experience experienceEntity = new Experience();
					experienceEntity.setCompanyName(experience.getCompanyName());
					experienceEntity.setJobTitle(experience.getJobTitle());
					experienceEntity.setStartDate(experience.getStartDate());
					experienceEntity.setEndDate(experience.getEndDate());
					experienceEntity.setResponsibilities(experience.getResponsibilities());
					experienceEntity.setJobseeker(jobseeker);
					experienceRepository.save(experienceEntity);
				});
			}

			// Handle Certifications
			if (profileRequest.getCertifications() != null) {
				profileRequest.getCertifications().forEach(certification -> {
					Certification certificationEntity = new Certification();
					certificationEntity.setCertificationName(certification.getCertificationName());
					certificationEntity.setIssuedBy(certification.getIssuedBy());
					certificationEntity.setIssueDate(certification.getIssueDate());
					certificationEntity.setExpiryDate(certification.getExpiryDate());
					certificationEntity.setJobseeker(jobseeker);
					certificationRepository.save(certificationEntity);
				});
			}

			// Handle Extra-Curricular Activities
			if (profileRequest.getExtracurricularActivities() != null) {
				profileRequest.getExtracurricularActivities().forEach(activity -> {
					ExtraCurricularActivity activityEntity = new ExtraCurricularActivity();
					activityEntity.setActivityName(activity.getActivityName());
					activityEntity.setDescription(activity.getDescription());
					activityEntity.setAchievementDate(activity.getAchievementDate());
					activityEntity.setJobseeker(jobseeker);
					extraCurricularActivityRepository.save(activityEntity);
				});
			}

			return ResponseEntity.status(HttpStatus.CREATED).body("Jobseeker profile saved successfully");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("An error occurred while saving the profile");
		}
	}

	@Override
	public ResponseEntity<?> getProfile(String jwt) {
		try {
			String email = jwtProvider.getEmailFromToken(jwt);
			Users user = userRepository.findByEmail(email);

			if (user == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
			}

			Jobseeker jobseeker = jobseekerRepository.findByUser(user);
			if (jobseeker == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Jobseeker Details not found.");
			}
			List<EducationDto> educationList = educationRepository.findByJobseeker(jobseeker).stream()
					.map(this::mapToEducationDto).collect(Collectors.toList());
			List<ExperienceDto> experienceList = experienceRepository.findByJobseeker(jobseeker).stream()
					.map(this::mapToExperienceDto).collect(Collectors.toList());
			List<CertificationDto> certificationsList = certificationRepository.findByJobseeker(jobseeker).stream()
					.map(this::mapToCertificationDto).collect(Collectors.toList());
			;
			List<ExtraCurricularActivityDto> extraCurricularActivitiesList = extraCurricularActivityRepository
					.findByJobseeker(jobseeker).stream().map(this::mapToExtraCurricularActivityDto)
					.collect(Collectors.toList());
			;

			JobseekerDto jobseekerDto = new JobseekerDto();
			jobseekerDto.setId(jobseeker.getJobseekerId());
			jobseekerDto.setResumeUrl(jobseeker.getResumeUrl());
			jobseekerDto.setAboutMe(jobseeker.getAboutMe());
			jobseekerDto.setLinkedinUrl(jobseeker.getLinkedinUrl());
			jobseekerDto.setPortfolioUrl(jobseeker.getPortfolioUrl());
			jobseekerDto.setSkillList(jobseeker.getSkills());
			jobseekerDto.setEducation(educationList);
			jobseekerDto.setUser(jobseeker.getUser());
			jobseekerDto.setExperience(experienceList);
			jobseekerDto.setCertifications(certificationsList);
			jobseekerDto.setExtracurricularActivities(extraCurricularActivitiesList);

			return ResponseEntity.ok(jobseekerDto);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("An error occurred while retrieving employer details.");
		}
	}

	public EducationDto mapToEducationDto(Education education) {
		EducationDto educationDto = new EducationDto();
		educationDto.setId(education.getEducationId());
		educationDto.setQualificationLevel(education.getQualificationLevel());
		educationDto.setInstitutionName(education.getInstitutionName());
		educationDto.setBoardOrUniversity(education.getBoardOrUniversity());
		educationDto.setFieldOfStudy(education.getFieldOfStudy());
		educationDto.setStartYear(education.getStartYear());
		educationDto.setEndYear(education.getEndYear());
		educationDto.setPercentage(education.getPercentage());
		return educationDto;

	}

	public ExperienceDto mapToExperienceDto(Experience experience) {
		ExperienceDto experienceDto = new ExperienceDto();
		experienceDto.setId(experience.getExperienceId());
		experienceDto.setCompanyName(experience.getCompanyName());
		experienceDto.setJobTitle(experience.getJobTitle());
		experienceDto.setStartDate(experience.getStartDate());
		experienceDto.setEndDate(experience.getEndDate());
		experienceDto.setResponsibilities(experience.getResponsibilities());
		return experienceDto;
	}

	public CertificationDto mapToCertificationDto(Certification certification) {
		CertificationDto certificationDto = new CertificationDto();
		certificationDto.setId(certification.getCertificationId());
		certificationDto.setCertificationName(certification.getCertificationName());
		certificationDto.setIssuedBy(certification.getIssuedBy());
		certificationDto.setIssueDate(certification.getIssueDate());
		certificationDto.setExpiryDate(certification.getExpiryDate());
		return certificationDto;
	}

	public ExtraCurricularActivityDto mapToExtraCurricularActivityDto(ExtraCurricularActivity activity) {
		ExtraCurricularActivityDto activityDto = new ExtraCurricularActivityDto();
		activityDto.setId(activity.getActivityId());
		activityDto.setActivityName(activity.getActivityName());
		activityDto.setDescription(activity.getDescription());
		activityDto.setAchievementDate(activity.getAchievementDate());
		return activityDto;
	}

	@Override
	@Transactional
	public Jobseeker saveJobseeker(JobseekerDto jobseekerDTO, String jwt) {
		Users user = userRepository.findByEmail(jwtProvider.getEmailFromToken(jwt));
		Jobseeker jobseeker = new Jobseeker();
		jobseeker.setResumeUrl(jobseekerDTO.getResumeUrl());
		jobseeker.setAboutMe(jobseekerDTO.getAboutMe());
		jobseeker.setLinkedinUrl(jobseekerDTO.getLinkedinUrl());
		jobseeker.setPortfolioUrl(jobseekerDTO.getPortfolioUrl());

		jobseeker.setUser(user);
		// Save skills

		if (jobseekerDTO.getSkills() != null) {
			List<Skill> skills = jobseekerDTO.getSkills().stream()
					.map(skillName -> skillRepository.findBySkillName(skillName)).filter(skill -> skill != null)
					.toList();
			jobseeker.setSkills(skills);
		} 

		List<Education> educationList = mapEducationDTOs(jobseekerDTO.getEducation(), jobseeker);
		educationRepository.saveAll(educationList);

		// Save experience
		List<Experience> experienceList = mapExperienceDTOs(jobseekerDTO.getExperience(), jobseeker);
		experienceRepository.saveAll(experienceList);

		// Save certifications
		List<Certification> certificationList = mapCertificationDTOs(jobseekerDTO.getCertifications(), jobseeker);
		certificationRepository.saveAll(certificationList);

		// Save extracurricular activities
		List<ExtraCurricularActivity> extracurricularActivityList = mapExtraCurricularActivityDTOs(
				jobseekerDTO.getExtracurricularActivities(), jobseeker);
		extraCurricularActivityRepository.saveAll(extracurricularActivityList);

		return jobseekerRepository.save(jobseeker);
	}

	private List<Education> mapEducationDTOs(List<EducationDto> educationDTOs, Jobseeker jobseeker) {
		List<Education> educationList = new ArrayList<>();
		for (EducationDto educationDTO : educationDTOs) {
			Education education = new Education();
			education.setQualificationLevel(educationDTO.getQualificationLevel());
			education.setInstitutionName(educationDTO.getInstitutionName());
			education.setBoardOrUniversity(educationDTO.getBoardOrUniversity());
			education.setFieldOfStudy(educationDTO.getFieldOfStudy());
			education.setStartYear(educationDTO.getStartYear());
			education.setEndYear(educationDTO.getEndYear());
			education.setPercentage(educationDTO.getPercentage());
			education.setJobseeker(jobseeker); // Associate with the Jobseeker entity
			educationList.add(education);
		}
		return educationList;
	}

	private List<Experience> mapExperienceDTOs(List<ExperienceDto> experienceDTOs, Jobseeker jobseeker) {
		List<Experience> experienceList = new ArrayList<>();
		for (ExperienceDto experienceDTO : experienceDTOs) {
			Experience experience = new Experience();
			experience.setCompanyName(experienceDTO.getCompanyName());
			experience.setJobTitle(experienceDTO.getJobTitle());
			experience.setStartDate(experienceDTO.getStartDate());
			experience.setEndDate(experienceDTO.getEndDate());
			experience.setResponsibilities(experienceDTO.getResponsibilities());
			experience.setJobseeker(jobseeker); // Associate with the Jobseeker entity
			experienceList.add(experience);
		}
		return experienceList;
	}

	private List<Certification> mapCertificationDTOs(List<CertificationDto> certificationDTOs, Jobseeker jobseeker) {
		List<Certification> certificationList = new ArrayList<>();
		for (CertificationDto certificationDTO : certificationDTOs) {
			Certification certification = new Certification();
			certification.setCertificationName(certificationDTO.getCertificationName());
			certification.setIssuedBy(certificationDTO.getIssuedBy());
			certification.setIssueDate(certificationDTO.getIssueDate());
			certification.setExpiryDate(certificationDTO.getExpiryDate());
			certification.setJobseeker(jobseeker); // Associate with the Jobseeker entity
			certificationList.add(certification);
		}
		return certificationList;
	}

	private List<ExtraCurricularActivity> mapExtraCurricularActivityDTOs(
			List<ExtraCurricularActivityDto> extracurricularActivityDTOs, Jobseeker jobseeker) {
		List<ExtraCurricularActivity> extracurricularActivityList = new ArrayList<>();
		for (ExtraCurricularActivityDto extracurricularActivityDTO : extracurricularActivityDTOs) {
			ExtraCurricularActivity activity = new ExtraCurricularActivity();
			activity.setActivityName(extracurricularActivityDTO.getActivityName());
			activity.setDescription(extracurricularActivityDTO.getDescription());
			activity.setAchievementDate(extracurricularActivityDTO.getAchievementDate());
			activity.setJobseeker(jobseeker); // Associate with the Jobseeker entity
			extracurricularActivityList.add(activity);
		}
		return extracurricularActivityList;
	}
	
	public JobseekerDto updateJobseeker(Long jobseekerId, JobseekerDto jobseekerDto) {
        Optional<Jobseeker> optionalJobseeker = jobseekerRepository.findById(jobseekerId);
        if (!optionalJobseeker.isPresent()) {
            throw new RuntimeException("Jobseeker not found");
        }

        Jobseeker jobseeker = optionalJobseeker.get();

        jobseeker.setResumeUrl(jobseekerDto.getResumeUrl());
        jobseeker.setAboutMe(jobseekerDto.getAboutMe());
        jobseeker.setLinkedinUrl(jobseekerDto.getLinkedinUrl());
        jobseeker.setPortfolioUrl(jobseekerDto.getPortfolioUrl());

        List<Skill> updatedSkills = jobseekerDto.getSkillList();
        updatedSkills.forEach(skill -> {
            if (!jobseeker.getSkills().contains(skill)) {
                jobseeker.getSkills().add(skill);
            }
        });

        jobseekerRepository.save(jobseeker);

        jobseekerDto.setId(jobseeker.getJobseekerId()); // Ensure jobseekerId is set
        return jobseekerDto;
    }
	
	public Page<JobseekerDto> getAllJobseekers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Jobseeker> jobseekerPage = jobseekerRepository.findAll(pageable);

        // Convert Jobseeker entity to JobseekerDto
        return jobseekerPage.map(jobseeker -> {
        	JobseekerDto dto = new JobseekerDto();
        	dto.setName(jobseeker.getUser().getFirstName() + " "+jobseeker.getUser().getLastName());
        	dto.setEmail(jobseeker.getUser().getEmail());
        	dto.setPhone(jobseeker.getUser().getPhone());
            dto.setId(jobseeker.getJobseekerId());
            dto.setResumeUrl(jobseeker.getResumeUrl());
            dto.setAboutMe(jobseeker.getAboutMe());
            dto.setLinkedinUrl(jobseeker.getLinkedinUrl());
            dto.setPortfolioUrl(jobseeker.getPortfolioUrl());
            dto.setSkills(jobseeker.getSkills().stream().map(skill -> skill.getSkillName()).collect(Collectors.toList()));
            dto.setSkillList(jobseeker.getSkills());  // This is the complete list of skills
//            dto.setEducation(jobseeker.getEducation().stream().map(EducationDto::mapTo).collect(Collectors.toList()));
//            dto.setExperience(jobseeker.getExperience().stream().map(ExperienceDto::mapTo).collect(Collectors.toList()));
//            dto.setCertifications(jobseeker.getCertifications().stream().map(CertificationDto::mapTo).collect(Collectors.toList()));
//            dto.setExtracurricularActivities(jobseeker.getExtracurricularActivities().stream().map(ExtraCurricularActivityDto::mapTo).collect(Collectors.toList()));
            dto.setUser(jobseeker.getUser());
            return dto;
        });
    }
	public static ExtraCurricularActivityDto mapTo(ExtraCurricularActivity activity) {
        ExtraCurricularActivityDto dto = new ExtraCurricularActivityDto();
        dto.setId(activity.getActivityId());
        dto.setActivityName(activity.getActivityName());
        dto.setDescription(activity.getDescription());
        dto.setAchievementDate(activity.getAchievementDate());
        return dto;
    }
	 public static CertificationDto mapTo(Certification certification) {
	        CertificationDto dto = new CertificationDto();
	        dto.setId(certification.getCertificationId());
	        dto.setCertificationName(certification.getCertificationName());
	        dto.setIssuedBy(certification.getIssuedBy());
	        dto.setIssueDate(certification.getIssueDate());
	        dto.setExpiryDate(certification.getExpiryDate());
	        return dto;
	    }
	 public static ExperienceDto mapTo(Experience experience) {
	        ExperienceDto dto = new ExperienceDto();
	        dto.setId(experience.getExperienceId());
	        dto.setCompanyName(experience.getCompanyName());
	        dto.setJobTitle(experience.getJobTitle());
	        dto.setStartDate(experience.getStartDate());
	        dto.setEndDate(experience.getEndDate());
	        dto.setResponsibilities(experience.getResponsibilities());
	        return dto;
	    }
	 
}
