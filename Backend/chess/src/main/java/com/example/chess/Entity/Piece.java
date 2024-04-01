package com.example.chess.Entity;

import com.example.chess.Dto.enums.Color;
import com.example.chess.Dto.enums.PieceType;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Piece extends BaseEntity {
    private PieceType type;
    private Color color;
}
