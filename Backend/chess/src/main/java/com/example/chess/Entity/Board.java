package com.example.chess.Entity;

import java.util.List;

import com.example.chess.Dto.enums.BoardTheme;
import com.example.chess.Dto.enums.PiecesTheme;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.OrderBy;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Board extends BaseEntity {

    private BoardTheme theme;

    private PiecesTheme piecesTheme;

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @OrderBy("coordinates ASC")
    private List<Box> boxes;

    @JsonIgnore
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "game_id")
    private Game game;

}
