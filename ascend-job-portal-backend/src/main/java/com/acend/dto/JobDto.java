package com.acend.dto;

import lombok.Data;
import java.util.Date;
import java.util.List;

@Data
public class JobDto {
private Long id;
    private String position;
    private String description;
    private String location;
    private String experience;
    private String education;
    private Long industryId;  
    private String salary;
    private List<String> skills; 
    private Date postedAt;
    private Date expiryDate;
    private boolean isDeleted = false;
    private boolean hasApplied;
	private boolean hasSaved;
	private boolean approved;
}
