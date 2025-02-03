//package com.acend.chat;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class MessageService {
//
//    @Autowired
//    private MessageRepository messageRepository;
//
//    public List<Message> getMessages(Long chatId) {
//        return messageRepository.findByChatId(chatId);
//    }
//
//    public Message sendMessage(Long chatId, String senderId, String messageContent) {
//        Message message = new Message(chatId, senderId, messageContent);
//        return messageRepository.save(message);
//    }
//}
