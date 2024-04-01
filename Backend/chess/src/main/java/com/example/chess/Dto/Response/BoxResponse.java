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
public class BoxResponse extends BaseDTO {
    private Coordinates coordinates;
    private PieceResponse pieceResponse;
}
