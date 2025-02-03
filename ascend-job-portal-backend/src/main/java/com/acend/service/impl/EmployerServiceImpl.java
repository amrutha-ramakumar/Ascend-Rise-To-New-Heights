package com.acend.service.impl;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.acend.dto.EmployerDto;
import com.acend.entity.Employer;
import com.acend.entity.Industry;
import com.acend.entity.Job;
import com.acend.entity.Users;
import com.acend.repository.ApplicaionRepository;
import com.acend.repository.CompanyRepository;
import com.acend.repository.EmployerRepository;
import com.acend.repository.IndustryRepository;
import com.acend.repository.JobRepository;
import com.acend.repository.UserRepository;
import com.acend.request.VerifyRequest;
import com.acend.response.EmployerDetails;
import com.acend.service.EmployerService;

import jakarta.transaction.Transactional;

import com.acend.entity.Company;

@Service
public class EmployerServiceImpl implements EmployerService {

	private final UserRepository usersRepository;
	private final IndustryRepository industryRepository;
	private final CompanyRepository companyRepository;
	private final EmployerRepository employerRepository;
	private JobRepository jobRepository;
	private ApplicaionRepository applicaionRepository;

	public EmployerServiceImpl(UserRepository usersRepository, IndustryRepository industryRepository,
			CompanyRepository companyRepository, EmployerRepository employerRepository, JobRepository jobRepository,
			ApplicaionRepository applicaionRepository) {
		super();
		this.usersRepository = usersRepository;
		this.industryRepository = industryRepository;
		this.companyRepository = companyRepository;
		this.employerRepository = employerRepository;
		this.jobRepository = jobRepository;
		this.applicaionRepository = applicaionRepository;
	}

	public Employer saveEmployer(EmployerDto employerDto, String email) {

		Users user = usersRepository.findByEmail(email);

		Company company = new Company();
		company.setCompanyName(employerDto.getCompanyName());
		company.setCompanyWebsite(employerDto.getCompanyWebsite());
		company.setCompanyAddress(employerDto.getCompanyAddress());
		Company savedCompany = companyRepository.save(company);

		// Find Industry by ID
		Industry industry = industryRepository.findById(employerDto.getIndustryId())
				.orElseThrow(() -> new RuntimeException("Industry not found"));

		// Save Employer entity
		Employer employer = new Employer();
		employer.setUser(user);
		employer.setCompany(savedCompany);
		employer.setIndustry(industry);
		employer.setApproved(false);

		return employerRepository.save(employer);
	}

	@Override
	public EmployerDetails getEmployeeDetails(String email) {
		Users user = usersRepository.findByEmail(email);
		Employer employer = employerRepository.findByUser(user);
		EmployerDetails detail = new EmployerDetails();
		detail.setFirstName(employer.getUser().getFirstName());
		detail.setLastName(employer.getUser().getLastName());
		detail.setEmail(employer.getUser().getEmail());
		detail.setPhone(employer.getUser().getPhone());
		detail.setGender(employer.getUser().getGender());
		detail.setIndustryType(employer.getIndustry().getIndustryType());
		detail.setCompanyName(employer.getCompany().getCompanyName());
		detail.setCompanyAddress(employer.getCompany().getCompanyAddress());
		detail.setCompanyWebsite(employer.getCompany().getCompanyWebsite());
		return detail;
	}

	@Transactional
	public void updateEmployerDetails(EmployerDetails request) {
		Users us = usersRepository.findByEmail(request.getEmail());
		Employer employer = employerRepository.findByUser(us);

		Users user = employer.getUser();
		user.setFirstName(request.getFirstName());
		user.setLastName(request.getLastName());
		user.setPhone(request.getPhone());
		user.setGender(request.getGender());
		// Update Company details
		Company company = employer.getCompany();
		company.setCompanyName(request.getCompanyName());
		company.setCompanyWebsite(request.getCompanyWebsite());
		company.setCompanyAddress(request.getCompanyAddress());

		// Update Industry details
		Industry industry = industryRepository.findByIndustryType(request.getIndustryType());
		employer.setIndustry(industry);

		// Save updated entities
		usersRepository.save(user);
		companyRepository.save(company);
		employerRepository.save(employer);
	}

