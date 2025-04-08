package com.acend.service.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.acend.dto.ApplicationDetails;
import com.acend.dto.ApplicationDto;
import com.acend.dto.CertificationDto;
import com.acend.dto.EducationDto;
import com.acend.dto.ExperienceDto;
import com.acend.dto.ExtraCurricularActivityDto;
import com.acend.dto.JobDto;
import com.acend.entity.Application;
import com.acend.entity.Certification;
import com.acend.entity.Education;
import com.acend.entity.Experience;
import com.acend.entity.ExtraCurricularActivity;
import com.acend.entity.Interview;
import com.acend.entity.Job;
import com.acend.entity.Jobseeker;
import com.acend.entity.SavedJobs;
import com.acend.entity.Users;
import com.acend.exception.ResourceNotFoundException;
import com.acend.repository.ApplicaionRepository;
import com.acend.repository.InterviewRepository;
import com.acend.repository.JobRepository;
import com.acend.repository.JobseekerRepository;
import com.acend.repository.SavedJobRepository;
import com.acend.repository.UserRepository;
import com.acend.response.Applicationdata;
import com.acend.service.ApplicationService;
import com.acend.service.EmailService;

import jakarta.transaction.Transactional;

@Service
public class ApplicationServiceImpl implements ApplicationService {

	private JobseekerRepository jobSeekerRepository;
	private ApplicaionRepository applicationRepository;
	private JobRepository jobRepository;
	private SavedJobRepository savedJobRepository;
	private UserRepository userRepository;
	private ApplicationStatusChangeService applicationStatusChangeService;
	private EmailService emailService;
	private InterviewRepository interviewRepository;

	private final String uploadDir = "src/main/resources/static/resumes/";
	
	
	public ApplicationServiceImpl(JobseekerRepository jobSeekerRepository, ApplicaionRepository applicationRepository,
			JobRepository jobRepository, SavedJobRepository savedJobRepository, UserRepository userRepository,
			ApplicationStatusChangeService applicationStatusChangeService, EmailService emailService,InterviewRepository interviewRepository) {
		super();
		this.jobSeekerRepository = jobSeekerRepository;
		this.applicationRepository = applicationRepository;
		this.jobRepository = jobRepository;
		this.savedJobRepository = savedJobRepository;
		this.userRepository = userRepository;
		this.applicationStatusChangeService = applicationStatusChangeService;
		this.emailService = emailService;
		this.interviewRepository = interviewRepository;
	}

	@Override
	public ResponseEntity<?> applyToJob(String email, Long jobId, MultipartFile resume, String additionalDetails) {
        try {
            if (email == null) {
                return ResponseEntity.badRequest().body("Invalid or expired token.");
            }

            Optional<Jobseeker> jobSeekerOpt = jobSeekerRepository.findByUserEmail(email);
            Optional<Job> jobOpt = jobRepository.findById(jobId);

            if (jobSeekerOpt.isEmpty() || jobOpt.isEmpty()) {
                return ResponseEntity.badRequest().body("Invalid JobSeeker or Job ID");
            }

            Jobseeker jobSeeker = jobSeekerOpt.get();
            Job job = jobOpt.get();

            String resumePath = saveResume(resume);

            Application application = new Application();
            application.setAppliedAt(LocalDateTime.now());
            application.setApplicationStatus("Applied");
            application.setJobSeeker(jobSeeker);
            application.setJobPost(job);
            application.setResumePath(resumePath);
            application.setAdditionalDetails(additionalDetails);

            applicationRepository.save(application);

            SavedJobs savedJobs = savedJobRepository.findByJobAndUser(job, userRepository.findByEmail(email));
            if (savedJobs != null) {
                savedJobs.setStatus("Applied");
                savedJobRepository.save(savedJobs);
            }

            applicationStatusChangeService.sendApplicationEmail(jobSeeker.getUser().getEmail(),
                    job.getEmployer().getUser().getEmail(), job.getPosition());

            return ResponseEntity.ok("Application submitted successfully!");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error saving resume: " + e.getMessage());
        }
    }

