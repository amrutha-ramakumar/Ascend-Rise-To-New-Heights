//package com.acend.chattry;
//
//
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.handler.annotation.SendTo;
//import org.springframework.stereotype.Controller;
//
//
//import java.time.LocalDateTime;
//
//@Controller
//public class ChatsController {
//    
//    @MessageMapping("/chat.sendMessage")
//    @SendTo("/topic/chatroom")
//    public ChatMessage sendMessage(ChatMessage chatMessage) {
//        chatMessage.setTimestamp(LocalDateTime.now());
//        return chatMessage;
//    }
//}
//package com.acend.chattry;
//
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.handler.annotation.Payload;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
//import org.springframework.stereotype.Controller;
//import java.time.LocalDateTime;
//
//@Controller
//public class ChatsController {
//
//    private final SimpMessagingTemplate messagingTemplate;
//
//    public ChatsController(SimpMessagingTemplate messagingTemplate) {
//        this.messagingTemplate = messagingTemplate;
//    }
//
//    @MessageMapping("/chat.sendMessage")
//    public void sendMessage(@Payload ChatMessage chatMessage) {
//        chatMessage.setTimestamp(LocalDateTime.now());
//        
//        // Send message only to the receiver
//        messagingTemplate.convertAndSendToUser(
//            chatMessage.getReceiverId().toString(),
//            "/queue/messages",
//            chatMessage
//        );
//    }
//}
package com.acend.chattry;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import java.time.LocalDateTime;

@Controller
public class ChatsController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatMessagesRepository chatMessageRepository;

    public ChatsController(SimpMessagingTemplate messagingTemplate,ChatMessagesRepository chatMessageRepository) {
        this.messagingTemplate = messagingTemplate;
        this.chatMessageRepository = chatMessageRepository;

    }

    @MessageMapping("/chat.sendMessage")
    public void sendMessage(@Payload ChatMessage chatMessage) {
        chatMessage.setTimestamp(LocalDateTime.now());
        chatMessageRepository.save(chatMessage);

        messagingTemplate.convertAndSendToUser(
            chatMessage.getReceiverId().toString(),
            "/queue/messages/" + chatMessage.getChatId(), 
            chatMessage
        );
    }
}
