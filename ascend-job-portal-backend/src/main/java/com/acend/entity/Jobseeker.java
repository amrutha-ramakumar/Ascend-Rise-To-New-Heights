package com.acend.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Jobseeker {
	@Id
    private Long jobseekerId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "jobseekerId")
    private Users user;

    private String resumeUrl;
    private String aboutMe;
    private String linkedinUrl;
    private String portfolioUrl;
    
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
        name = "jobseeker_skills",
        joinColumns = @JoinColumn(name = "jobseeker_id"),
        inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    private List<Skill> skills;


    @OneToMany(mappedBy = "jobseeker", cascade = CascadeType.ALL)
    private List<Education> education;

    @OneToMany(mappedBy = "jobseeker", cascade = CascadeType.ALL)
    private List<Experience> experience;

    @OneToMany(mappedBy = "jobseeker", cascade = CascadeType.ALL)
    private List<Certification> certifications;

    @OneToMany(mappedBy = "jobseeker", cascade = CascadeType.ALL)
    private List<ExtraCurricularActivity> extracurricularActivities;
}
