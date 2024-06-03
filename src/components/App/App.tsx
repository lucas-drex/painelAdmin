import { useEffect, useState } from "react";

import { fetchNui } from "../../utils/fetchNui";
import { useNuiEvent } from "../../hooks/useNuiEvent";

import { Player, Vehicle, useDashboard } from "../../providers/Dashboard";
import { useRouter } from "../../providers/Router";

import PlayerModal from "../../modals/Player/Player"

import "./App.css";

type HeaderProps = {
    route: string[];
    setTabletOpen: (open: boolean) => void;
};

function Header({ route, setTabletOpen }: HeaderProps) {
    const [searchText, setSearchText] = useState<string>("");

    const { setCurrentPlayer, currentPlayer, setPlayers, players, setVehicles, vehicles } = useDashboard();
    const { to, modal } = useRouter()

    const filteredPlayers = players
        .filter((player) =>
            `${player.firstName} ${player.lastName} (#${player.id})`.toLowerCase().includes(searchText.toLowerCase())
        )
        .slice(0, 7);

    const filteredVehicles = vehicles
        .filter((vehicle) =>
            `${vehicle.name} ${vehicle.id}`.toLowerCase().includes(searchText.toLowerCase())
        )
        .slice(0, 5);


    return (
        <header className="header-tablet">
            <div className="header-tablet__content">
                <h1 className="header-tablet__title">Painel de controle</h1>
                <p className="header-tablet__route">
                    {route.map((item, index) => (
                        <span key={index}>{item} / </span>
                    ))}
                </p>
            </div>

            <div className="search-container">
                <div className="input-container">
                    <input
                        className="input"
                        type="text"
                        placeholder="Pesquisar (Ctrl + K)"
                        onInput={(e) => setSearchText(e.currentTarget.value)}
                    />
                </div>

                {searchText && (
                    <div className="search-results">
                        <div className="search-results__content">

                            <div className="search-results__category">
                                <p className="search-results__title">Jogadores</p>
                                {filteredPlayers.length === 0 ? (
                                    <p className="search-results__no-results">Nenhum resultado encontrado</p>
                                ) : (
                                    filteredPlayers.map((player) => (
                                        <div className="search-results__item" key={player.id} onClick={() => modal(<PlayerModal player={player} />)}>
                                            <img
                                                className="search-results__item-avatar"
                                                src={player.avatar || "https://cdn.discordapp.com/attachments/837059221543190590/1246175803520061470/no-avatar.png?ex=665b6f28&is=665a1da8&hm=3433771a408017e099cd23901bc35989aac9b89fe8830932e05d78575ef071dd&"}
                                                alt="Avatar do jogador"
                                                onError={(e) => (e.currentTarget.src = "https://cdn.discordapp.com/attachments/837059221543190590/1245484879379169290/944a315051a548ae94a655ff62f0e665_1.png?ex=6658ebaf&is=66579a2f&hm=2271ba4761467219a05b1d5c99a6df8fc62220a0a6794e2785be33f99725b21f&")}
                                            />
                                            <div className="search-results__item-info">
                                                <p className="search-results__item-name">
                                                    {player.firstName} {player.lastName} (#{player.id})
                                                </p>
                                                <p className="search-results__item-rg">{player.rg}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="search-results__category">
                                <p className="search-results__title">Veiculos</p>
                                {!filteredVehicles || filteredVehicles.length === 0 ? (
                                    <p className="search-results__no-results">Nenhum resultado encontrado</p>
                                ) : (
                                    filteredVehicles.map((vehicle) => (
                                        <div
                                            className="search-results__item"
                                            key={vehicle.id}
                                            onClick={() => {
                                                fetchNui("spawnVehicle", vehicle.id).then(() => {
                                                    setTabletOpen(false)
                                                    fetchNui("closeTablet");
                                                });
                                            }}
                                        >
                                            <img
                                                className="search-results__item-avatar"
                                                src={"https://cdn.discordapp.com/attachments/837059221543190590/1245815843313418281/31004a-20191227235951_1.jpg?ex=665a1feb&is=6658ce6b&hm=771d0bd3ae755f9048e618bfcbaf30375897e6ca3a06a421737bc8d3e561cbf6&"}
                                                alt="Avatar do jogador"
                                            />
                                            <div className="search-results__item-info">
                                                <p className="search-results__item-name">
                                                    {vehicle.name}
                                                </p>
                                                <p className="search-results__item-rg">{vehicle.id}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="header-tablet__actions">
                <div className="header-tablet__notifications">
                    <i className='bx bxs-bell'></i>
                </div>

                <div className="header-tablet__user">
                    <img
                        src={currentPlayer?.avatar || "https://cdn.discordapp.com/attachments/837059221543190590/1245484879379169290/944a315051a548ae94a655ff62f0e665_1.png?ex=6658ebaf&is=66579a2f&hm=2271ba4761467219a05b1d5c99a6df8fc62220a0a6794e2785be33f99725b21f&"}
                        alt="Avatar do jogador"
                        className="header-tablet__user-avatar"
                        onError={(e) => (e.currentTarget.src = "https://cdn.discordapp.com/attachments/837059221543190590/1245484879379169290/944a315051a548ae94a655ff62f0e665_1.png?ex=6658ebaf&is=66579a2f&hm=2271ba4761467219a05b1d5c99a6df8fc62220a0a6794e2785be33f99725b21f&")}
                    />
                    <div className={`header-tablet__user-info ${currentPlayer?.firstName ? "" : "loading"}`}>
                        {currentPlayer?.firstName && (
                            <>
                                <p className="header-tablet__user-name">
                                    {currentPlayer.firstName} {currentPlayer.lastName}
                                </p>
                                <p className="header-tablet__user-rg">
                                    <label>RG: </label> {currentPlayer.rg}
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default function App() {
    const [tabletOpen, setTabletOpen] = useState<boolean>(false);

    const { setCurrentPlayer, setPlayers, setVehicles, vehicles, players } = useDashboard();
    const { componentRoute, to, modalComponent, modal } = useRouter()

    useNuiEvent<boolean>("openTablet", (toogled) => setTabletOpen(toogled));
    useNuiEvent<any>("dataPlayer", (data) => {
        setCurrentPlayer({
            id: data.id,
            sex: data.sex,
            rg: data.serial,
            avatar: data.photo,
            firstName: data.name,
            lastName: data.name2,
            phone: data.phone,
            steam: data.steam,
            bank: data.bank,
        });
    });

    useEffect(() => {
        if (tabletOpen) {
            if (players.length == 0) {
                fetchNui("dataPlayers")
                    .then((data: any[]) => {
                        const allPlayers: Player[] = data.map((player) => ({
                            id: player.id,
                            sex: player.sex,
                            rg: player.serial,
                            avatar: player.photo,
                            firstName: player.name,
                            lastName: player.name2,
                            phone: player.phone,
                            steam: player.steam,
                            bank: player.bank,
                        }));
                        setPlayers(allPlayers);
                    });
            }

            if (vehicles.length == 0) {
                fetchNui("dataVehicles").then((data: any) => {
                    const allVehicles: Vehicle[] = Object.entries(data)
                        .filter(([k, vehicleData]: any) => k != undefined && vehicleData[0] != undefined)
                        .map(([k, vehicleData]: any) => ({
                            id: k,
                            name: vehicleData[0]
                        }));

                    setVehicles(allVehicles);
                });
            }
        }
    }, [tabletOpen, setPlayers]);

    useEffect(() => {
        window.addEventListener("keydown", (event) => {
            if (event.ctrlKey && event.keyCode == 75) { // Ctrl + K
                const searchInput = document.querySelector(".search-container .input-container .input") as HTMLInputElement;
                searchInput.focus()
            }

            if (event.code == "Escape") {
                console.log(modalComponent)
                console.log(modalComponent != null)
                if (modalComponent != null) {
                    modal(null)
                } else {
                    setTabletOpen(false)
                    fetchNui("closeTablet");
                }
            }
        })
    }, [modalComponent]);

    const route = ["Principal", "Dashboard"];

    if (!tabletOpen) {
        return null;
    }

    return (
        <div className="tablet">
            {modalComponent && (
                <div className="modal">
                    {modalComponent}
                </div>
            )}

            <div className="screen-tablet">
                <nav className="navbar-tablet">
                    {/* Navegação */}
                </nav>
                <div className="body-tablet">
                    <Header route={route} setTabletOpen={setTabletOpen} />

                    <div className="page-content">
                        {componentRoute}
                    </div>
                </div>
            </div>
        </div>
    );
}
