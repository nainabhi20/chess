package com.example.chess.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class UserInfo extends BaseEntity {

    @Column(unique = true)
    private String name;

    private String email;

    private String password;

    private String roles;

    @OneToMany(mappedBy = "whitePlayer")
    private List<Game> whiteGames;

    @OneToMany(mappedBy = "blackPlayer")
    private List<Game> blackGames;

    @JsonIgnore
    @OneToMany(mappedBy = "winner")
    private List<Game> winGames;

}
