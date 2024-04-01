package com.example.chess.Dto.Request;

import java.io.Serializable;

import lombok.Data;

@Data
public class CreateGameRequest implements Serializable {
    private String opponentPlayerUserName;
}
