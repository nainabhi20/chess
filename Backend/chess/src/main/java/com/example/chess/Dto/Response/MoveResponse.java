package com.example.chess.Dto.Response;

import com.example.chess.Dto.BaseDTO;
import com.example.chess.Dto.enums.Coordinates;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
public class MoveResponse extends BaseDTO {
    private Coordinates from;
    private Coordinates to;
    private PieceResponse pieceResponse;
}
