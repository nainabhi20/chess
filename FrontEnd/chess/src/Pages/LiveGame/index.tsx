import { Box } from "@mui/material"
import { Board } from "./Components/Board"
import { GameContextProvider } from "./GameContext/GameContextProvider"
import { CuttedPieces } from "./Components/cuttedPieces"

export const LiveGame = () => {
    return (
        <GameContextProvider>
            <Box 
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'space-between',
                }}
            >
                <CuttedPieces/>
                <Board/>
            </Box>
        </GameContextProvider>
    )
}