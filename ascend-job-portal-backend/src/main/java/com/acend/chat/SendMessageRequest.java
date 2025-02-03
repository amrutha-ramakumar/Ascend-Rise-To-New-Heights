package com.acend.chat;

import lombok.Data;

@Data
public class SendMessageRequest {
    private String sender;
    private String content;
}