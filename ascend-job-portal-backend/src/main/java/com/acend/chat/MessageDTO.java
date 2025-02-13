package com.acend.chat;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class MessageDTO {
    private Long id;
    private Long chatId;
    private String sender;
    private String content;
    private LocalDateTime timestamp;
}

