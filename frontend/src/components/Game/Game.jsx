import React from "react"

import "./Game.scss"

export default function Game({ games }) {
  return (
    <>
      <div className="globalContainerCard">
        <div className="gameLocationUpcoming">{games.gm_profiles_id}</div>
        <div className="gameLocationUpcoming">{games.schedule}</div>
        <div className="gameLocationUpcoming">{games.location}</div>
        <div className="gameLocationUpcoming">{games.max_players_capacity}</div>
      </div>
    </>
  )
}
