import React, { useState, useEffect } from "react"
import axios from "axios"

import Game from "../components/Game/Game"
import NavBar from "../components/NavBar/Navbar"

import "./UpcomingTable.scss"
import BladeIcon from "../assets/logo/BladeIcon.png"
import BookVector from "../assets/logo/BookVector.png"
import CalandarIcon from "../assets/logo/CalandarIcon.png"
import GroupDiscussionIcon from "../assets/logo/GroupDiscussionIcon.png"
import PlaceIconVector from "../assets/logo/PlaceIconVector.png"
import ProfilIcon from "../assets/logo/ProfilIcon.png"
import HexagonDiceIcon from "../assets/logo/HexagonDiceIcon.png"

function UpcomingTable() {
  const [games, setGames] = useState([])
  const [switchPlayer, setSwitchPlayer] = useState(false)
  const [gm, setGm] = useState([])

  const handleSwitchPlayer = () => {
    setSwitchPlayer(!switchPlayer)
  }

  useEffect(() => {
    axios.get("http://localhost:4242/games").then((res) => setGames(res.data))
  }, [])

  useEffect(() => {
    axios.get("http://localhost:4242/users").then((res) => setGm(res.data))
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
            <div className="containerMenuGame">
              <p className="containerTitleUP">
                <img
                  className="iconUpcomingTable"
                  src={BladeIcon}
                  alt="icon blade gold"
                ></img>
                Guil
              </p>
              <p className="containerTitleUP">
                <img
                  className="iconUpcomingTable"
                  src={ProfilIcon}
                  alt="icon blade gold"
                ></img>
                Game Master
              </p>
              <p className="containerTitleUP">
                <img
                  className="iconUpcomingTable"
                  src={CalandarIcon}
                  alt="icon blade gold"
                ></img>
                Game Date
              </p>
              <p className="containerTitleUP">
                <img
                  className="iconUpcomingTable"
                  src={PlaceIconVector}
                  alt="icon blade gold"
                ></img>
                Place
              </p>
              <p className="containerTitleUP">
                <img
                  className="iconUpcomingTable"
                  src={HexagonDiceIcon}
                  alt="icon blade gold"
                ></img>
                RPG
              </p>
              <p className="containerTitleUP">
                <img
                  className="iconUpcomingTable"
                  src={BookVector}
                  alt="icon blade gold"
                ></img>
                Type
              </p>
              <p className="containerTitleUP">
                <img
                  className="iconUpcomingTable"
                  src={GroupDiscussionIcon}
                  alt="icon blade gold"
                ></img>
                Player
              </p>
            </div>
            {games.map((games) => (
              <Game key={games.id} games={games} gm={gm} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default UpcomingTable
