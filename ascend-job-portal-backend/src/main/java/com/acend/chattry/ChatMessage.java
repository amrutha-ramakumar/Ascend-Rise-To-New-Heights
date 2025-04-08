//package com.acend.chattry;
//
//import java.time.LocalDateTime;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Entity
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
//public class ChatMessage {
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private Long id;
//	private Long chatId;
//	private Long senderId;
//	private Long receiverId; // Add Receiver ID
//	private String senderType; // employer/jobseeker
//	private String message;
//	private LocalDateTime timestamp;
//}

package com.acend.chattry;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long chatId;
    private Long senderId;
    private Long receiverId;
    private String senderType;
    private String message;
    private String fileUrl;  // For file sharing (new)
    private String fileType;  // For file sharing (new)
    private LocalDateTime timestamp;
    private boolean isRead;
}
