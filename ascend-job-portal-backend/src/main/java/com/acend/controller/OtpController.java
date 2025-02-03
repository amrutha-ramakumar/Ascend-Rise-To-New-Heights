package com.acend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.acend.exception.UserException;
import com.acend.request.EmailRequest;
import com.acend.request.VerifyOTPRequest;
import com.acend.service.AuthService;
import com.acend.service.OtpService;

@RestController
@RequestMapping("/auth")
public class OtpController {

	private OtpService otpService;

	public OtpController(OtpService otpService) {
		super();
		this.otpService = otpService;
	}

	@PostMapping("/send-otp")
	public ResponseEntity<?> createOtp(@RequestBody EmailRequest user) throws UserException {
		return otpService.sendOTP(user.getEmail());
	}

	@PostMapping("/forgot-password")
	public ResponseEntity<?> forgotpassword(@RequestBody EmailRequest user) throws UserException {
		return otpService.forgotPassword(user.getEmail());
	}

	@PostMapping("/verify-otp")
	public ResponseEntity<?> verifyOtp(@RequestBody VerifyOTPRequest user) throws UserException {
		return otpService.verifyOTP(user);
	}
	
	@PostMapping("/resend-otp")
    public ResponseEntity<?> resendOtp(@RequestBody EmailRequest user) throws UserException{
        return otpService.resendOTP(user.getEmail());
    }
}
