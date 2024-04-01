package com.example.chess.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.chess.Entity.Box;

@Repository
public interface BoxRepository extends JpaRepository<Box, Integer> {
}
