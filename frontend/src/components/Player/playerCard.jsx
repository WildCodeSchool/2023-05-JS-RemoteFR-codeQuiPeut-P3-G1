import React from "react"

import "./playerCard.scss"

export default function Player({ users }) {
  return (
    <>
      <div className="globalContainerCard">
        <div className="gameLocationUpcoming">{users.username}</div>
        <div className="gameLocationUpcoming">{users.location}</div>
        <div className="gameLocationUpcoming">
          {users.description_as_player}
        </div>
        <div className="gameLocationUpcoming">{users.profil_picture}</div>
      </div>
    </>
  )
}
