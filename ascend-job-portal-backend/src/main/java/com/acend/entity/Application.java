package com.acend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private LocalDateTime appliedAt;
    private String applicationStatus;

    @ManyToOne
    @JoinColumn(name = "jobseeker_id")
    private Jobseeker jobSeeker; 

    @ManyToOne
    @JoinColumn(name = "job_post_id")
    private Job jobPost; 

    private String resumePath; 

    @Lob
    @Column(columnDefinition = "TEXT")
    private String additionalDetails; 
}
