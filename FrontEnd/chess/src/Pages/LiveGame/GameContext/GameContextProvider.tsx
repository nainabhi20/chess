import { useCookies } from "react-cookie";
import { useGameContextProvider } from "./useGameContextProvider";
import { GameDataContext } from ".";

type GameContextProviderProps = {
  children: React.ReactNode;
};

export const GameContextProvider = ({ children }: GameContextProviderProps) => {
  const {
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
  } = useGameContextProvider();
  return (
    <GameDataContext.Provider
      value={{
        gameDetails: gameData,
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
      }}
    >
      {children}
    </GameDataContext.Provider>
  );
};
