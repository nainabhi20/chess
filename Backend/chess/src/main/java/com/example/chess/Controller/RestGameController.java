package com.example.chess.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.chess.Dto.Request.CreateGameRequest;
import com.example.chess.Dto.Response.GameResponse;
import com.example.chess.Dto.Response.PlayedGamesResponse;
import com.example.chess.Dto.enums.Coordinates;
import com.example.chess.Entity.Move;
import com.example.chess.Services.AuthService;
import com.example.chess.Services.GameService;

import java.util.List;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequestMapping("/game")
@RestController
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS
})
public class RestGameController {

    private final GameService gameService;
    private final AuthService authService;

    @PostMapping("/create-game")
    private boolean createGame(@RequestBody CreateGameRequest createGameRequest) {
        log.info("Create game request cam for {}", createGameRequest);
        return gameService.createGame(createGameRequest);
    }

    @GetMapping("/get-game/{id}")
    private GameResponse getGame(@PathVariable Long id) {
        log.info("get game request id:{}", id);
        return gameService.getGameById(id);
    }

    @PostMapping("/move/{gameId}")
    private Move move(@PathVariable Long gameId, @RequestParam Coordinates from, @RequestParam Coordinates to) {
        log.info("[Request] Received for move piece from {} to {}", from, to);
        // gameService.movePiece(from, to, gameId);
        return new Move();
    }

    @GetMapping("/game-list")
    private List<PlayedGamesResponse> gameList() {
        log.info("null");
        Long userId = authService.getUserIdToken();
        return gameService.gameList(userId);
    }

}
