package com.example.chess.Dto.Response;

import com.example.chess.Dto.BaseDTO;
import com.example.chess.Dto.GameStatus;
import com.example.chess.Dto.enums.Color;

import java.util.*;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
public class GameResponse extends BaseDTO {
    private Long id;
    private Long whitePlayerUserId;
    private Long blackPlayerUserId;
    private Color currentPlayerTurn;
    private GameStatus GameStatus;
    private BoardResponse board;
    private List<MoveResponse> moves;
}
