import React, { useState } from "react"

import PlayerCards from "../Dashboard/PlayerCards"

export default function Player({ users }) {
  const [playerCard, setPlayerCard] = useState(false)
  const [playerData, setPlayerData] = useState(null)

  const openPlayerCard = (AllPlayersData) => {
    setPlayerCard(true)
    setPlayerData(AllPlayersData)
  }
  return (
    <>
      <div
        className="globalContainerCard"
        onClick={() => openPlayerCard(users)}
      >
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

      {playerCard && (
        <div className="playerModal">
          <div className="playerModalContent">
            <PlayerCards
              userData={playerData}
              isOpen={playerCard}
              setIsPlayerCardsOpen={setPlayerCard}
            />
          </div>
        </div>
      )}
    </>
  )
}
