import { useEffect, useMemo, useState } from "react";
import { WebSocket } from "./WebScoket"
import { Client } from "@stomp/stompjs";

type WebSocketContextProviderProps = {
    children: React.ReactNode;
}

export const WebSocketContextProvider = ({
    children
} : WebSocketContextProviderProps) => {
    const client = useMemo(()=>{
        // Configure the WebSocket endpoint URL
        const xx = new Client();
        const websocketUrl = 'ws://localhost:8080/websocket'; // Replace with your WebSocket endpoint URL
    
        // Connect to the WebSocket server
        xx.configure({
          brokerURL: websocketUrl,
          debug: function (str:string) {
            console.log(str);
          },
          onConnect: () => {
            // Perform actions after successful connection
            console.log("Web socket created sucessfully");
          },
          // You can add more event handlers and configuration options as needed
        });
    
        // Connect to the WebSocket server
        xx.activate();
        return xx;
    },[]);
    return (
        <WebSocket.Provider value={{client:client}} >
            {children}
        </WebSocket.Provider>
    )
}