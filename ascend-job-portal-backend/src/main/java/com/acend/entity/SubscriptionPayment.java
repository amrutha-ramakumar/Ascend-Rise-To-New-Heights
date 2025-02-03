package com.acend.entity;

import java.time.LocalDateTime;

import com.acend.enums.PaymentStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "subscription_payments")
public class SubscriptionPayment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Users user; // The user making the payment

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subscription_id", nullable = false)
    private UserSubscriptions subscription; // The subscription being paid for

    @Column(nullable = false)
    private Double amount; // Amount paid

    @Column(name = "payment_method", nullable = false)
    private String paymentMethod; // Payment method used

    @Column(name = "transaction_id", unique = true)
    private String transactionId; // Unique transaction ID

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private PaymentStatus status; // Payment status (PENDING, COMPLETED, FAILED)

    @Column(name = "payment_date")
    private LocalDateTime paymentDate;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    private boolean isValid = true; // Whether the payment is valid or not

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
