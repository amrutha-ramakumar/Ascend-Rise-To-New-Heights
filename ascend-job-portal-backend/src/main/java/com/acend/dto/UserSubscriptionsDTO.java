package com.acend.dto;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

import com.acend.enums.SubscriptionStatus;


@Data
public class UserSubscriptionsDTO {

    
    private Long user;

    
    private Long plan;

    
    private LocalDateTime startDate;

    
    private LocalDateTime endDate;

   
    private SubscriptionStatus status; // Enum: ACTIVE, EXPIRED, CANCELLED

    
    private Boolean autoRenewal = false;

    
    private LocalDateTime createdAt;

   
    private LocalDateTime updatedAt;
}
