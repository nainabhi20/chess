package com.example.chess.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.chess.Dto.enums.Color;
import com.example.chess.Dto.enums.PieceType;
import com.example.chess.Entity.Piece;

@Repository
public interface PieceRepository extends JpaRepository<Piece, Long> {

    List<Piece> findByColorAndType(Color color, PieceType type);

}
