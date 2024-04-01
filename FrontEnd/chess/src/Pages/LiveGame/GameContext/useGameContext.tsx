import { useContext } from "react"
import { GameDataContext } from ".";

export const useGameContext = () => {
    const context = useContext(GameDataContext);
    if(!context){
        console.log("Error in game context");
    }
    return context;
}