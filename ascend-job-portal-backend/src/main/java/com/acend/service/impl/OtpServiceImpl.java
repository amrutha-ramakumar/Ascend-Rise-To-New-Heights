package com.acend.service.impl;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Random;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.acend.entity.OtpVerification;
import com.acend.repository.OtpVerificationRepository;
import com.acend.request.VerifyOTPRequest;
import com.acend.service.EmailService;
import com.acend.service.OtpService;

@Service
public class OtpServiceImpl implements OtpService {

	private OtpVerificationRepository otpVerificationRepository;
	private EmailService emailService;

	public OtpServiceImpl(OtpVerificationRepository otpVerificationRepository, EmailService emailService) {
		super();
		this.otpVerificationRepository = otpVerificationRepository;
		this.emailService = emailService;
	}

	@Override
	public ResponseEntity<?> sendOTP(String email) {
		try {
			OtpVerification user = otpVerificationRepository.findByEmail(email);
			if (user == null) {
				user = new OtpVerification();
				user.setEmail(email);
			} else if (user.isVerified()) {
				return ResponseEntity.badRequest().body("Email already registered");
			}

			String otp = generateOTP();
			user.setOtp(otp);
			user.setOtpExpiryDate(LocalDateTime.now().plusMinutes(2));
			otpVerificationRepository.save(user);

			emailService.sendOTPEmail(email, otp);

			return ResponseEntity.ok("OTP sent successfully");
		} catch (Exception e) {
			throw new RuntimeException("Error sending OTP: " + e.getMessage());
		}
	}

	@Override
	public ResponseEntity<?> forgotPassword(String email) {
		try {
			OtpVerification user = otpVerificationRepository.findByEmail(email);
			if (user == null) {
				return ResponseEntity.badRequest().body("No account with this email is found");
			}
			String otp = generateOTP();
			user.setOtp(otp);
			user.setOtpExpiryDate(LocalDateTime.now().plusMinutes(2));
			user.setVerified(false);
			otpVerificationRepository.save(user);

			emailService.sendOTPEmail(email, otp);

			return ResponseEntity.ok("OTP sent successfully");
		} catch (Exception e) {
			throw new RuntimeException("Error sending OTP: " + e.getMessage());
		}
	}

	private String generateOTP() {
		return String.format("%06d", new Random().nextInt(999999));
	}

//	@Override
//	public ResponseEntity<?> verifyOTP(VerifyOTPRequest verifyOTPRequest) {
//		try {
//			OtpVerification user = otpVerificationRepository.findByEmail(verifyOTPRequest.getEmail());
//
//			if (user == null) {
//				return ResponseEntity.badRequest().body("User not found");
//			}
//
//			if (!user.getOtp().equals(verifyOTPRequest.getOtp())
//					|| user.getOtpExpiryDate().isBefore(LocalDateTime.now())) {
//				return ResponseEntity.badRequest().body("Invalid or expired OTP");
//			}
//			user.setOtp(null);
//			user.setOtpExpiryDate(null);
//			user.setVerified(true);
//			otpVerificationRepository.save(user);
//
//			return ResponseEntity.ok("OTP verified successfully");
//		} catch (Exception e) {
//			throw new RuntimeException("Error verifying OTP: " + e.getMessage());
//		}
//	}
	
	@Override
	public ResponseEntity<?> verifyOTP(VerifyOTPRequest verifyOTPRequest) {
	    try {
	        OtpVerification user = otpVerificationRepository.findByEmail(verifyOTPRequest.getEmail());

	        if (user == null) {
	            return ResponseEntity.badRequest().body(Map.of("error", "User not found"));
	        }

	        if (user.getOtpExpiryDate().isBefore(LocalDateTime.now())) {
	            return ResponseEntity.badRequest().body(Map.of("error", "OTP has expired. Please request a new one."));
	        }

	        if (!user.getOtp().equals(verifyOTPRequest.getOtp())) {
	            return ResponseEntity.badRequest().body(Map.of("error", "Invalid OTP. Please enter the correct code."));
	        }

	        user.setOtp(null);
	        user.setOtpExpiryDate(null);
	        user.setVerified(true);
	        otpVerificationRepository.save(user);

	        return ResponseEntity.ok(Map.of("message", "OTP verified successfully"));
	    } catch (Exception e) {
	        throw new RuntimeException("Error verifying OTP: " + e.getMessage());
	    }
	}


	@Override
	public ResponseEntity<?> resendOTP(String email) {
        try {
            OtpVerification user = otpVerificationRepository.findByEmail(email);
            if (user == null) {
                return ResponseEntity.badRequest().body("User not found");
            }

            if (user.isVerified()) {
                return ResponseEntity.badRequest().body("Email already verified");
            }

            String otp = generateOTP();
            user.setOtp(otp);
            user.setOtpExpiryDate(LocalDateTime.now().plusMinutes(15));
            otpVerificationRepository.save(user);

            emailService.sendOTPEmail(email, otp);

            return ResponseEntity.ok("OTP resent successfully");
        } catch (Exception e) {
            throw new RuntimeException("Error resending OTP: " + e.getMessage());
        }
    }
}
