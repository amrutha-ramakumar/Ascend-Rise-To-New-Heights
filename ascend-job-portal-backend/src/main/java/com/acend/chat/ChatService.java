//package com.acend.chat;
//
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.acend.entity.Application;
//import com.acend.entity.Users;
//import com.acend.repository.ApplicaionRepository;
//import com.acend.repository.UserRepository;
//
//@Service
//public class ChatService {
//    @Autowired
//    private ChatRepository chatRepository;
//
//    @Autowired
//    private MessageRepository messageRepository;
//
//    public Chat startChat(Long employerId, Long jobseekerId, String startedBy) {
//        return chatRepository.findByEmployerIdAndJobseekerId(employerId, jobseekerId)
//                .orElse(chatRepository.save(new Chat(employerId, jobseekerId, startedBy)));
//    }
//
//    public List<Message> getMessages(Long chatId) {
//        return messageRepository.findByChatIdOrderBySentAtAsc(chatId);
//    }
//
//    public Message sendMessage(Long chatId, String sender, String content) {
//        return messageRepository.save(new Message(chatId, sender, content));
//    }
//}
