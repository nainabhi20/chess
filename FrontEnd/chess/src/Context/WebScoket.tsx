import React from 'react';

type WebSocketContextType = {
  client: any;
}

export const WebSocket = React.createContext<WebSocketContextType | null>(null);