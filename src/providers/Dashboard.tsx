import { createContext, useContext, useState } from "react";

export interface Player {
    id: number;
    avatar: string;

    firstName: string;
    lastName: string;
    sex: "M" | "F";

    phone: string;
    steam: string;
    rg: string;

    bank: string;
    groups?: Group[];
}

export interface Group {
    name: string;
}

export interface Vehicle {
    id: string;
    name: string;
}

interface DashboardContextProps {
    currentPlayer: Player;
    players: Player[];
    vehicles: Vehicle[];
    setCurrentPlayer: (player: Player) => void;
    setPlayers: (players: Player[]) => void;
    setVehicles: (vehicles: Vehicle[]) => void;
}

export const DashboardContext = createContext({} as DashboardContextProps);

export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [currentPlayer, setCurrentPlayer] = useState<Player>({} as Player);

    const value = {
        players,
        setPlayers,
        currentPlayer,
        setCurrentPlayer,
        vehicles,
        setVehicles
    };

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
}

export const useDashboard = () => {
    return useContext(DashboardContext);
}