import axios from "axios"
import React, { useState, useEffect } from "react"
import CardGame from "./CardGame"
import JoinGuild from "./JoinGuild"
import JoinGuildValidation from "./JoinGuildValidation"

export default function Game({ games, headers }) {
  const [cardGame, setCardGame] = useState(false)
  const [joinGuild, setJoinGuild] = useState(false)
  const [joinGuildValidation, setJoinGuildValidation] = useState(false)
  const [playersProfil, setPlayersProfil] = useState([])
  const [gameData, setGameData] = useState(null)

  const openCardGame = (AllGamesData) => {
    setCardGame(true)
    setJoinGuild(false)
    setGameData(AllGamesData)
  }

  const closeCardGame = () => {
    setCardGame(false)
  }

  const openJoinGuild = () => {
    setJoinGuild(true)
    setCardGame(false)
  }

  const closeJoinGuild = () => {
    setJoinGuild(false)
  }

  // Convertir la date au format souhaité
  const formattedDate = new Date(games.schedule).toLocaleString("en-EN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })

  useEffect(() => {
    axios
      .get(`http://localhost:4242/playersForThisGame/${games.id}`, {
        headers
      })
      .then((response) => {
        setPlayersProfil(response.data)
      })
      .catch((error) => {
        console.error("An error occurred:", error)
      })
  }, [])

  console.info(games)
  return (
    <>
      <div
        className="globalContainerCardGame"
        onClick={() => openCardGame(games)}
      >
        <div className="boxGameCardGame">{games.guild_name}</div>
        <div className="boxGameCardGame">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/${
              games.gm_profil_picture
            }`}
            alt="GM profil picture"
          />
          <p>{games.gm_username}</p>
        </div>
        <div className="boxGameCardGame">{formattedDate}</div>
        <div className="boxGameCardGame">
          {games.city !== "" ? games.city : "Remote"}
        </div>
        <div className="boxGameCardGame">{games.rpg_name}</div>
        <div className="boxGameCardGame">{games.type}</div>
        <div className="boxGameCardGame">
          {playersProfil.length}/{games.max_players_capacity}
        </div>
      </div>

      {cardGame && (
        <div className="gameModal">
          <div className="gameModalContent">
            <CardGame
              onClose={closeCardGame}
              gameData={gameData}
              playersProfil={playersProfil}
              openJoinGuild={openJoinGuild}
              setCardGame={setCardGame}
            />
          </div>
        </div>
      )}

      {joinGuild && (
        <div className="gameJoinGuildModal">
          <div className="gameJoinGuildContent">
            <JoinGuild
              closeJoinGuild={closeJoinGuild}
              gameData={gameData}
              playersProfil={playersProfil}
              setJoinGuildValidation={setJoinGuildValidation}
              setJoinGuild={setJoinGuild}
            />
          </div>
        </div>
      )}

      {joinGuildValidation && (
        <div className="gameJoinGuildValidationModal">
          <div className="gameJoinGuildValidationContent">
            <JoinGuildValidation
              setJoinGuildValidation={setJoinGuildValidation}
            />
          </div>
        </div>
      )}
    </>
  )
}
