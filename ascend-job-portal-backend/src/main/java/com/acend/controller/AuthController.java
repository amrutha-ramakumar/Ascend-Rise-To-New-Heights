package com.acend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.acend.dto.UserDto;
import com.acend.enums.Gender;
import com.acend.enums.Roles;
import com.acend.exception.UserException;
import com.acend.request.EmailRequest;
import com.acend.request.LoginRequest;
import com.acend.request.VerifyOTPRequest;
import com.acend.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

	private AuthService authService;

	public AuthController(AuthService authService) {
		super();
		this.authService = authService;
	}

	@GetMapping("/gender-roles")
	public ResponseEntity<Map<String, Object>> getRolesAndGenders() {
	    Map<String, Object> response = new HashMap<>();
	    response.put("roles", Roles.values());
	    response.put("genders", Gender.values());
	    return ResponseEntity.ok(response);
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> createUserHandler(@RequestBody UserDto user) throws UserException {
		return authService.register(user);
	}
	
	@PostMapping("/signin")
    public ResponseEntity<?> loginUserHandler(@RequestBody LoginRequest loginRequest) {
		return authService.loginUser(loginRequest);
    }
	
	@PostMapping("/reset-password")
    public ResponseEntity<?> updatePassword(@RequestBody LoginRequest loginRequest) {
		return authService.updatePassword(loginRequest);
    }
}
