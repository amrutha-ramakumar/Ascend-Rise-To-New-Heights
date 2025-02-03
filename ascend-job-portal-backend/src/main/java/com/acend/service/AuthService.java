package com.acend.service;

import org.springframework.http.ResponseEntity;

import com.acend.dto.UserDto;
import com.acend.request.LoginRequest;
import com.acend.request.VerifyOTPRequest;

public interface AuthService {

	ResponseEntity<?> register(UserDto user);
	public ResponseEntity<?> loginUser(LoginRequest loginRequest);
	ResponseEntity<?> updatePassword(LoginRequest loginRequest);
}
