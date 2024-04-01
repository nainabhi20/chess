package com.example.chess.Entity;

import com.example.chess.Dto.enums.Coordinates;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Move extends BaseEntity {

    private Coordinates fromCoordinates;

    private Coordinates toCoordinates;

    @ManyToOne
    @JoinColumn(name = "piece_id")
    private Piece piece;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "game_id")
    private Game game;
}