    private String saveResume(MultipartFile resume) throws IOException {
        if (resume == null || resume.isEmpty()) {
            return null;
        }

        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String resumePath = uploadDir + resume.getOriginalFilename();
        Files.write(Paths.get(resumePath), resume.getBytes());

        return resumePath;
    }

	@Override
	public List<Applicationdata> findJobs(String email) {
		Jobseeker jobseeker = jobSeekerRepository.findByUserEmail(email).get();
		List<Application> applications = applicationRepository.findByJobSeeker(jobseeker);
		List<Applicationdata> applicationDataList = applications.stream().map(this::convertToApplicaitonData).toList();

		return applicationDataList;
	}

	@Transactional
	@Override
	public Page<ApplicationDetails> getApplicationsByJobId(Long jobId, int page, int size) {
		Optional<Job> jobOptional = jobRepository.findById(jobId);
		if (!jobOptional.isPresent()) {
			throw new RuntimeException("Job not found with id: " + jobId);
		}
		Job job = jobOptional.get();
		Pageable pageable = PageRequest.of(page, size);
		Page<Application> applicationPage = applicationRepository.findByJobPost(job, pageable);
		Page<ApplicationDetails> applicationDetailsPage = applicationPage.map(this::convertToApplicationDetails);

		return applicationDetailsPage;
	}

	@Override
	public Applicationdata getApplicationsById(Long job) {
		Optional<Application> application = applicationRepository.findById(job);
		return convertToApplicaitonData(application.get());
	}

//	@Override
//	public void updateApplicationStatus(Long applicationId, String applicationStatus) {
//		Application application = applicationRepository.findById(applicationId)
//				.orElseThrow(() -> new ResourceNotFoundException("Application not found  " ));
//
//		application.setApplicationStatus(applicationStatus);
//		applicationRepository.save(application);
//	}
	
	@Transactional
    public void updateApplicationStatus(Long applicationId, String applicationStatus) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found"));

        application.setApplicationStatus(applicationStatus);
        applicationRepository.save(application);

        String interviewDateTime = null;

        if ("interview".equalsIgnoreCase(applicationStatus)) {
            // Generate a valid interview slot
            LocalDate interviewDate;
            LocalTime interviewTime;

            do {
                interviewDate = LocalDate.now().plusDays(10);

                // If it's Sunday, move to Monday
                while (interviewDate.getDayOfWeek() == DayOfWeek.SUNDAY) {
                    interviewDate = interviewDate.plusDays(1);
                }

                interviewTime = getRandomInterviewTime();
            } while (interviewRepository.existsByInterviewDateAndInterviewTime(interviewDate, interviewTime));

            // Save interview details
            Interview interview = new Interview(null, application, interviewDate, interviewTime,application.getJobPost().getEmployer().getUser().getEmail(),
            		application.getJobSeeker().getUser().getEmail(), "Scheduled");
            interviewRepository.save(interview);

            // Format for email
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("hh:mm a");

            interviewDateTime = interviewDate.format(dateFormatter) + " at " + interviewTime.format(timeFormatter);
        }

