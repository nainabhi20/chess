import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { BASE_URL, GET_GAME_BY_ID } from "../../../Constants";
import { convertToBearerToken } from "../../../Utils";
import { GameDetail, KilledPieces, Move, PieceType, TColor } from "./ContextType";
import { convertStringToPiecesType } from "../../../Utils/enumConversion";
import { useWebSocketContext } from "../../../Context";
import { coordinatesToIndex, getUserIdFromToken } from "../Utils/gameUtils";
import { useParams } from "react-router-dom";

export const useGameContextProvider = () => {

    const [gameData, setGameData] = useState<GameDetail | null>();
    const [selectedBox, setSelectedBox] = useState<number | undefined>();
    const [possibleMoveOfSelectedPiece, setPossibleMoveOfSelectedPiece] = useState<number[]>([]);
    const [blackKilledPieces, setBlackKilledPiecs] = useState<KilledPieces | undefined>();
    const [whiteKilledPieces, setWhiteKilledPiecs] = useState<KilledPieces | undefined>();

    const [cookies] = useCookies();
    const token = cookies.token;
    const { gameId } = useParams();
    const tokenpayload = getUserIdFromToken(token);
    const userId : number | undefined = (tokenpayload?.sub) ? parseInt(tokenpayload?.sub) : undefined;
    console.log(gameData?.currentPlayerTurn);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = BASE_URL + GET_GAME_BY_ID.replace("{id}", ''+gameId);
                const response = await axios.get(url, {
                    headers: {
                        Authorization: convertToBearerToken(token)
                    }
                });
                let blackKilledPiece = {
                    [PieceType.BISHOP] : 0,
                    [PieceType.KING] : 0,
                    [PieceType.KNIGHT] : 0,
                    [PieceType.PAWN] : 0,
                    [PieceType.QUEEN] : 0,
                    [PieceType.ROOK] : 0,
                }
                let whiteKilledPiece = {
                    [PieceType.BISHOP] : 0,
                    [PieceType.KING] : 0,
                    [PieceType.KNIGHT] : 0,
                    [PieceType.PAWN] : 0,
                    [PieceType.QUEEN] : 0,
                    [PieceType.ROOK] : 0,
                }
                response.data.moves.forEach((move : any)=>{
                    console.log(move);

                    if(move.pieceResponse){
                        let sss : PieceType | undefined = convertStringToPiecesType(move.pieceResponse.type);
                        if(move.pieceResponse.color === "WHITE"){
                            if(sss)
                            whiteKilledPiece[sss]++;
                        }else{
                            if(sss)
                            blackKilledPiece[sss]++;
                        }
                    }
                })

                if (response.data) {
                    const updatedGameData: GameDetail = {
                        ...response.data,
                        currentPlayerTurn: response.data.currentPlayerTurn === "BLACK" ? TColor.BLACK : TColor.WHITE,
                        board: {
                            ...response.data.board,
                            boxes: response.data.board.boxes.map((box: any) => ({
                                ...box,
                                pieceResponse: box.pieceResponse ? {
                                    ...box.pieceResponse,
                                    color: box.pieceResponse.color === "BLACK" ? TColor.BLACK : TColor.WHITE,
                                    type: box.pieceResponse.type ? convertStringToPiecesType(box.pieceResponse.type) : null
                                } : null
                            }))
                        }
                    };
                    setBlackKilledPiecs(blackKilledPiece);
                    setWhiteKilledPiecs(whiteKilledPiece);
                    setGameData(updatedGameData);
                } else {
                    console.error("Invalid data structure received from API");
                }
            } catch (error) {
                console.error("Error fetching game data:", error);
            }
        };

        fetchData();
    }, []);

    const websocketClient = useWebSocketContext()?.client;
    const sendMessage = (destination : string, body: any) => {
        websocketClient.publish({
        destination: destination, // Server destination to handle the message
        body: JSON.stringify(body), // Message payload
        });
    };
    console.log(websocketClient);
    console.log(whiteKilledPieces);
    useEffect(()=>{
        if(websocketClient.connected){
            websocketClient.subscribe(`/topic/game/${gameData?.id}`,(message:any)=>{
                console.log(message.body);
                let data = JSON.parse(message.body);
                let newMove : Move = data;

                let fromIndex = coordinatesToIndex(newMove.from);
                let toIndex = coordinatesToIndex(newMove.to);
                let newArr = gameData?.board.boxes;
                if(!newArr) return;
                newArr[toIndex].pieceResponse = newArr[fromIndex].pieceResponse;
                newArr[fromIndex].pieceResponse = null;
                console.log(data);
                if(data.pieceResponse){
                if(data.pieceResponse.color == "WHITE"){
                    newMove.pieceResponse.color = TColor.WHITE;
                }else{
                    newMove.pieceResponse.color = TColor.WHITE
                }
                let type_from_message : PieceType | undefined = convertStringToPiecesType(data.pieceResponse.type);
                if(type_from_message) newMove.pieceResponse.type = type_from_message;
                if(newMove.pieceResponse){
                    if(newMove.pieceResponse.color === TColor.WHITE){
                        setWhiteKilledPiecs((prev : KilledPieces | undefined)=>{
                            if(!prev) return prev;
                            return {
                                ...prev,
                                [newMove.pieceResponse.type] : prev[newMove.pieceResponse.type] + 1,
                            }
                        })
                    }else{

                    }
                }
            }
                setGameData((prev) => {
                    if(!prev) return null;
                    const newState : GameDetail = {
                        ...prev,
                        currentPlayerTurn: prev.currentPlayerTurn === TColor.BLACK ? TColor.WHITE : TColor.BLACK,
                        moves: [...prev.moves, newMove],
                        board:{
                            ...prev.board,
                            boxes: newArr ? newArr : []
                        }
                    }
                    return newState;
                });
                updateSelectedBox(undefined);
            });
        }
    },[websocketClient.connected])

    const updateSelectedBox = (index : number | undefined) => {
        setSelectedBox(index);
    }
    const updatePossibleMoveOfSelectedPiece = (arr : number[]) => {
        setPossibleMoveOfSelectedPiece(arr);
    }
    const updateBlackKilledPieces = (obj : KilledPieces) => {
        setBlackKilledPiecs(obj);
    }
    const updateWhiteKilledPieces = (obj : KilledPieces) => {
        setWhiteKilledPiecs(obj);
    }

    return {
        gameData,
        selectedBox,
        updateSelectedBox,
        possibleMoveOfSelectedPiece,
        updatePossibleMoveOfSelectedPiece,
        sendMessage,
        userId,
        whiteKilledPieces,
        blackKilledPieces,
        updateBlackKilledPieces,
        updateWhiteKilledPieces,
    }
};
