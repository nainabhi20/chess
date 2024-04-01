package com.example.chess.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.chess.Entity.Move;

@Repository
public interface MoveRepository extends JpaRepository<Move, Integer> {
}
