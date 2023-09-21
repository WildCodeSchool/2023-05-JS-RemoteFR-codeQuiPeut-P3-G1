import React, { useState } from "react"

import PlayerCards from "../Dashboard/PlayerCards"

export default function Player({ users }) {
  const [playerCard, setPlayerCard] = useState(false)
  const [playerData, setPlayerData] = useState(null)

  const openPlayerCard = (AllPlayersData) => {
    setPlayerCard(true)
    setPlayerData(AllPlayersData)
  }

  const formattedDate = new Date(users.registration_date).toLocaleString(
    "en-EN",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
      // hour: "2-digit",
      // minute: "2-digit"
    }
  )
  return (
    <>
      <div
        className="globalContainerCardGame"
        onClick={() => openPlayerCard(users)}
      >
        <div className="boxGameCardGame">
          <img
            className="boxGameCardImage"
            src={`${import.meta.env.VITE_BACKEND_URL}/${users.profil_picture}`}
            alt="profil photo"
          />{" "}
          {users.username}
        </div>
        <div className="boxGameCardGame">{formattedDate}</div>
        <div className="boxGameCardGame">{users.location}</div>
        <div className="boxGameCardGame">{users.description_as_player}</div>
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
