package com.acend.chattry;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acend.entity.Users;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ChatMessagesRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByChatId(Long chatId);

	Long countByReceiverIdAndTimestampAfter(Long id, LocalDateTime tenDaysAgo);

	List<ChatMessage> findByReceiverIdAndIsRead(Long id, boolean b);
}
