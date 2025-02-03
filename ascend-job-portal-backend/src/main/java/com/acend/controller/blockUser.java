package com.acend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.acend.config.JwtProvider;
import com.acend.repository.UserRepository;
import com.acend.response.EmployerDetails;
import com.acend.service.UserService;

@RestController
@RequestMapping("/api")
public class blockUser {
	@Autowired
	private UserService userService;
	@Autowired
	private JwtProvider jwtProvider;

	@GetMapping("/is-blocked")
	public ResponseEntity<?> IsBlocked(@RequestHeader("Authorization") String token) {
		String email = jwtProvider.getEmailFromToken(token);
		boolean status = userService.checkblock(email);
		return ResponseEntity.ok(status);
	}
}
