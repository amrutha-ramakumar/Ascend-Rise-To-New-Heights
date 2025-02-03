package com.acend.request;

import lombok.Data;

@Data
public class OrderRequest {
    private Long subscriptionId;
    private Integer amount;
}