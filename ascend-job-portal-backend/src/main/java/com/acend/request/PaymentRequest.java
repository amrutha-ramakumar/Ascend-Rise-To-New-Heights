package com.acend.request;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class PaymentRequest {
    private Long subscriptionId;
    private Double amount;
    private String paymentMethod;
    private String transactionId;
    private String status;
    private LocalDateTime paymentDate;
}