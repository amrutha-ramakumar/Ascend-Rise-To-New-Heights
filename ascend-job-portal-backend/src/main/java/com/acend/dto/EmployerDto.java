package com.acend.dto;

import lombok.Data;

@Data
public class EmployerDto {

    private String companyName;
    private String companyWebsite;
    private String companyAddress;

    private Long industryId;

    private boolean isApproved;
}
