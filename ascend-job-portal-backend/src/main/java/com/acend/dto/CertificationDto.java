package com.acend.dto;

import lombok.Data;

@Data
public class CertificationDto {
private Long id;
	private String certificationName;
    private String issuedBy;
    private String issueDate;
    private String expiryDate;
}
