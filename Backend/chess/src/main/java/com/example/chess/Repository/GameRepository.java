package com.example.chess.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.chess.Entity.Game;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
}
