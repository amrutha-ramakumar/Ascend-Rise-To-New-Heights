package com.acend.response;

import com.acend.entity.Users;
import com.acend.enums.Gender;

import lombok.Data;

@Data
public class EmployerDetails {
	private Long empId;
	private String firstName;
	private String lastName;
	private String email;
	private String phone;
	private Gender gender;
	private Users user;
	private String industryType;
	private String companyName;
	private String companyWebsite;
	private String companyAddress;
}
