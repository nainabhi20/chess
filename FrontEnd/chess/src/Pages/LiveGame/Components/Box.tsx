import { Box, Grid } from "@mui/material"
import Piece from "./Piece";
import { SquareColor } from "./Board";
import { useGameContext } from "../GameContext/useGameContext";
import { getIndexToCoordinates, getPossibleMove } from "../Utils/gameUtils";
import { useWebSocketContext } from "../../../Context";
import { MoveRequestBody, TColor } from "../GameContext/ContextType";

export type Coordinates = {
    row: number;
    col: number;
}
export const BoardBox = ({
row,col
}: Coordinates) => {
    const lightColor = '#f0d9b5';
    const darkColor = '#b58863';
    const gameContext = useGameContext();
    const piece = gameContext?.gameDetails?.board?.boxes[row*8+col];
    // console.log(row)
    const getSquareColor = (row: number, col: number): SquareColor => {
        return (row + col) % 2 === 0 ? 'light' : 'dark';
      };
    const color = getSquareColor(row, col);
    const backgroundColor = color === 'light' ? lightColor : darkColor;
    const cursor = piece?.pieceResponse ? 'pointer' : 'default';
    const websocketClient = useWebSocketContext()?.client;

    const clickHandler = (e:any) => {

        const isPlayerWhite = gameContext?.userId === gameContext?.gameDetails?.whitePlayerUserId;
        let isPlayerTurn;
        if(isPlayerWhite){
            isPlayerTurn = gameContext?.gameDetails?.currentPlayerTurn === TColor.WHITE;
        }else{
            isPlayerTurn = gameContext?.gameDetails?.currentPlayerTurn === TColor.BLACK;
        }
        if(gameContext?.selectedBox == undefined){
            if(piece?.pieceResponse){
                let canMovePiece = false;
                if(isPlayerWhite){
                    if(piece.pieceResponse.color === TColor.WHITE) canMovePiece = true;
                }else{
                    if(piece.pieceResponse.color === TColor.BLACK) canMovePiece = true;
                }
                if(canMovePiece){
                    const gameDeatil = gameContext?.gameDetails;
                    if(gameDeatil == null || gameDeatil == undefined) return;
                    gameContext?.updateSelectedBox(row*8+col);
                    gameContext?.updatePossibleMoveOfSelectedPiece(getPossibleMove(gameDeatil, row*8+col));
                }
            }
        }else{
            if(gameContext.possibleMoveOfSelectedPiece.includes(row*8+col) && isPlayerTurn){
                const body : MoveRequestBody = {
                    fromCoordinates: getIndexToCoordinates(gameContext.selectedBox),
                    toCoordinates: getIndexToCoordinates(row*8+col),
                }
                const url = `/app/game/${gameContext.gameDetails?.id}`;
                gameContext.sendMessage(url, body);
            }else{
                gameContext?.updateSelectedBox(undefined);
                gameContext?.updatePossibleMoveOfSelectedPiece([]);
            }
        }
    }

    return (
        <Box
         sx = {{cursor: cursor}}
         onClick = {clickHandler}
          >
            <Grid item key={`${row}-${col}`} style={{ backgroundColor, height: 60, width: 60 }}>
                {piece && <Piece boxIndex={row*8+col} color={piece?.pieceResponse?.color} type={piece?.pieceResponse?.type} />}
            </Grid>
        </Box>
    )
}