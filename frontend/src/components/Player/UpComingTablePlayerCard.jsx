import React, { useState } from "react"
import Cookies from "js-cookie"

import PlayerCards from "../Dashboard/PlayerCards"
import InvitationCards from "./InvitationCards"
import InvitationValidationCard from "./InvitationValidationCard"

export default function UpComingTablePlayerCard({ users }) {
  const [playerCard, setPlayerCard] = useState(false)
  const [invitationCard, setInvitationCard] = useState(false)
  const [invitationValidation, setInvitationValidation] = useState(false)
  const [playerData, setPlayerData] = useState(null)
  const idUser = parseInt(Cookies.get("idUser"))

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
      {users.id !== idUser && (
        <div
          className="globalContainerCardGame"
          onClick={() => openPlayerCard(users)}
        >
          <div className="boxGameCardGame">
            <img
              className="boxGameCardImage"
              src={`${import.meta.env.VITE_BACKEND_URL}/${
                users.profil_picture
              }`}
              alt="profil photo"
            />{" "}
            {users.username}
          </div>
          <div className="boxGameCardGame">{formattedDate}</div>
          <div className="boxGameCardGame">{users.location}</div>
          <div className="boxGameCardGame">{users.description_as_player}</div>
        </div>
      )}

      {playerCard && (
        <div className="playerModal">
          <div className="playerModalContent">
            <PlayerCards
              userData={playerData}
              isOpen={playerCard}
              setIsPlayerCardsOpen={setPlayerCard}
              playerCard={playerCard}
              setPlayerCard={setPlayerCard}
              setInvitationCard={setInvitationCard}
            />
          </div>
        </div>
      )}

      {invitationCard && (
        <div className="invitationModal">
          <div className="invitationModalContent">
            <InvitationCards
              userData={playerData}
              playerCard={playerCard}
              setInvitationCard={setInvitationCard}
              setPlayerCard={setPlayerCard}
              setInvitationValidation={setInvitationValidation}
            />
          </div>
        </div>
      )}

      {invitationValidation && (
        <div className="invitationModal">
          <div className="invitationModalContent">
            <InvitationValidationCard
              setInvitationValidation={setInvitationValidation}
            />
          </div>
        </div>
      )}
    </>
  )
}
