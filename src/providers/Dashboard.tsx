import { createContext, useState } from "react";

export interface Player {
    id: number;
    name: string;
}

interface DashboardContextProps {
    players: Player[];
    setPlayers: (players: Player[]) => void;
}

export const DashboardContext = createContext({} as DashboardContextProps);

export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
    const [players, setPlayers] = useState<Player[]>([]);
    
    return (
        <DashboardContext.Provider value={{ players, setPlayers }}>
            {children}
        </DashboardContext.Provider>
    );
}