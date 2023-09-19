import axios from "axios"
import React, { useState, useEffect } from "react"
import CardGame from "./CardGame"
import eye from "../../assets/upcomingTable-assets/eye.svg"
import "./Game.scss"

export default function Game({ games, headers }) {
  const [cardGame, setCardGame] = useState(false)
  const [playersProfil, setPlayersProfil] = useState([])
  const [gameData, setGameData] = useState(null)

  const openCardGame = (AllGamesData) => {
    setCardGame(true)
    setGameData(AllGamesData)
  }

  const closeCardGame = () => {
    setCardGame(false)
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
      <div className="globalContainerCard">
        <div className="boxGameCard">{games.guild_name}</div>
        <div className="boxGameCard">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/${
              games.gm_profil_picture
            }`}
            alt="GM profil picture"
          />
          <p>{games.gm_username}</p>
        </div>
        <div className="boxGameCard">{formattedDate}</div>
        <div className="boxGameCard">
          {games.city !== "" ? games.city : "Remote"}
        </div>
        <div className="boxGameCard">{games.rpg_name}</div>
        <div className="boxGameCard">{games.type}</div>
        <div className="boxGameCard">
          {playersProfil.length}/{games.max_players_capacity}
        </div>
        <div className="boxNewTopics">
          <button onClick={() => openCardGame(games)}>
            <img src={eye} />
          </button>
        </div>
      </div>

      {cardGame && (
        <div className="gameModal">
          <div className="gameModalContent">
            <CardGame
              onClose={closeCardGame}
              gameData={gameData}
              playersProfil={playersProfil}
            />
          </div>
        </div>
      )}
    </>
  )
}
