package com.acend.chat;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ChatMessage {
    private String sender;
    private String content;
    private String chatId;
    
    private LocalDateTime timestamp = LocalDateTime.now();
}
