package com.acend.chat;


import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "message")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long chatId;
    private String name;
    private String sender;
    private String content;
    private LocalDateTime sentAt = LocalDateTime.now();
	public Message(Long chatId, String sender, String content) {
		super();
		this.chatId = chatId;
		this.sender = sender;
		this.content = content;
	}

}
