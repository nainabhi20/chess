import { PieceType } from "../Pages/LiveGame/GameContext/ContextType";


// Function to convert string to enum
export function convertStringToPiecesType(value: string): PieceType | undefined {
    switch(value) {
        case 'PAWN':
            return PieceType.PAWN;
        case 'KNIGHT':
            return PieceType.KNIGHT;
        case 'BISHOP':
            return PieceType.BISHOP;
        case 'ROOK':
            return PieceType.ROOK;
        case 'QUEEN':
            return PieceType.QUEEN;
        case 'KING':
            return PieceType.KING;
        default:
            return undefined; // or throw an error, depending on your use case
    }
}
