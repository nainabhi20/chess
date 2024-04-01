package com.example.chess.Controller;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.example.chess.Dto.Request.LiveGameMoveRequest;
import com.example.chess.Dto.Response.MoveResponse;
import com.example.chess.Services.GameMappingService;
import com.example.chess.Services.GameService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequiredArgsConstructor
public class GameMapping {

    private final GameMappingService gameMappingService;
    private final GameService gameService;

    @MessageMapping("/search-player/{username}")
    void searchFriend(@DestinationVariable String username) {
        log.info("Serach player request came for player username: {}", username);
        gameMappingService.sendRequestToPlayer(username);
    }

    @MessageMapping("/game/{gameId}")
    @SendTo("/topic/game/{gameId}")
    MoveResponse move(@DestinationVariable Long gameId, @Payload LiveGameMoveRequest liveGameMoveRequest) {
        log.info("Move request came to websocket wih game id: {}, detail: {}", gameId, liveGameMoveRequest.toString());
        return gameService.move(liveGameMoveRequest, gameId);
    }

}
