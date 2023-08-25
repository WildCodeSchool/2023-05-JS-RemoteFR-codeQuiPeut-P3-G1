import React from "react"

import "./Game.scss"

export default function Game({ games, gm }) {
  // Convertir la date au format souhaité
  const formattedDate = new Date(games.schedule).toLocaleString("fr-FR", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  // Trouver le GM correspondant dans le tableau gm en utilisant games.gm_profiles_id
  const gameMaster = gm.find((user) => user.id === games.gm_profiles_id)

  return (
    <>
      <div className="globalContainerCard">
        <p> XXX </p>
        <div className="gameLocationUpcoming">
          {gameMaster ? `${gameMaster.username}` : "N/A"}
        </div>
        <div className="gameLocationUpcoming">{formattedDate}</div>
        <div className="gameLocationUpcoming">{games.location}</div>
        <div className="gameLocationUpcoming">{games.max_players_capacity}</div>
        <p> XXX </p>
        <p> XXX </p>
      </div>
    </>
  )
}
