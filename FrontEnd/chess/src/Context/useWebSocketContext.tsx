import { useContext } from "react"
import { WebSocket } from "./WebScoket";

export const useWebSocketContext = () => {
    const context = useContext(WebSocket);
    if(!context){
        console.log("Error in web socket context");
    }
    return context;
}