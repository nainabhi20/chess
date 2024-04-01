import React from 'react';
import Grid from '@mui/material/Grid';
import { BoardBox } from './Box';
import { useGameContext } from '../GameContext/useGameContext';

// Define types for the chess piece and square colors
export type SquareColor = 'light' | 'dark';

type UserName = {
  username : string;
}
// Define the chessboard grid component
export const Board: React.FC = () => {
  // Define the colors for light and dark squares
  const lightColor = '#f0d9b5';
  const darkColor = '#b58863';
  const gameContext = useGameContext();
  const isWhitePlayer : boolean = gameContext?.userId === gameContext?.gameDetails?.whitePlayerUserId;
  // Function to determine the color of each square

  // Function to render a row of squares
  const renderRow = (row: number): JSX.Element[] => {
    return Array.from({ length: 8 }, (_, col) => <BoardBox row={isWhitePlayer ? row : 7-row} col={col} />);
  };

  // Render the chessboard grid
  return (
      <Grid container>
        {Array.from({ length: 8 }, (_, row) => (
          <Grid container item key={row} justifyContent="center">
            {renderRow(row)}
          </Grid>
        ))}
      </Grid>
  );
};