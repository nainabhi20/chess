package com.example.chess.Services;

import org.springframework.stereotype.Service;

import com.example.chess.Dto.Response.MoveResponse;
import com.example.chess.Dto.Response.PieceResponse;
import com.example.chess.Entity.Move;
import com.example.chess.Entity.Piece;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MoveService {

    public MoveResponse mapping(Move move) {
        MoveResponse moveResponse = MoveResponse.builder()
                .from(move.getFromCoordinates())
                .to(move.getToCoordinates())
                .pieceResponse(mapToPiece(move.getPiece()))
                .build();
        return moveResponse;
    }

    public PieceResponse mapToPiece(Piece piece) {
        if (piece == null)
            return null;
        PieceResponse pieceResponse = PieceResponse.builder()
                .color(piece.getColor())
                .type(piece.getType())
                .build();
        return pieceResponse;
    }
}
