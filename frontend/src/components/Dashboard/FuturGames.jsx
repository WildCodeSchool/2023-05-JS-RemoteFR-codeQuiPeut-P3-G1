import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import Search from "../../assets/icon-dashboard/Search.png"
import Dice from "../../assets/icon-dashboard/Dice.png"
import Add from "../../assets/icon-dashboard/Add.png"
import eyeBtn from "../../assets/icon-dashboard/eyeBtn.svg"
import GmCards from "./GmCards"

export default function FutureGames() {
  const [isGmCardsOpen, setIsGmCardsOpen] = useState(false)
  // const [participantsData, setParticipantsData] = useState({})
  const [gameData, setGameData] = useState({})
  const [gameTypeData, setGameTypeData] = useState({})

  const toggleGmCards = () => {
    setIsGmCardsOpen(!isGmCardsOpen)
  }
  const scheduleDate = new Date(gameData.schedule)
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }
  const formattedSchedule = scheduleDate.toLocaleDateString("en-Us", options)

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:4242/games_has_users")
  //     .then((response) => {
  //       setParticipantsData(response.data[1])
  //     })
  //     .catch((error) => {
  //       console.error("An error occurred:", error)
  //     })
  // }, [])

  useEffect(() => {
    axios
      .get("http://localhost:4242/games")
      .then((response) => {
        setGameData(response.data[1])
      })
      .catch((error) => {
        console.error("An error occurred:", error)
      })
  }, [])

  useEffect(() => {
    axios
      .get("http://localhost:4242/role_playing_games")
      .then((response) => {
        setGameTypeData(response.data[1])
      })
      .catch((error) => {
        console.error("An error occurred:", error)
      })
  }, [])

  return (
    <>
      <div className="myFutureGames_Container">
        <div className="logoFutureGames">
          <img id="logoFutureGames" src={Dice} alt="logo of D20" />
        </div>
        <span className="line_myFutureGames"></span>
        <div className="title_FuturGames">
          <h2>MY FUTURE GAMES</h2>
        </div>
        <div className="inside_myFutureGames_Container">
          {gameTypeData ? (
            <div className="display_myfutureGames">
              <div className="logoContentFG">
                <Link to="/create-game">
                  <button type="button" className="sideButton">
                    <img id="logoAdd" src={Add} alt="logo of a cross" />
                  </button>
                </Link>
                <Link to="/UpcomingTable">
                  <button type="button" className="sideButton">
                    <img
                      id="logoSearch"
                      src={Search}
                      alt="logo of a magnifier"
                    />
                  </button>
                </Link>
              </div>
              <div className="infoGames_FG_Container">
                <div className="infoGames_FG">
                  <div className="infoGames_FG_Text">
                    <div>
                      <span id="goldenText_FG">WITH </span>
                      <span id="future-GM">Abdou</span>{" "}
                    </div>
                    <span id="lineSeparator_FG"></span>
                    <div>
                      <span id="goldenText_FG">ON </span>
                      {gameTypeData.name}
                    </div>
                    <span id="lineSeparator_FG"></span>
                    <div>
                      <span id="goldenText_FG">ON </span>
                      {formattedSchedule}
                    </div>
                  </div>

                  <div id="underlineInfo_FG">
                    <span></span>
                  </div>
                </div>
                <div className="eyeBtnContainer" onClick={toggleGmCards}>
                  <img className="eyeBtn" src={eyeBtn} alt="Eye Icon" />
                </div>
              </div>
            </div>
          ) : (
            <div className="noDataMessage">
              <div className="logoContentFG">
                <Link to="/create-game">
                  <button type="button" className="sideButton">
                    <img id="logoAdd" src={Add} alt="logo of a cross" />
                  </button>
                </Link>
                <Link to="/UpcomingTable">
                  <button type="button" className="sideButton">
                    <img
                      id="logoSearch"
                      src={Search}
                      alt="logo of a magnifier"
                    />
                  </button>
                </Link>
              </div>
              <div>
                <p>
                  You are not registered for any games yet. Check the list of
                  upcoming games or click on the "FIND YOUR PARTY" button.
                </p>
              </div>
              <Link to="/UpcomingTable">
                <button id="partyFinder" type="button">
                  FIND YOUR PARTY
                </button>
              </Link>
            </div>
          )}
        </div>
        {isGmCardsOpen && <GmCards onClose={toggleGmCards} />}
      </div>
    </>
  )
}
