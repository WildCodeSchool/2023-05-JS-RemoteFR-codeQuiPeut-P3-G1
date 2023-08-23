import React, { useState, useEffect } from "react"
import axios from "axios"

import Game from "../components/Game/Game"
import NavBar from "../components/NavBar/Navbar"

import "./UpcomingTable.scss"

function UpcomingTable() {
  const [games, setGames] = useState([])
  const [switchPlayer, setSwitchPlayer] = useState(false)

  const handleSwitchPlayer = () => {
    setSwitchPlayer(!switchPlayer)
  }

  useEffect(() => {
    axios.get("http://localhost:4242/games").then((res) => setGames(res.data))
  }, [])

  return (
    <>
      <div className="globalcontainerUT">
        <NavBar />
        <div
          className={`containerFilterAndCards ${
            switchPlayer ? "filterGameLeft" : "filterGameRight"
          }`}
        >
          <div className="filterContainer">
            <p>Bonjour</p>

            <button type="button" onClick={handleSwitchPlayer}>
              {" "}
              Hey
            </button>
          </div>
          <div className="gamecard">
            {games.map((game) => (
              <Game key={game.id} location={game.location} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default UpcomingTable
