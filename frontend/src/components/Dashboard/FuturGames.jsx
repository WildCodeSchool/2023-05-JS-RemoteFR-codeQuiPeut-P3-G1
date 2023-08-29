import React, { useState } from "react"
import { Link } from "react-router-dom"
import Search from "../../assets/icon-dashboard/Search.png"
import Dice from "../../assets/icon-dashboard/Dice.png"
import Add from "../../assets/icon-dashboard/Add.png"
import GmCards from "./GmCards"

export default function futurGames() {
  const [isGmCardsOpen, setIsGmCardsOpen] = useState(false)
  const toggleGmCards = () => {
    setIsGmCardsOpen(!isGmCardsOpen)
  }

  return (
    <div className="myFutureGames">
      <img id="logoFutureGames" src={Dice} alt="logo of D20" />
      <h2>MY FUTURE GAMES</h2>
      <div className="contentFutureGames">
        <div className="contentWindow">
          <div className="divButtonsss">
            <div className="logoContentFG">
              <Link to="/create-game">
                <button type="button" className="sideButton">
                  <img id="logoAdd" src={Add} alt="logo of a cross" />
                </button>
              </Link>
              <Link to="/UpcomingTable">
                <button type="button" className="sideButton">
                  <img id="logoSearch" src={Search} alt="logo of a magnifier" />
                </button>
              </Link>
            </div>
          </div>
          <p>
            You are not registered for any games yet. Check the list of upcoming
            games or click on the "FIND YOUR PARTY" button.
          </p>
          <Link to="/UpcomingTable">
            <button id="partyFinder" type="button">
              FIND YOUR PARTY
            </button>
          </Link>
        </div>
        <button onClick={toggleGmCards}>
          {isGmCardsOpen ? "Close GmCards" : "Show GmCards"}
        </button>
        {isGmCardsOpen && <GmCards onClose={toggleGmCards} />}
      </div>
    </div>
  )
}
