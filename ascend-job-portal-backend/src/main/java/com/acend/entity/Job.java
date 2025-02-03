package com.acend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity(name = "jobs")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Use auto-incrementing ID
    private Long id;

    private String position;
    private String description;
    private String location;
    private String experience;
    private String education;
    @ManyToOne
    @JoinColumn(name = "industry_id", nullable = false)
    private Industry industry;
    private String salary;

    @ManyToMany
    @JoinTable(
        name = "job_skills",
        joinColumns = @JoinColumn(name = "job_id"),
        inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    private List<Skill> skills;

    @Column(nullable = false)
    private Date postedAt;

    private Date expiryDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "employer_id", nullable = false) 
    private Employer employer; 
    @Column(nullable = true)
   private boolean approved;
    @Column
    private boolean isDeleted = false; 
}
