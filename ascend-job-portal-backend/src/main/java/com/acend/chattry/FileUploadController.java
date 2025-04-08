//package com.acend.chattry;
//
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//import org.springframework.http.ResponseEntity;
//import org.springframework.http.HttpStatus;
//import org.springframework.util.StringUtils;
//import java.io.IOException;
//import java.nio.file.*;
//
//@RestController
//@RequestMapping("/api/files")
//public class FileUploadController {
//
//    private static final String UPLOAD_DIR = "src/main/resources/static/media/";
//
//    @PostMapping("/upload")
//    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
//        try {
//            if (file.isEmpty()) {
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File is empty");
//            }
//
//            // Ensure directory exists
//            Files.createDirectories(Paths.get(UPLOAD_DIR));
//
//            // Save file
//            String fileName = System.currentTimeMillis() + "_" + StringUtils.cleanPath(file.getOriginalFilename());
//            Path filePath = Paths.get(UPLOAD_DIR, fileName);
//            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
//
//            // Return the file URL
//            return ResponseEntity.ok("/media/" + fileName);
//
//        } catch (IOException e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file");
//        }
//    }
//}

package com.acend.chattry;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.acend.config.JwtProvider;
import com.acend.entity.Users;
import com.acend.repository.UserRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.util.StringUtils;
import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/files")
public class FileUploadController {
	@Autowired 
    private ChatMessagesRepository chatMessagesRepository;
	@Autowired
    private JwtProvider jwtProvider;
    @Autowired 
    private UserRepository userRepository;
    private static final String UPLOAD_DIR = "src/main/resources/static/media/";
    private static final String FILE_URL_PREFIX = "http://localhost:8080/media/"; // Update this with your actual server URL
//    private static final String FILE_URL_PREFIX = "https://amrutharamakumar.online/media/"; // Update this with your actual server URL

    
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File is empty");
            }

            // Ensure directory exists
            Files.createDirectories(Paths.get(UPLOAD_DIR));

            // Save file with timestamp to prevent name collisions
            String fileName = System.currentTimeMillis() + "_" + StringUtils.cleanPath(file.getOriginalFilename());
            Path filePath = Paths.get(UPLOAD_DIR, fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Return the complete file URL
            String fileUrl = FILE_URL_PREFIX + fileName;
            return ResponseEntity.ok(fileUrl);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file");
        }
    }
    @PostMapping("/mark-read")
    public ResponseEntity<?> markMessagesAsRead(@RequestHeader("Authorization") String token,@RequestBody Map<String, List<Long>> request) {
        List<Long> messageIds = request.get("messageIds");
        
        if (messageIds != null && !messageIds.isEmpty()) {
            List<ChatMessage> messages = chatMessagesRepository.findAllById(messageIds);
            
            for (ChatMessage message : messages) {
                message.setRead(true);
            }
            
            chatMessagesRepository.saveAll(messages);
            return ResponseEntity.ok().build();
        }
        
        return ResponseEntity.badRequest().body("No message IDs provided");
    }
    
    @GetMapping("/unread-messages")
    public List<ChatMessage> getUnreadMessages(@RequestHeader("Authorization") String token) {
    	String email = jwtProvider.getEmailFromToken(token);
    	Users user = userRepository.findByEmail(email);
        return chatMessagesRepository.findByReceiverIdAndIsRead(user.getId(),false);
    }
}