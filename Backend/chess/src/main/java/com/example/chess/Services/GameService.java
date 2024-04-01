package com.example.chess.Services;

import java.util.*;

import org.springframework.stereotype.Service;

import com.example.chess.Dto.GameStatus;
import com.example.chess.Dto.Request.CreateGameRequest;
import com.example.chess.Dto.Request.LiveGameMoveRequest;
import com.example.chess.Dto.Response.GameResponse;
import com.example.chess.Dto.Response.MoveResponse;
import com.example.chess.Dto.Response.PlayedGamesResponse;
import com.example.chess.Dto.enums.Color;
import com.example.chess.Dto.enums.Coordinates;
import com.example.chess.Entity.Board;
import com.example.chess.Entity.Box;
import com.example.chess.Entity.Game;
import com.example.chess.Entity.Move;
import com.example.chess.Entity.Piece;
import com.example.chess.Entity.UserInfo;
import com.example.chess.Exceptions.BadRequestException;
import com.example.chess.Repository.GameRepository;
import com.example.chess.Repository.UserInfoRepository;
import java.util.stream.Collectors;

import io.micrometer.common.lang.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class GameService {

    private final UserInfoRepository userInfoRepository;
    private final BoardService boardService;
    private final GameRepository gameRepository;
    private final AuthService authService;
    private final MoveService moveService;

    public void validateCurrentGameOnGoing(UserInfo userInfo) {
        if (userInfo.getWhiteGames().size() > 0) {
            if (List.of(GameStatus.NOT_STARTED, GameStatus.STARTED)
                    .contains(userInfo.getWhiteGames().get(0).getStatus())) {
                throw new BadRequestException("One of player is Currently in ongoing game");
            }
        }
        if (userInfo.getBlackGames().size() > 0) {
            if (List.of(GameStatus.NOT_STARTED, GameStatus.STARTED)
                    .contains(userInfo.getBlackGames().get(0).getStatus())) {
                throw new BadRequestException("One of player is Currently in ongoing game");
            }
        }
    }

    public boolean createGame(@NonNull CreateGameRequest createGameRequest) {
        log.info("Creating game for users: {}", createGameRequest);
        Long currentUserId = authService.getUserIdToken();
        if (Objects.isNull(createGameRequest.getOpponentPlayerUserName()) || Objects.isNull(currentUserId)) {
            log.info("NUll check faule");
            throw new BadRequestException("Black player or white player Id is null");
        }

        Optional<UserInfo> optionalWhitePlayer = userInfoRepository.findById(currentUserId);
        Optional<UserInfo> optionalBlackPlayer = userInfoRepository
                .findByName(createGameRequest.getOpponentPlayerUserName());
        if (optionalWhitePlayer.isEmpty()) {
            log.info(null, optionalBlackPlayer);
        }
        if (optionalWhitePlayer.isEmpty() || optionalBlackPlayer.isEmpty()) {
            throw new BadRequestException("Black player or white player record is not exists");
        }
        UserInfo whitePlayer = optionalWhitePlayer.get();
        UserInfo blackPlayer = optionalBlackPlayer.get();
        validateCurrentGameOnGoing(whitePlayer);
        validateCurrentGameOnGoing(blackPlayer);

        Board newBoard = boardService.createNewBoard();
        Game game = new Game();
        game.setBlackPlayer(blackPlayer);
        game.setWhitePlayer(whitePlayer);
        game.setBoard(newBoard);
        game.setStatus(GameStatus.NOT_STARTED);
        game.setCurrentPlayerTurn(Color.BLACK);
        newBoard.setGame(game);
        gameRepository.save(game);
        return true;
    }

    public void movePiece(Coordinates from, Coordinates to, Game game) {
        Board board = game.getBoard();
        List<Box> boxes = board.getBoxes();
        // send Request to move service to validate move
        int fromIndex = getIndex(from);
        int toIndex = getIndex(to);

        Piece movedPiece = boxes.get(fromIndex).getPiece();
        Piece killedPiece = boxes.get(toIndex).getPiece();

        Color currentPlayerTurn = game.getCurrentPlayerTurn() == Color.WHITE ? Color.BLACK : Color.WHITE;

        game.setCurrentPlayerTurn(currentPlayerTurn);
        boxes.get(fromIndex).setPiece(null);
        boxes.get(toIndex).setPiece(movedPiece);
        Move move = new Move();
        move.setGame(game);
        move.setFromCoordinates(from);
        move.setToCoordinates(to);
        move.setPiece(killedPiece);
        game.getMoves().add(move);
        gameRepository.save(game);
    }

    public int getIndex(Coordinates cc) {
        return (cc.name().charAt(0) - 'A') * 8 + (cc.name().charAt(1) - '1');
    }

    public List<PlayedGamesResponse> gameList(Long userId) {
        log.info(userId.toString());
        Optional<UserInfo> userInfoOptional = userInfoRepository.findById(userId);
        if (userInfoOptional.isEmpty()) {
            throw new BadRequestException("No such user found");
        }
        UserInfo userInfo = userInfoOptional.get();
        List<PlayedGamesResponse> result = userInfo.getBlackGames().stream()
                .map(game -> mapping(game, Color.BLACK))
                .collect(Collectors.toList());

        result.addAll(userInfo.getWhiteGames().stream()
                .map(game -> mapping(game, Color.WHITE))
                .collect(Collectors.toList()));
        return result;
    }

    PlayedGamesResponse mapping(Game game, Color color) {
        String username;
        if (color == Color.BLACK) {
            username = game.getWhitePlayer().getName();
        } else {
            username = game.getBlackPlayer().getName();
        }
        PlayedGamesResponse playedGamesResponse = PlayedGamesResponse.builder()
                .createdTime(game.getCreatedTime())
                .winner(null)
                .username(username)
                .id(game.getId())
                .status(game.getStatus()).build();
        return playedGamesResponse;
    }

    public GameResponse getGameById(Long id) {
        Optional<Game> gameOptional = gameRepository.findById(id);
        if (gameOptional.isEmpty()) {
            throw new BadRequestException("Game not found");
        }
        Game game = gameOptional.get();
        GameResponse gameResponse = GameResponse.builder()
                .id(game.getId())
                .GameStatus(game.getStatus())
                .board(boardService.mapping(game.getBoard()))
                .currentPlayerTurn(game.getCurrentPlayerTurn())
                .blackPlayerUserId(game.getBlackPlayer().getId())
                .whitePlayerUserId(game.getWhitePlayer().getId())
                .moves(game.getMoves().stream().map(move -> moveService.mapping(move)).collect(Collectors.toList()))
                .build();
        return gameResponse;
    }

    public MoveResponse move(LiveGameMoveRequest liveGameMoveRequest, Long gameId) {
        Optional<Game> gameOptional = gameRepository.findById(gameId);
        if (gameOptional.isEmpty()) {
            throw new BadRequestException("Bad request");
        }
        Game game = gameOptional.get();
        movePiece(liveGameMoveRequest.getFromCoordinates(), liveGameMoveRequest.getToCoordinates(), game);
        MoveResponse moveResponse = MoveResponse.builder()
                .pieceResponse(moveService.mapToPiece(game.getMoves().get(game.getMoves().size() - 1).getPiece()))
                .from(liveGameMoveRequest.getFromCoordinates())
                .to(liveGameMoveRequest.getToCoordinates())
                .build();
        log.info(moveResponse.toString());
        return moveResponse;

    }

}
