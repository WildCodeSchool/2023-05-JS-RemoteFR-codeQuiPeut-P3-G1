// import React from "react"
import React, { useContext } from "react"
import "./playerCard.scss"
import AuthContext from "../AuthContext/AuthContext"

const { users } = useContext(AuthContext)

export default function Player() {
  return (
    <>
      <div className="globalContainerCard">
        <div className="gameLocationUpcoming">{users.username}</div>
        <div className="gameLocationUpcoming">{users.location}</div>
        <div className="gameLocationUpcoming">
          {users.description_as_player}
        </div>
        <div className="gameLocationUpcoming">
          <img src={users.profil_picture} alt="profil photo" />
        </div>
      </div>
    </>
  )
}
