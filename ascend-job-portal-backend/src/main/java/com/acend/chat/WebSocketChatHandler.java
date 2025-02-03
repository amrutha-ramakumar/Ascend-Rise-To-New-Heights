package com.acend.chat;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class WebSocketChatHandler extends TextWebSocketHandler {

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // Handle incoming message from WebSocket connection
        String payload = message.getPayload();
        // Broadcasting the message (for simplicity, not using any message queue or broadcast mechanism)
        session.sendMessage(new TextMessage("Reply: " + payload));
    }
}
