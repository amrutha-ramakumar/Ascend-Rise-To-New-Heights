package com.acend.service.impl;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import com.acend.config.CustomUserServiceImplementation;
import com.acend.config.JwtProvider;
import com.acend.dto.UserDto;
import com.acend.entity.Employer;
import com.acend.entity.OtpVerification;
import com.acend.entity.SubscriptionPayment;
import com.acend.entity.UserSubscriptions;
import com.acend.entity.Users;
import com.acend.enums.PaymentStatus;
import com.acend.enums.Roles;
import com.acend.enums.SubscriptionStatus;
import com.acend.repository.EmployerRepository;
import com.acend.repository.OtpVerificationRepository;
import com.acend.repository.SubscriptionPaymentRepository;
import com.acend.repository.UserRepository;
import com.acend.repository.UserSubscriptionRepository;
import com.acend.request.LoginRequest;
import com.acend.response.AuthResponse;
import com.acend.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

	private OtpVerificationRepository otpVerificationRepository;
	private PasswordEncoder passwordEncoder;
	private UserRepository userRepository;
	private CustomUserServiceImplementation customUserService;
	private JwtProvider jwtProvider;
	private SubscriptionPaymentRepository subscriptionPaymentRepository;
	private UserSubscriptionRepository userSubscriptionRepository;
	private EmployerRepository employerRepository;

	public AuthServiceImpl(OtpVerificationRepository otpVerificationRepository, PasswordEncoder passwordEncoder,
			UserRepository userRepository, CustomUserServiceImplementation customUserService, JwtProvider jwtProvider,
			SubscriptionPaymentRepository subscriptionPaymentRepository, EmployerRepository employerRepository,
			UserSubscriptionRepository userSubscriptionRepository) {
		super();
		this.otpVerificationRepository = otpVerificationRepository;
		this.passwordEncoder = passwordEncoder;
		this.userRepository = userRepository;
		this.customUserService = customUserService;
		this.jwtProvider = jwtProvider;
		this.subscriptionPaymentRepository = subscriptionPaymentRepository;
		this.employerRepository = employerRepository;
		this.userSubscriptionRepository = userSubscriptionRepository;
	}

	@Override
	public ResponseEntity<?> register(UserDto registerRequest) {
		try {
			OtpVerification user = otpVerificationRepository.findByEmail(registerRequest.getEmail());

			if (user == null) {
				return ResponseEntity.badRequest().body("Invalid email");
			}
			if (!user.isVerified()) {
				return ResponseEntity.badRequest().body("Please verify your email");
			}

			Users users = new Users();
			users.setFirstName(registerRequest.getFirstName());
			users.setLastName(registerRequest.getLastName());
			users.setEmail(registerRequest.getEmail());
			users.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
			users.setPhone(registerRequest.getPhone());
			users.setGender(registerRequest.getGender());
			users.setRole(registerRequest.getRole());
			users.setBlocked(false);
			users.setCreatedAt(LocalDateTime.now());
			if (registerRequest.getRole() == Roles.Employer) {
				users.setApproved(false);
			} else {
				users.setApproved(true);
			}
			userRepository.save(users);

			Authentication authentication = new UsernamePasswordAuthenticationToken(users.getEmail(),
					users.getPassword());

			SecurityContextHolder.getContext().setAuthentication(authentication);

			String token = jwtProvider.generateToken(authentication);

			Map<String, Object> response = new HashMap<>();
			response.put("message", "Registration successful");
			response.put("token", token);
			response.put("role", users.getRole());
			return ResponseEntity.status(HttpStatus.CREATED).body(response);

		} catch (Exception e) {
			throw new RuntimeException("Error during registration: " + e.getMessage());
		}
	}

	@Override
	public ResponseEntity<?> loginUser(LoginRequest loginRequest) {
		String email = loginRequest.getEmail();
		String password = loginRequest.getPassword();

		// 1. Authenticate the user
		Authentication authentication = authenticate(email, password);
		SecurityContextHolder.getContext().setAuthentication(authentication);

		// 2. Fetch user details
		Users user = userRepository.findByEmail(email);

		if (user == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponse("User not found"));
		}
		Roles roleFromFrontend = user.getRole();

		String token = jwtProvider.generateToken(authentication);

		// 6. Check if the user is an admin
		if (user.getRole().equals("Admin")) {
			return ResponseEntity
					.ok(new AuthResponse(token, "Signin Success (Admin)", user.getRole().name().toLowerCase()));
		}

		if (!user.getRole().equals(roleFromFrontend)) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new AuthResponse("Invalid role for the user"));
		}

		SubscriptionPayment payment = subscriptionPaymentRepository.findFirstByUserOrderByCreatedAtDesc(user);
		UserSubscriptions userSubscription = userSubscriptionRepository.findByUser(user).orElse(null);

		if (payment == null || payment.getStatus() != PaymentStatus.COMPLETED) {
			return ResponseEntity.ok(new AuthResponse(token,
					"Login successful, but payment is pending. Please complete your payment to access premium features.",
					user.getRole().name().toLowerCase()));
		}

		if (userSubscription == null || userSubscription.getStatus() != SubscriptionStatus.ACTIVE) {
			return ResponseEntity.ok(new AuthResponse(token,
					"Login successful, but your subscription is inactive. Please renew your subscription to access premium features.",
					user.getRole().name().toLowerCase()));
		}

		if (userSubscription.getEndDate().isBefore(LocalDateTime.now())) {
			userSubscription.setStatus(SubscriptionStatus.EXPIRED);
			userSubscriptionRepository.save(userSubscription);
			return ResponseEntity.ok(new AuthResponse(token,
					"Login successful, but your subscription has expired. Please renew your subscription.",
					user.getRole().name().toLowerCase()));
		}

		if (user.isBlocked()) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new AuthResponse("Reason: " +user.getReason()));
		}

		if (user.getRole().equals(Roles.Employer)) {

			if (!user.isApproved())
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponse("Admin not approved"));
		}

		return ResponseEntity.ok(new AuthResponse(token, "Signin Success", userSubscription.getStatus(),
				user.getRole().name().toLowerCase()));
	}

	private Authentication authenticate(String username, String password) {
		UserDetails userDetails = customUserService.loadUserByUsername(username);
		if (userDetails == null) {
			throw new BadCredentialsException("Invalid username...");
		}
		if (!passwordEncoder.matches(password, userDetails.getPassword())) {
			throw new BadCredentialsException("Invalid password...");
		}
		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}

	@Override
	public ResponseEntity<?> updatePassword(LoginRequest loginRequest) {
		try {
			Users user = userRepository.findByEmail(loginRequest.getEmail());
			if (user == null) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponse("User not found"));
			}

			user.setPassword(passwordEncoder.encode(loginRequest.getPassword()));
			userRepository.save(user);
			return ResponseEntity.status(HttpStatus.CREATED)
					.body(new AuthResponse("Password set Changed Successfully"));

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.CREATED).body(new AuthResponse("Some Error occured"));

		}
	}
}
