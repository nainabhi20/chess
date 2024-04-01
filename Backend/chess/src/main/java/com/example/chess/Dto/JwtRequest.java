package com.example.chess.Dto;

import lombok.Data;

@Data
public class JwtRequest {

	private String username;
	private String password;

	// Getters and setters
}