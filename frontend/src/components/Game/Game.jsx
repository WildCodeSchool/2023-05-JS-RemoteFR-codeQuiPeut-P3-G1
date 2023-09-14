import React from "react"

import "./Game.scss"

export default function Game({ games, users, rpg }) {
  // Convertir la date au format souhaité
  const formattedDate = new Date(games.schedule).toLocaleString("en-EN", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })

  // jointure à faire pour chopper l'info directement en Back
  const nameOfRpg = rpg.find(
    (typeRpg) => typeRpg.id === games.role_playing_game_id
  )

  return (
    <>
      <div className="globalContainerCard">
        <div className="boxGameCard">{games.guild_name}</div>
        <div className="boxGameCard">{games.gm_username}</div>
        <div className="boxGameCard">{formattedDate}</div>
        <div className="boxGameCard">
          {games.city !== "" ? games.city : "Remote"}
        </div>
        <div className="boxGameCard">
          {/* {games.role_playing_game_id} */}
          {nameOfRpg ? `${nameOfRpg.name}` : "N/A"}
        </div>
        <div className="boxGameCard">{games.type}</div>
        <div className="boxGameCard">{games.max_players_capacity}</div>
      </div>
    </>
  )
}
