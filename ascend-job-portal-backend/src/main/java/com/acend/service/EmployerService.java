package com.acend.service;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

import com.acend.dto.EmployerDto;
import com.acend.entity.Employer;
import com.acend.request.VerifyRequest;
import com.acend.response.EmployerDetails;

public interface EmployerService {

	Employer saveEmployer(EmployerDto employerDto,String email);

	EmployerDetails getEmployeeDetails(String email);

	void updateEmployerDetails(EmployerDetails request);

	Map<String, Object> getEmployerDashboardData(String email);

	Page<EmployerDetails> getAllEmployers(int page,int size);

//	ResponseEntity<?> verifyEmployer(Req);

	EmployerDetails getEmployers(Long id);

	ResponseEntity<?> verifyEmployer(VerifyRequest request);

}
