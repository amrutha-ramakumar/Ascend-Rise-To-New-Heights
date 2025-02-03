package com.acend.request;

import com.acend.enums.Roles;

import lombok.Data;

@Data
public class LoginRequest {
	
	private String email;
	private String password;
	private Roles role;

}
