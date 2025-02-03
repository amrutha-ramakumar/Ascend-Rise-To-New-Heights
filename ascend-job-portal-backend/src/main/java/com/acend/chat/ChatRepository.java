package com.acend.chat;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
    Optional<Chat> findByEmployerIdAndJobseekerId(Long employerId, Long jobseekerId);

	Chat findByApplicationId(Long applicationId);
}
