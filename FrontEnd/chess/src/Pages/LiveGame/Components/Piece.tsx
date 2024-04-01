import React from 'react';
import { PieceType, TColor } from '../GameContext/ContextType';
import PossibleMoveRing from './PossibleMoveRing';
import { useGameContext } from '../GameContext/useGameContext';

// Enumeration for color of the piece

// Enumeration for type of the piece

interface PieceProps {
  color: TColor | undefined;
  type: PieceType | undefined;
  boxIndex: number;
}

function Piece({ color, type, boxIndex }: PieceProps): JSX.Element {
  // Function to get the sticker for the piece based on color and type
  const gameContext = useGameContext();
  const getPieceSticker = (color: TColor | undefined, type: PieceType | undefined): string => {
    switch (color) {
      case TColor.WHITE:
        switch (type) {
          case PieceType.KING:
            return '♔'; // White king
          case PieceType.QUEEN:
            return '♕'; // White queen
          case PieceType.ROOK:
            return '♖'; // White rook
          case PieceType.BISHOP:
            return '♗'; // White bishop
          case PieceType.KNIGHT:
            return '♘'; // White knight
          case PieceType.PAWN:
            return '♙'; // White pawn
        }
        break;
      case TColor.BLACK:
        switch (type) {
          case PieceType.KING:
            return '♚'; // Black king
          case PieceType.QUEEN:
            return '♛'; // Black queen
          case PieceType.ROOK:
            return '♜'; // Black rook
          case PieceType.BISHOP:
            return '♝'; // Black bishop
          case PieceType.KNIGHT:
            return '♞'; // Black knight
          case PieceType.PAWN:
            return '♟'; // Black pawn
        }
        break;
    }
    return '';
  };

  // Determine the style based on the color
  const pieceStyle: React.CSSProperties = {
    color: color === TColor.BLACK ? 'black' : 'inherit',
    fontSize: '2rem'
  };

  return <div style={pieceStyle}>
    <PossibleMoveRing borderRGBA={gameContext?.selectedBox && gameContext.possibleMoveOfSelectedPiece.includes(boxIndex) ? '0.1' : '0'} >
    {getPieceSticker(color, type)}
    </PossibleMoveRing>
  </div>;
}

export default Piece;
