package com.example.chess.Dto.Response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import com.example.chess.Dto.BaseDTO;
import com.example.chess.Dto.GameStatus;
import java.time.*;

@Getter
@Setter
@ToString
@Builder
public class PlayedGamesResponse extends BaseDTO {

    private Long id;

    private String username;

    private String winner;

    private Instant createdTime;

    private GameStatus status;

}
