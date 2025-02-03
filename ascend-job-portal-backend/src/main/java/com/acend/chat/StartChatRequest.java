package com.acend.chat;

import lombok.Data;

@Data
public class StartChatRequest {
    private Long employerId;
    private Long jobseekerId;
    private String startedBy;
}


