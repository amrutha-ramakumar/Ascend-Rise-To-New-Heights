package com.acend.request;

import lombok.Data;

@Data
public class VerifyOTPRequest {

	private String email;
	private String otp;
}
