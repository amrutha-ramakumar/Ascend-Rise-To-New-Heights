//package com.acend.chat;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/messages")
//public class MessageController {
//
//    @Autowired
//    private MessageService messageService;
//
//    @GetMapping("/{chatId}")
//    public List<Message> getMessages(@PathVariable Long chatId) {
//        return messageService.getMessages(chatId);
//    }
//
//    @PostMapping("/send")
//    public Message sendMessage(@RequestParam Long chatId, @RequestParam String senderId, @RequestParam String message) {
//        return messageService.sendMessage(chatId, senderId, message);
//    }
//}
