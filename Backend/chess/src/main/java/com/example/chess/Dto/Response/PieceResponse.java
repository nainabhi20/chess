package com.example.chess.Dto.Response;

import com.example.chess.Dto.BaseDTO;
import com.example.chess.Dto.enums.Color;
import com.example.chess.Dto.enums.PieceType;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PieceResponse extends BaseDTO {
    private Color color;
    private PieceType type;
}
