package com.example.chess.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.chess.Entity.Board;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    Board findByGameId(Long gameId);
}
