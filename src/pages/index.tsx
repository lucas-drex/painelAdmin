import { useDashboard } from "../providers/Dashboard"
import { useRouter } from "../providers/Router"

import Player from "../modals/Player/Player"

import "./styles.css";

export default function Home() {
  const { players } = useDashboard();
  const { modal } = useRouter();

  return <div className="container-players__list">
    <div></div>

    <table className="table-players">
      <thead>
        <tr>
          <th>ID</th>
          <th>Jogador</th>
          <th>RG</th>
          <th>Steam</th>
          <th>Celular</th>
          <th>Banco</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {
          players.map((player) => (
            <tr>
              <td className="player-id">#{player.id}</td>
              <td>
                <div className="player-mention">
                  <img
                    src={player.avatar || "https://cdn.discordapp.com/attachments/837059221543190590/1246175803520061470/no-avatar.png?ex=665b6f28&is=665a1da8&hm=3433771a408017e099cd23901bc35989aac9b89fe8830932e05d78575ef071dd&"}
                    className="player-avatar"
                    alt="Avatar do jogador"
                  />

                  <span>@{player.firstName.toLowerCase()}{player.lastName.toLowerCase()}</span>
                </div>
              </td>
              <td className="player-rg">{player.rg}</td>
              <td className="player-steam">{player.steam}</td>
              <td className="player-phone">{player.phone}</td>
              <td className="player-bank">{Number(player.bank).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
              <td>
                <div className="player-actions">
                  <i itemID="view" className='bx bxs-show' onClick={() => modal(<Player player={player} />)}></i>
                  <i itemID="edit" className='bx bxs-edit'></i>
                  <i itemID="trash" className='bx bx-trash'></i>
                </div>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
}