	@Override
	public Map<String, Object> getEmployerDashboardData(String email) {
		Map<String, Object> dashboardData = new HashMap<>();

		Users user = usersRepository.findByEmail(email);
		Employer employer = employerRepository.findByUser(user);
		List<Job> jobs = jobRepository.findByEmployer(employer);
		int totalJobs = jobRepository.countByEmployer(employer);

		long totalApplications = jobs.stream().mapToLong(job -> applicaionRepository.countByJobPost(job)).sum();

		dashboardData.put("totalJobs", totalJobs);
		dashboardData.put("totalApplications", totalApplications);

		return dashboardData;
	}

//	@Override
//	public Page<EmployerDetails> getAllEmployers(int page, int size) {
//		Pageable pageable = PageRequest.of(page, size); // Create pageable object using page and size
//		Page<Employer> employerPage = employerRepository.findAll(pageable); // Fetch paginated result
//
//		Page<EmployerDetails> employerDetailsPage = employerPage.map(employer -> {
//			EmployerDetails details = new EmployerDetails();
//			details.setEmpId(employer.getId());
//			details.setFirstName(employer.getUser().getFirstName());
//			details.setLastName(employer.getUser().getLastName());
//			details.setEmail(employer.getUser().getEmail());
//			details.setPhone(employer.getUser().getPhone());
//			details.setGender(employer.getUser().getGender());
//			details.setUser(employer.getUser());
//			details.setIndustryType(employer.getIndustry().getIndustryType()); // Assuming Industry has a 'name' field
//			details.setCompanyName(employer.getCompany().getCompanyName()); // Assuming Company has a 'name' field
//			details.setCompanyWebsite(employer.getCompany().getCompanyWebsite()); // Assuming Company has 'website'
//																					// field
//			details.setCompanyAddress(employer.getCompany().getCompanyAddress()); 
//																					
//			return details;
//		});
//
//		return employerDetailsPage;
//	}

	@Override
	public Page<EmployerDetails> getAllEmployers(int page, int size) {
		Pageable pageable = PageRequest.of(page, size);
		Page<Employer> employerPage = employerRepository.findAll(pageable);
		Page<EmployerDetails> employerDetailsPage = employerPage.map(this::convertToEmployerDetails);
		return employerDetailsPage;
	}

	@Override
	public ResponseEntity<?> verifyEmployer(VerifyRequest request) {
		try {
			Optional<Users> userOptional = usersRepository.findById(request.getId());
			if (!userOptional.isPresent()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(Collections.singletonMap("message", "User not found with id: " + request.getId()));
			}

			Users user = userOptional.get();

			if (user.isApproved()) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
						.body(Collections.singletonMap("message", "User is already approved."));
			}

			user.setApproved(request.isStatus());
			usersRepository.save(user);

			return ResponseEntity.ok(Collections.singletonMap("message", "User approved successfully."));
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Collections.singletonMap("message", "An error occurred while verifying the user."));
		}
	}

//	@Override
//	public EmployerDetails getEmployers(Long id) {
//		Employer employer = employerRepository.findById(id).get();
//		EmployerDetails details = new EmployerDetails();
//		details.setEmpId(employer.getId());
//		details.setFirstName(employer.getUser().getFirstName());
//		details.setLastName(employer.getUser().getLastName());
//		details.setEmail(employer.getUser().getEmail());
//		details.setPhone(employer.getUser().getPhone());
//		details.setGender(employer.getUser().getGender());
//		details.setUser(employer.getUser());
//		details.setIndustryType(employer.getIndustry().getIndustryType()); 
//		details.setCompanyName(employer.getCompany().getCompanyName()); 
//		details.setCompanyWebsite(employer.getCompany().getCompanyWebsite()); 
//		details.setCompanyAddress(employer.getCompany().getCompanyAddress()); 
//		return details;
//	}

	@Override
	public EmployerDetails getEmployers(Long id) {
		Employer employer = employerRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Employer not found"));
		return convertToEmployerDetails(employer);
	}

	private EmployerDetails convertToEmployerDetails(Employer employer) {
		EmployerDetails details = new EmployerDetails();
		details.setEmpId(employer.getId());
		details.setFirstName(employer.getUser().getFirstName());
		details.setLastName(employer.getUser().getLastName());
		details.setEmail(employer.getUser().getEmail());
		details.setPhone(employer.getUser().getPhone());
		details.setGender(employer.getUser().getGender());
		details.setUser(employer.getUser());
		details.setIndustryType(employer.getIndustry().getIndustryType());
		details.setCompanyName(employer.getCompany().getCompanyName());
		details.setCompanyWebsite(employer.getCompany().getCompanyWebsite());
		details.setCompanyAddress(employer.getCompany().getCompanyAddress());

		return details;
	}

}
