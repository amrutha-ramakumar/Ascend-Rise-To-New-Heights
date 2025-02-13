package com.acend.service;

public interface EmailService {

	void sendOTPEmail(String email, String otp);
    public void sendEmail(String to, String from, String subject, String body) ;

}
