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

  console.info(users.id, idUser)

  return (
    <>
      {users.id !== idUser && (
        <div
          className="globalContainerCard"
          onClick={() => openPlayerCard(users)}
        >
          <div className="boxGameCard">
            <img
              className="boxGameCardImage"
              src={`${import.meta.env.VITE_BACKEND_URL}/${
                users.profil_picture
              }`}
              alt="profil photo"
            />{" "}
            {users.username}
          </div>
          <div className="boxGameCard">Mes disponibilités</div>
          <div className="boxGameCard">{users.location}</div>
          <div className="boxGameCard">{users.description_as_player}</div>
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
