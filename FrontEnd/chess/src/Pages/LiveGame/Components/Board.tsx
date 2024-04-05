import React from 'react';
import Grid from '@mui/material/Grid';
import { Box, Typography } from '@mui/material';
import { BoardBox } from './Box';
import { useGameContext } from '../GameContext/useGameContext';
import { KilledPieces, PieceType, TColor } from '../GameContext/ContextType';
import { getPieceSticker } from './Piece';
import { convertStringToPiecesType } from '../../../Utils/enumConversion';

export type SquareColor = 'light' | 'dark';

export const Board: React.FC = () => {
  const lightColor = '#f0d9b5';
  const darkColor = '#b58863';
  const gameContext = useGameContext();
  const isWhitePlayer: boolean =
    gameContext?.userId === gameContext?.gameDetails?.whitePlayerUserId;

  const renderRow = (row: number): JSX.Element[] => {
    return Array.from({ length: 8 }, (_, col) => (
      <BoardBox key={col} row={isWhitePlayer ? row : 7 - row} col={col} />
    ));
  };

  const renderKilledPieces = (color: TColor) => {
    let killedPieces: KilledPieces | undefined = color === TColor.BLACK ? gameContext?.blackKilledPieces : gameContext?.whiteKilledPieces;
  
    if (!killedPieces) return null;
  
    return (
      <Box>
          <KilledPiece color={color} type={PieceType.KING} count={killedPieces[PieceType.KING]} />
          <KilledPiece color={color} type={PieceType.QUEEN} count={killedPieces[PieceType.QUEEN]} />
          <KilledPiece color={color} type={PieceType.KNIGHT} count={killedPieces[PieceType.KNIGHT]} />
          <KilledPiece color={color} type={PieceType.BISHOP} count={killedPieces[PieceType.BISHOP]} />
          <KilledPiece color={color} type={PieceType.PAWN} count={killedPieces[PieceType.PAWN]} />
          <KilledPiece color={color} type={PieceType.ROOK} count={killedPieces[PieceType.ROOK]} />


      </Box>
    );
  };

  return (
    <Grid container justifyContent="center">
      {/* Left Container for Killed Pieces */}
      <Grid item xs={2} container direction="column" alignItems="center">
        <Box
          sx={{
            marginTop: '1rem',
            padding: '1rem',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Killed Pieces (White)
          </Typography>
          {renderKilledPieces(TColor.WHITE)}
        </Box>
      </Grid>

      {/* Chessboard Grid */}
      <Grid item xs={8}>
        <Grid container>
          {Array.from({ length: 8 }, (_, row) => (
            <Grid container item key={row} justifyContent="center">
              {renderRow(row)}
            </Grid>
          ))}
        </Grid>
      </Grid>

      {/* Right Container for Killed Pieces */}
      <Grid item xs={2} container direction="column" alignItems="center">
        <Box
          sx={{
            marginTop: '1rem',
            padding: '1rem',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Killed Pieces (Black)
          </Typography>
          {renderKilledPieces(TColor.BLACK)}
        </Box>
      </Grid>
    </Grid>
  );
};

// Example component for displaying killed pieces
const KilledPiece: React.FC<{ color: TColor; type: PieceType | undefined; count: number }> = ({
  color,
  type,
  count,
}) => {
  return (
    <Box sx={{ marginBottom: '0.5rem' }}>
      {getPieceSticker(color, type)}
      <Typography variant="body1">{`${count}`}</Typography>
    </Box>
  );
};
