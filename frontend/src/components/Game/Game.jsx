import React from "react"

import "./Game.scss"

export default function Game({ games, users, rpg }) {
  // Convertir la date au format souhaité
  const formattedDate = new Date(games.schedule).toLocaleString("fr-FR", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  // Trouver le GM correspondant dans le tableau users en utilisant games.gm_profiles_id
  const gameMaster = users.find((user) => user.id === games.gm_profiles_id)

  const nameOfRpg = rpg.find(
    (typeRpg) => typeRpg.id === games.role_playing_game_id
  )

  return (
    <>
      <div className="globalContainerCard">
        <div className="gameLocationUpcoming">{games.name}</div>
        <div className="gameLocationUpcoming">
          {gameMaster ? `${gameMaster.username}` : "N/A"}
        </div>
        <div className="gameLocationUpcoming">{formattedDate}</div>
        <div className="gameLocationUpcoming">{games.city}</div>
        <div className="gameLocationUpcoming">
          {/* {games.role_playing_game_id} */}
          {nameOfRpg ? `${nameOfRpg.name}` : "N/A"}
        </div>
        <div className="gameLocationUpcoming">{games.type}</div>
        <div className="gameLocationUpcoming">{games.max_players_capacity}</div>
      </div>
    </>
  )
}
