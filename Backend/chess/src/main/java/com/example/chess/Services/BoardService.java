package com.example.chess.Services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import java.util.stream.Collectors;

import com.example.chess.Dto.Response.BoardResponse;
import com.example.chess.Dto.Response.BoxResponse;
import com.example.chess.Dto.enums.BoardTheme;
import com.example.chess.Dto.enums.Color;
import com.example.chess.Dto.enums.Coordinates;
import com.example.chess.Dto.enums.PieceType;
import com.example.chess.Dto.enums.PiecesTheme;
import com.example.chess.Entity.Board;
import com.example.chess.Entity.Box;
import com.example.chess.Entity.Piece;
import com.example.chess.Repository.BoardRepository;
import com.example.chess.Repository.PieceRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final PieceRepository pieceRepository;
    private final BoardRepository boardRepository;
    private final MoveService moveService;

    public Board createNewBoard() {
        Board board = new Board();

        List<Coordinates> coordinates = Coordinates.getAllCoordinates();

        List<Box> boxes = new ArrayList<>();

        for (int i = 0; i < coordinates.size(); i++) {
            Box newBox = new Box();
            newBox.setCoordinates(coordinates.get(i));
            newBox.setBoard(board);
            boxes.add(newBox);
        }
        List<Piece> pieces = pieceRepository.findAll();
        Map<String, Piece> map = new HashMap<>();
        for (Piece piece : pieces) {
            map.put(piece.getType().name() + piece.getColor().name(), piece);
        }
        Piece blackPawnPiece = map.getOrDefault(PieceType.PAWN.name() + Color.BLACK.name(), null);
        for (int i = 8; i < 16; i++) {
            boxes.get(i).setPiece(blackPawnPiece);
        }
        Piece blackRook = map.getOrDefault(PieceType.ROOK.name() + Color.BLACK.name(), null);
        boxes.get(0).setPiece(blackRook);
        boxes.get(7).setPiece(blackRook);
        Piece blackKnight = map.getOrDefault(PieceType.KNIGHT.name() + Color.BLACK.name(), null);
        boxes.get(1).setPiece(blackKnight);
        boxes.get(6).setPiece(blackKnight);
        Piece blackBishop = map.getOrDefault(PieceType.BISHOP.name() + Color.BLACK.name(), null);
        boxes.get(2).setPiece(blackBishop);
        boxes.get(5).setPiece(blackBishop);
        Piece blackQueen = map.getOrDefault(PieceType.QUEEN.name() + Color.BLACK.name(), null);
        boxes.get(3).setPiece(blackQueen);
        Piece blackKing = map.getOrDefault(PieceType.KING.name() + Color.BLACK.name(), null);
        boxes.get(4).setPiece(blackKing);

        // Setting white pieces in box
        Piece whitePawnPiece = map.getOrDefault(PieceType.PAWN.name() + Color.WHITE.name(), null);
        for (int i = 48; i < 56; i++) {
            boxes.get(i).setPiece(whitePawnPiece);
        }
        Piece whiteRook = map.getOrDefault(PieceType.ROOK.name() + Color.WHITE.name(), null);
        boxes.get(56).setPiece(whiteRook);
        boxes.get(63).setPiece(whiteRook);
        Piece whiteKnight = map.getOrDefault(PieceType.KNIGHT.name() + Color.WHITE.name(), null);
        boxes.get(57).setPiece(whiteKnight);
        boxes.get(62).setPiece(whiteKnight);
        Piece whiteBishop = map.getOrDefault(PieceType.BISHOP.name() + Color.WHITE.name(), null);
        boxes.get(58).setPiece(whiteBishop);
        boxes.get(61).setPiece(whiteBishop);
        Piece whiteQueen = map.getOrDefault(PieceType.QUEEN.name() + Color.WHITE.name(), null);
        boxes.get(60).setPiece(whiteQueen);
        Piece whiteKing = map.getOrDefault(PieceType.KING.name() + Color.WHITE.name(), null);
        boxes.get(59).setPiece(whiteKing);

        board.setBoxes(boxes);
        board.setTheme(BoardTheme.DEFAULT);
        board.setPiecesTheme(PiecesTheme.DEFAULT);

        return board;
    }

    Board findByGameId(Long gameId) {
        return boardRepository.findByGameId(gameId);
    }

    public BoardResponse mapping(Board board) {
        BoardResponse boardResponse = BoardResponse.builder()
                .boxes(board.getBoxes().stream().map(box -> mapToBox(box)).collect((Collectors.toList())))
                .build();
        return boardResponse;
    }

    public BoxResponse mapToBox(Box box) {
        BoxResponse boxResponse = BoxResponse.builder()
                .coordinates(box.getCoordinates())
                .pieceResponse(moveService.mapToPiece(box.getPiece()))
                .build();
        return boxResponse;
    }

}
