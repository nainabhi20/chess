package com.example.chess.Services;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GameMappingService {

    private final SimpMessagingTemplate simpMessagingTemplate;

    public void sendRequestToPlayer(String username) {
        simpMessagingTemplate.convertAndSend("/topic/matching/" + username,
                "Matching request came from another player");
    }

}

@Data
@Builder
class MappingMessage {
    private String username;
}