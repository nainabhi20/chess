import { GameDetail, PieceType, TColor } from "../GameContext/ContextType";
import { jwtDecode } from 'jwt-decode';

export const getPossibleMove = (gameDetail: GameDetail, selectedIndex: number): number[] => {
    const boardSize = 8; // Assuming 8x8 board

    // Get row and column from selectedIndex
    const row = Math.floor(selectedIndex / boardSize);
    const col = selectedIndex % boardSize;

    // Initialize array to store possible moves
    const possibleMoves: number[] = [selectedIndex];

    // Get the selected piece
    const selectedPiece = gameDetail.board.boxes[selectedIndex].pieceResponse;

    // Function to check if the move is valid and within board boundaries
    const isValidMove = (row: number, col: number): boolean => {
        return row >= 0 && row < boardSize && col >= 0 && col < boardSize;
    };

    // Calculate possible moves based on piece type
    switch (selectedPiece?.type) {
        case PieceType.PAWN:
            // Implement logic for pawn movement
            const direction = selectedPiece.color === TColor.WHITE ? -1 : 1;
            const forwardOne = selectedIndex + direction * boardSize;
            if (isValidMove(row + direction, col) && !gameDetail.board.boxes[forwardOne].pieceResponse) {
                possibleMoves.push(forwardOne);
            }
            const forwardTwo = forwardOne + direction * boardSize;
            if (row === (selectedPiece.color === TColor.WHITE ? 6 : 1) && !gameDetail.board.boxes[forwardTwo].pieceResponse) {
                possibleMoves.push(forwardTwo);
            }
            // Implement logic for capturing diagonally
            const diagonalMoves = [selectedIndex + direction * boardSize - 1, selectedIndex + direction * boardSize + 1];
            diagonalMoves.forEach((diagonalIndex) => {
                if (isValidMove(Math.floor(diagonalIndex / boardSize), diagonalIndex % boardSize)) {
                    const diagonalPiece = gameDetail.board.boxes[diagonalIndex].pieceResponse;
                    if (diagonalPiece && diagonalPiece.color !== selectedPiece.color) {
                        possibleMoves.push(diagonalIndex);
                    }
                }
            });
            break;
        case PieceType.ROOK:
            // Implement logic for rook movement
            // Check horizontally
            for (let i = 0; i < boardSize; i++) {
                if (i !== col) {
                    const index = row * boardSize + i;
                    if (!gameDetail.board.boxes[index].pieceResponse) {
                        possibleMoves.push(index);
                    } else if (gameDetail.board.boxes[index].pieceResponse?.color !== selectedPiece.color) {
                        possibleMoves.push(index);
                        break;
                    } else {
                        break;
                    }
                }
            }
            // Check vertically
            for (let i = 0; i < boardSize; i++) {
                if (i !== row) {
                    const index = i * boardSize + col;
                    if (!gameDetail.board.boxes[index].pieceResponse) {
                        possibleMoves.push(index);
                    } else if (gameDetail.board.boxes[index].pieceResponse?.color !== selectedPiece.color) {
                        possibleMoves.push(index);
                        break;
                    } else {
                        break;
                    }
                }
            }
            break;
        case PieceType.BISHOP:
            // Implement logic for bishop movement
            // Check diagonally
            const diagonals = [
                [-1, -1], [-1, 1], [1, -1], [1, 1]
            ];
            diagonals.forEach((diagonal) => {
                let [dx, dy] = diagonal;
                let i = row + dx;
                let j = col + dy;
                while (isValidMove(i, j)) {
                    const index = i * boardSize + j;
                    if (!gameDetail.board.boxes[index].pieceResponse) {
                        possibleMoves.push(index);
                    } else if (gameDetail.board.boxes[index].pieceResponse?.color !== selectedPiece.color) {
                        possibleMoves.push(index);
                        break;
                    } else {
                        break;
                    }
                    i += dx;
                    j += dy;
                }
            });
            break;
        case PieceType.KING:
            // Implement logic for king movement
            const kingMoves = [
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1], [0, 1],
                [1, -1], [1, 0], [1, 1]
            ];
            kingMoves.forEach((move) => {
                const [dx, dy] = move;
                const i = row + dx;
                const j = col + dy;
                if (isValidMove(i, j) && (!gameDetail.board.boxes[i * boardSize + j].pieceResponse || gameDetail.board.boxes[i * boardSize + j].pieceResponse?.color !== selectedPiece.color)) {
                    possibleMoves.push(i * boardSize + j);
                }
                if (isValidMove(i, j) && (!gameDetail.board.boxes[i * boardSize + j].pieceResponse || gameDetail.board.boxes[i * boardSize + j].pieceResponse?.color !== selectedPiece.color)) {
                    possibleMoves.push(i * boardSize + j);
                }
            });
            break;
        case PieceType.QUEEN:
            // Implement logic for queen movement (combines rook and bishop movements)
            // Check horizontally
            for (let i = 0; i < boardSize; i++) {
                if (i !== col) {
                    const index = row * boardSize + i;
                    if (!gameDetail.board.boxes[index].pieceResponse) {
                        possibleMoves.push(index);
                    } else if (gameDetail.board.boxes[index].pieceResponse?.color !== selectedPiece.color) {
                        possibleMoves.push(index);
                        break;
                    } else {
                        break;
                    }
                }
            }
            // Check vertically
            for (let i = 0; i < boardSize; i++) {
                if (i !== row) {
                    const index = i * boardSize + col;
                    if (!gameDetail.board.boxes[index].pieceResponse) {
                        possibleMoves.push(index);
                    } else if (gameDetail.board.boxes[index].pieceResponse?.color !== selectedPiece.color) {
                        possibleMoves.push(index);
                        break;
                    } else {
                        break;
                    }
                }
            }
            // Check diagonally
            const diagonalDirections = [
                [-1, -1], [-1, 1], [1, -1], [1, 1]
            ];
            diagonalDirections.forEach((diagonal) => {
                let [dx, dy] = diagonal;
                let i = row + dx;
                let j = col + dy;
                while (isValidMove(i, j)) {
                    const index = i * boardSize + j;
                    if (!gameDetail.board.boxes[index].pieceResponse) {
                        possibleMoves.push(index);
                    } else if (gameDetail.board.boxes[index].pieceResponse?.color !== selectedPiece.color) {
                        possibleMoves.push(index);
                        break;
                    } else {
                        break;
                    }
                    i += dx;
                    j += dy;
                }
            });
            break;
        case PieceType.KNIGHT:
            // Implement logic for knight movement
            const knightMoves = [
                [-2, -1], [-2, 1], [-1, -2], [-1, 2],
                [1, -2], [1, 2], [2, -1], [2, 1]
            ];
            knightMoves.forEach((move) => {
                const [dx, dy] = move;
                const i = row + dx;
                const j = col + dy;
                if (isValidMove(i, j) && (!gameDetail.board.boxes[i * boardSize + j].pieceResponse || gameDetail.board.boxes[i * boardSize + j].pieceResponse?.color !== selectedPiece.color)) {
                    possibleMoves.push(i * boardSize + j);
                }
            });
            break;
        default:
            break;
    }

    // Return the array of possible moves
    return possibleMoves;
};

export const getIndexToCoordinates = (index : number) => {
    const row = String.fromCharCode('A'.charCodeAt(0) + Math.floor(index / 8));
    const column = (index % 8) + 1;
    return row + column;
}

export function coordinatesToIndex(coordinates:string) {
    const rowChar = coordinates.charAt(0);
    const column = parseInt(coordinates.substring(1)) - 1; // Subtract 1 to convert from 1-based to 0-based indexing
    const row = rowChar.charCodeAt(0) - 'A'.charCodeAt(0); // Convert row character to zero-based index
    // Calculate the index based on row and column
    const index = row * 8 + column; // Assuming an 8x8 board

    return index;
}

export const getUserIdFromToken = (token:string) => {
    try {
      const decoded = jwtDecode(token);
      console.log(decoded);
      return decoded;
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };