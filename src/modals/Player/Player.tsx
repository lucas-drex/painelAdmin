import { Player as P } from "../../providers/Dashboard";
import "./styles.css"

export default function Player({ player }: { player: P }) {
    const defaultAvatar = "https://cdn.discordapp.com/attachments/837059221543190590/1246175803520061470/no-avatar.png?ex=665b6f28&is=665a1da8&hm=3433771a408017e099cd23901bc35989aac9b89fe8830932e05d78575ef071dd&";

    const { id, avatar, firstName, lastName, bank, steam } = player; 

    return (
        <div className="modal-container">
            <div className="player-banner">
                <img
                    src={avatar || defaultAvatar}
                    className="banner"
                    alt="Banner do Jogador"
                />
            </div>

            <div className="player-details">
                <div className="player-info">
                    <img
                        src={avatar || defaultAvatar}
                        className="player-avatar"
                        alt="Avatar do Jogador"
                    />

                    <div className="player-account">
                        <h1 className="player-name">{firstName} {lastName}</h1>
                        <p className="player-steam">
                            <span>steam:</span>
                            <span
                                className="value invisible"
                                onClick={(event) => {
                                    const target = event.target as HTMLSpanElement;

                                    if (target.classList.contains('invisible')) {
                                        target.classList.remove("invisible");
                                    } else {
                                        target.classList.add("invisible");
                                    }
                                }}
                            >{steam}</span>
                        </p>
                    </div>
                </div>

                <div className="player-categories__container">
                    <div className="player-categories">
                        <div className="player-category">
                            <p>Cargos</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}