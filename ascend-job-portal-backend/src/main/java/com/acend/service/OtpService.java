package com.acend.service;

import org.springframework.http.ResponseEntity;

import com.acend.request.VerifyOTPRequest;

public interface OtpService {

	ResponseEntity<?> sendOTP(String email);

	ResponseEntity<?> forgotPassword(String email);

	ResponseEntity<?> verifyOTP(VerifyOTPRequest user);

	ResponseEntity<?> resendOTP(String email);
	

}
