package com.example.chess.Entity;

import com.example.chess.Dto.enums.Coordinates;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@NoArgsConstructor
public class Box extends BaseEntity {

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "board_id", referencedColumnName = "id")
    private Board board;

    private Coordinates coordinates;

    @ManyToOne
    @JoinColumn(name = "piece_id")
    private Piece piece;

}
