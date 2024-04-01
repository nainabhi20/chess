import { GameStatus } from "../../../Type";
export type GameContext = {
    gameDetails: GameDetail | null | undefined;
    selectedBox: number | undefined;
    updateSelectedBox: (e:number | undefined) => void;
    possibleMoveOfSelectedPiece: number[];
    updatePossibleMoveOfSelectedPiece: (e: number[]) => void;
    sendMessage: (destination: string, body: any) => void;
    userId: number | undefined;
}

export enum TColor {
    BLACK,
    WHITE,
}

export type GameDetail = {
    id: number;
    whitePlayerUserId: number;
    blackPlayerUserId: number;
    currentPlayerTurn: TColor;
    gameStatus: GameStatus;
    board: Board;
    moves: Move[];
}

export type Board = {
    boxes: TBox[];
}

export type TBox = {
    coordinates: string;
    pieceResponse: Piece | null;
}

export type Move = {
    from: string;
    to: string;
    piece: Piece;
}

type Piece = {
    type: PieceType;
    color: TColor;
}

export type MoveRequestBody = {
    fromCoordinates: string;
    toCoordinates: string;
}

export enum PieceType {
    PAWN,
    ROOK,
    BISHOP,
    KING,
    QUEEN,
    KNIGHT,
}