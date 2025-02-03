package com.acend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private Users user; 
    
    @ManyToOne
    @JoinColumn(name = "industry_id", nullable = false)
    private Industry industry; 

    @OneToOne
    @JoinColumn(name = "company_id", nullable = false)
    private Company company; 
    
    private boolean isApproved;
}