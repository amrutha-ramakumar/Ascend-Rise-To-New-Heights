package com.acend.dto;

import com.acend.entity.Education;
import com.acend.entity.Jobseeker;

import lombok.Data;

@Data
public class EducationDto {
private Long id;
	private String qualificationLevel;
    private String institutionName;
    private String boardOrUniversity;
    private String fieldOfStudy;
    private int startYear;
    private int endYear;
    private double percentage;
    private Jobseeker jobseeker;
    public static EducationDto mapTo(Education education) {
        EducationDto dto = new EducationDto();
        dto.setId(education.getEducationId());
        dto.setQualificationLevel(education.getQualificationLevel());
        dto.setInstitutionName(education.getInstitutionName());
        dto.setBoardOrUniversity(education.getBoardOrUniversity());
        dto.setFieldOfStudy(education.getFieldOfStudy());
        dto.setStartYear(education.getStartYear());
        dto.setEndYear(education.getEndYear());
        dto.setPercentage(education.getPercentage());
        return dto;
    }
    
}
