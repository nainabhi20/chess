import React from 'react';
import { GameContext } from './ContextType';

export const GameDataContext = React.createContext<GameContext | null>(null);