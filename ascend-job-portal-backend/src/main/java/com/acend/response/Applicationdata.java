package com.acend.response;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class Applicationdata {
	 private String position;
	    private String description;
	    private String company;
	    private String location;
	    private String experience;
	    private String education;
	    private String industryName;  
	    private String salary;
	    private List<String> skills; 
	    private Date postedAt;
	    private Date expiryDate;
	    private Long user;
	private String applicationStatus;
	private LocalDateTime appliedAt;
	private Long applicationId;
}
