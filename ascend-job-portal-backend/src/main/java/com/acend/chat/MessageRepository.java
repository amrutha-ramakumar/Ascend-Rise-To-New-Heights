package com.acend.chat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByChatIdOrderBySentAtAsc(Long chatId);
    
    @Query("SELECT m FROM Message m WHERE m.chatId = :chatId ORDER BY m.sentAt ASC")
    List<Message> findMessagesByChatIdOrdered(@Param("chatId") Long chatId);
}
