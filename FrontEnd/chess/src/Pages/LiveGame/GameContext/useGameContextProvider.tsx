import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { BASE_URL, GET_GAME_BY_ID } from "../../../Constants";
import { convertToBearerToken } from "../../../Utils";
import { GameDetail, Move, MoveRequestBody, PieceType, TBox, TColor } from "./ContextType";
import { convertStringToPiecesType } from "../../../Utils/enumConversion";
import { useWebSocketContext } from "../../../Context";
import { coordinatesToIndex, getUserIdFromToken } from "../Utils/gameUtils";
import { useParams } from "react-router-dom";

export const useGameContextProvider = () => {
    const [gameData, setGameData] = useState<GameDetail | null>();
    const [selectedBox, setSelectedBox] = useState<number | undefined>();
    const [possibleMoveOfSelectedPiece, setPossibleMoveOfSelectedPiece] = useState<number[]>([]);
    const [cookies] = useCookies();
    const token = cookies.token;
    const { gameId } = useParams();
    const tokenpayload = getUserIdFromToken(token);
    const userId : number | undefined = (tokenpayload?.sub) ? parseInt(tokenpayload?.sub) : undefined;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = BASE_URL + GET_GAME_BY_ID.replace("{id}", ''+gameId);
                const response = await axios.get(url, {
                    headers: {
                        Authorization: convertToBearerToken(token)
                    }
                });

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
    useEffect(()=>{
        if(websocketClient.connected){
            websocketClient.subscribe(`/topic/game/${gameData?.id}`,(message:any)=>{
                console.log(message.body);
                let newMove: Move = JSON.parse(message.body);
                let fromIndex = coordinatesToIndex(newMove.from);
                let toIndex = coordinatesToIndex(newMove.to);
                let newArr = gameData?.board.boxes;
                if(!newArr) return;
                newArr[toIndex].pieceResponse = newArr[fromIndex].pieceResponse;
                newArr[fromIndex].pieceResponse = null;
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

    return {
        gameData,
        selectedBox,
        updateSelectedBox,
        possibleMoveOfSelectedPiece,
        updatePossibleMoveOfSelectedPiece,
        sendMessage,
        userId
    }
};
