import axios from "axios"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"

import calendarViolet from "../../assets/player-assets/calendar-violet.svg"
import calendarGold from "../../assets/player-assets/calendar-gold.svg"

export default function InvitationCards({
  userData,
  setPlayerCard,
  setInvitationCard,
  setInvitationValidation
}) {
  const [allGames, setAllGames] = useState([])
  const tokenFromCookie = Cookies.get("authToken")
  const idUser = Cookies.get("idUser")
  const [selectedGames, setSelectedGames] = useState([])

  const headers = {
    Authorization: `Bearer ${tokenFromCookie}`
  }

  useEffect(() => {
    axios
      .get(`http://localhost:4242/nextgamesbygmid/${idUser}`, { headers })
      .then((res) => setAllGames(res.data))
  }, [])

  const toggleGameSelection = (gameId) => {
    if (selectedGames.includes(gameId)) {
      setSelectedGames(selectedGames.filter((id) => id !== gameId))
    } else {
      setSelectedGames([...selectedGames, gameId])
    }
  }

  const handleInvitePlayer = (e) => {
    e.preventDefault()
    Promise.all(
      selectedGames.map((gameId) =>
        axios.post(
          "http://localhost:4242/gamesRegistrationsAsPlayer",
          {
            player_id: userData.id,
            games_id: gameId,
            status: "pending"
          },
          { headers }
        )
      )
    )
      .then((responses) => {
        const successResponses = responses.filter((res) => res.status === 201)
        if (successResponses.length === selectedGames.length) {
          setInvitationCard(false)
          setInvitationValidation(true)
          console.info("Toutes les invitations ont été envoyées avec succès !")
        } else {
          console.error("Certaines invitations n'ont pas été envoyées")
        }
        if (responses.status === 201) {
          console.info("Partie créée avec succès !")
        }
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi des invitations :", error)
      })
  }

  return (
    <div id="invitationCardsGlobal">
      <div id="buttonInvitationCardExit">
        <button
          onClick={() => {
            setInvitationCard(false)
            setPlayerCard(true)
          }}
        >
          X
        </button>
      </div>
      <p id="invitationTitle">SEND AN INVITATION TO JOIN A GAME</p>
      <div id="invitationListGlobal">
        {allGames.map((oneGame) => (
          <div
            id={
              selectedGames.includes(oneGame.id)
                ? "invitationGameListSelected"
                : "invitationGameList"
            }
            key={oneGame.id}
            onClick={() => toggleGameSelection(oneGame.id)}
          >
            <img
              src={
                selectedGames.includes(oneGame.id)
                  ? calendarGold
                  : calendarViolet
              }
            />
            <p id="dateAndHour">
              {new Date(oneGame.schedule).toLocaleString("en-EN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })}
            </p>
            <p id="invitationGuildName">
              GUILD : <span>{oneGame.guild_name}</span>
            </p>
            <p id="invitationIconRemoteCampaign">
              {oneGame.is_remote === 1 ? "CAMPAIGN" : "ONE SHOT"}
            </p>
          </div>
        ))}
      </div>
      <div id="invitationButtonValidate">
        <button onClick={handleInvitePlayer}>VALIDATE INVITATION</button>
      </div>
    </div>
  )
}
