import React from "react"

import "./playerCard.scss"

export default function Player({ users }) {
  return (
    <>
      <div className="globalContainerCard">
        <div className="boxGameCard">
          <img
            className="boxGameCardImage"
            src={`${import.meta.env.VITE_BACKEND_URL}/${users.profil_picture}`}
            alt="profil photo"
          />{" "}
          {users.username}
        </div>
        <div className="boxGameCard">Mes disponibilités</div>
        <div className="boxGameCard">{users.location}</div>
        <div className="boxGameCard">{users.description_as_player}</div>
      </div>
    </>
  )
}
