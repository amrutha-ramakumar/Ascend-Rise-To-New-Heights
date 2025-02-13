package com.acend.entity;

import java.time.LocalDateTime;

import com.acend.enums.Gender;
import com.acend.enums.Roles;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Users {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String firstName;
	private String lastName;
	@Column(unique = true, nullable = false)
	private String email;
	private String phone;
	private String password;
	@Enumerated(EnumType.STRING)
	private Gender gender;
	@Enumerated(EnumType.STRING)
	private Roles role;
	private boolean isSubscribed = false;
	private boolean isBlocked;
	private boolean isApproved;
	private LocalDateTime createdAt;
	private String reason;
}
