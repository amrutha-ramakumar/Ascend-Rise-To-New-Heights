package com.acend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class ApplicationStatusChangeService {
	@Autowired
	private JavaMailSender mailSender;
	
	 public void sendApplicationEmail(String applicantEmail, String employerEmail, String jobTitle) {
	    try {
	        MimeMessage message = mailSender.createMimeMessage();
	        MimeMessageHelper helper = new MimeMessageHelper(message, true);

	        String subject = "Application Received - " + jobTitle;
	        String body = "Dear Applicant,\n\n" +
	                "Thank you for applying for the position of **" + jobTitle + "**. " +
	                "We have received your application, and our team will review it soon.\n\n" +
	                "Best regards,\nHR Team";

	        helper.setFrom(employerEmail);
	        helper.setTo(applicantEmail);
	        helper.setSubject(subject);
	        helper.setText(body);

	        mailSender.send(message);
	        System.out.println("Application email sent successfully to " + applicantEmail);
	    } catch (MessagingException e) {
	        e.printStackTrace();
	        throw new RuntimeException("Failed to send email.");
	    }
}
}