        sendStatusUpdateEmail(application, applicationStatus, interviewDateTime);
    }

    private LocalTime getRandomInterviewTime() {
        Random random = new Random();
        int hour = random.nextInt(9) + 10; // 10 AM to 6 PM
        int minute = random.nextInt(60);
        return LocalTime.of(hour, minute);
    }

    private void sendStatusUpdateEmail(Application application, String applicationStatus, String interviewDateTime) {
        String candidateEmail = application.getJobSeeker().getUser().getEmail();
        String employerEmail = application.getJobPost().getEmployer().getUser().getEmail();
        String jobTitle = application.getJobPost().getPosition();

        String subject;
        String body;

        switch (applicationStatus.toLowerCase()) {
            case "pending":
                subject = "Your Job Application Status: Pending";
                body = "Dear Applicant,\n\nYour application for the position of " + jobTitle +
                        " is currently under review. We will get back to you soon.\n\nBest regards,\nRecruitment Team";
                break;

            case "interview":
                if (interviewDateTime == null || interviewDateTime.trim().isEmpty()) {
                    throw new IllegalArgumentException("Interview date and time must be provided for interview status.");
                }
                subject = "Interview Invitation for " + jobTitle;
                body = "Dear Applicant,\n\nCongratulations! You have been shortlisted for an interview for the position of " +
                        jobTitle + ".\n\nInterview Details:\nDate & Time: " + interviewDateTime +
                        "\n\nPlease confirm your availability.\n\nBest regards,\n" + employerEmail;
                break;

            case "rejected":
                subject = "Application Update: Not Selected";
                body = "Dear Applicant,\n\nThank you for your interest in the " + jobTitle +
                        " position. Unfortunately, we have decided to proceed with other candidates at this time.\n\nWe wish you all the best in your job search.\n\nBest regards,\nRecruitment Team";
                break;

            case "selected":
                subject = "Congratulations! You Have Been Selected";
                body = "Dear Applicant,\n\nWe are pleased to inform you that you have been selected for the position of " +
                        jobTitle + ".\n\nOur HR team will reach out to you with further details regarding the next steps.\n\nBest regards,\nRecruitment Team";
                break;

            default:
                throw new IllegalArgumentException("Invalid application status provided.");
        }

        emailService.sendEmail(candidateEmail, employerEmail, subject, body);
    }

	public Applicationdata convertToApplicaitonData(Application application) {
		Applicationdata applicationData = new Applicationdata();
		Job jobPost = application.getJobPost();

		// Set job details from the jobPost entity
		applicationData.setPosition(jobPost.getPosition());
		applicationData.setDescription(jobPost.getDescription());
		applicationData.setLocation(jobPost.getLocation());
		applicationData.setExperience(jobPost.getExperience());
		applicationData.setEducation(jobPost.getEducation());
		applicationData.setIndustryName(jobPost.getIndustry().getIndustryType());
		applicationData.setSkills(jobPost.getSkills().stream().map(skill -> skill.getSkillName()).toList());

		applicationData.setSalary(jobPost.getSalary());
		applicationData.setPostedAt(jobPost.getPostedAt());
		applicationData.setExpiryDate(jobPost.getExpiryDate());
		applicationData.setCompany(jobPost.getEmployer().getCompany().getCompanyName());
		applicationData.setApplicationStatus(application.getApplicationStatus());
		applicationData.setAppliedAt(application.getAppliedAt());
		applicationData.setApplicationId(application.getId());
		applicationData.setUser(application.getJobSeeker().getUser().getId());

		return applicationData;
	}

	public ApplicationDetails convertToApplicationDetails(Application application) {
		ApplicationDetails detail = new ApplicationDetails();
		detail.setApplicationId(application.getId());
		detail.setName(application.getJobSeeker().getUser().getFirstName() + " "
				+ application.getJobSeeker().getUser().getLastName());
		detail.setUserId(application.getJobSeeker().getUser().getId());
		detail.setEmail(application.getJobSeeker().getUser().getEmail());
		detail.setPhone(application.getJobSeeker().getUser().getPhone());
		detail.setGender(application.getJobSeeker().getUser().getGender());
		detail.setEducation(application.getJobSeeker().getEducation().stream().map(this::mapToEducationDto).toList());
		detail.setExperience(
				application.getJobSeeker().getExperience().stream().map(this::mapToExperienceDto).toList());
		detail.setCertifications(
				application.getJobSeeker().getCertifications().stream().map(this::mapToCertificationDto).toList());
		detail.setExtracurricularActivities(application.getJobSeeker().getExtracurricularActivities().stream()
				.map(this::mapToExtraCurricularActivityDto).toList());
		detail.setAdditionalDetails(application.getAdditionalDetails());
		detail.setAppliedAt(application.getAppliedAt());
		detail.setApplicationStatus(application.getApplicationStatus());
		detail.setResumePath(application.getResumePath());
		detail.setLinkedinUrl(application.getJobSeeker().getLinkedinUrl());
		detail.setAboutMe(application.getJobSeeker().getAboutMe());
		detail.setResumeUrl(application.getJobSeeker().getResumeUrl());
		detail.setPortfolioUrl(application.getJobSeeker().getPortfolioUrl());
		detail.setSkills(application.getJobSeeker().getSkills().stream().map(skill -> skill.getSkillName()).toList());
		return detail;
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
}
