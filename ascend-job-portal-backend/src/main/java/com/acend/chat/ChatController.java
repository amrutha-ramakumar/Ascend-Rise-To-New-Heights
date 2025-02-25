package com.acend.chat;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.acend.chattry.ChatMessagesRepository;
import com.acend.config.JwtProvider;
import com.acend.entity.Application;
import com.acend.entity.Users;
import com.acend.repository.ApplicaionRepository;
import com.acend.repository.UserRepository;

@RestController
@RequestMapping("/api/chat")
public class ChatController {
    @Autowired
    private ChatRepository chatRepository;
    @Autowired 
    private ApplicaionRepository applicationRepository;
    @Autowired 
    private MessageRepository messageRepository;
    @Autowired 
    private ChatMessagesRepository chatMessagesRepository;
    @Autowired 
    private UserRepository userRepository;
    @Autowired
    private JwtProvider jwtProvider;
    @PostMapping
    public ResponseEntity<Chat> createChat(@RequestHeader("Authorization") String token,@RequestParam("applicationId") Long applicationId) {
        Chat existingChat = chatRepository.findByApplicationId(applicationId);
        if (existingChat != null) {
            return ResponseEntity.ok(existingChat);
        }

        Application application = applicationRepository.findById(applicationId).get();
        Chat newChat = new Chat();
        newChat.setApplicationId(applicationId);
        newChat.setEmployerId(application.getJobPost().getEmployer().getUser().getId());
        newChat.setJobseekerId(application.getJobSeeker().getUser().getId());
        chatRepository.save(newChat);

        return ResponseEntity.status(HttpStatus.CREATED).body(newChat);
    }
    
    
    @GetMapping
    public ResponseEntity<?> getChat(@RequestHeader("Authorization") String token, 
                                     @RequestParam("applicationId") Long applicationId) {
        // Check if the chat exists for the given application ID
        Chat existingChat = chatRepository.findByApplicationId(applicationId);

        if (existingChat != null) {
            // If chat exists, return the chat details including the chatId
            return ResponseEntity.status(HttpStatus.OK).body(existingChat);
        } else {
            // If chat does not exist, return a 404 or a message indicating no chat
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No chat found for this application.");
        }
    }

    
    
    @GetMapping("/{chatId}")
    public ResponseEntity<?> getMessages(
            @PathVariable Long chatId,
            @RequestHeader("Authorization") String token) {
        List<com.acend.chattry.ChatMessage> messages = chatMessagesRepository.findByChatId(chatId);

        if (messages.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(messages);
    }

}

