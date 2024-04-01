package com.example.chess.Entity;

import java.util.List;

import com.example.chess.Dto.GameStatus;
import com.example.chess.Dto.enums.Color;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Game extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "white_player_id", referencedColumnName = "id")
    private UserInfo whitePlayer;

    @ManyToOne
    @JoinColumn(name = "black_player_id", referencedColumnName = "id")
    private UserInfo blackPlayer;

    @ManyToOne
    @JoinColumn(name = "winner_player_id", referencedColumnName = "id")
    private UserInfo winner;

    private GameStatus status;

    private Color currentPlayerTurn;

    @OneToOne(mappedBy = "game", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Board board;

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Move> moves;

}
