package com.example.chess.Dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JwtResponse {

    private final String token;

    public JwtResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return this.token;
    }
}
