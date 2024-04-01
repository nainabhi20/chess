package com.example.chess.Dto.Request;

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
public class LiveGameMoveRequest extends BaseDTO {
    private Coordinates fromCoordinates;
    private Coordinates toCoordinates;
}
