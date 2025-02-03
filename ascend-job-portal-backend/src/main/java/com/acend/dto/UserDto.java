package com.acend.dto;

import com.acend.enums.Gender;
import com.acend.enums.Roles;

import lombok.Data;

@Data
public class UserDto {
	private String firstName;
	private String lastName;
	private String email;
	private String phone;
	private String password;
	private Gender gender;
	private Roles role;
}
