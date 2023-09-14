import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import Search from "../../assets/icon-dashboard/Search.svg"
import Dice from "../../assets/icon-dashboard/Dice.png"
import Add from "../../assets/icon-dashboard/Add.svg"
import eyeBtn from "../../assets/icon-dashboard/eyeBtn.svg"
import GmCards from "./GmCards"
import Cookies from "js-cookie"

export default function FutureGames() {
  const [isGmCardsOpen, setIsGmCardsOpen] = useState(false)
  const [gameGMData, setGameGMData] = useState([])
  const isEmpty = (obj) => Array.isArray(obj) && obj.length === 0

  const tokenFromCookie = Cookies.get("authToken")
  const idUser = Cookies.get("idUser")

  const headers = {
    Authorization: `Bearer ${tokenFromCookie}`
  }

  const toggleGmCards = () => {
    setIsGmCardsOpen(!isGmCardsOpen)
  }

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }

  useEffect(() => {
    axios
      .get(`http://localhost:4242/usernameGMFutureGames/${idUser}`, { headers })
      .then((response) => {
        setGameGMData(response.data)
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
          <div className="logoContentFG">
            <Link to="/create-game">
              <button type="button" className="sideButton">
                <img id="logoAdd" src={Search} alt="logo of a cross" />
              </button>
            </Link>
            <Link to="/upcoming-table">
              <button type="button" className="sideButton">
                <img id="logoSearch" src={Add} alt="logo of a magnifier" />
              </button>
            </Link>
          </div>
          {!isEmpty(gameGMData) ? (
            gameGMData.map((game, index) => {
              const scheduleDate = new Date(game.schedule)
              const formattedSchedule = scheduleDate.toLocaleDateString(
                "en-Us",
                options
              )

              return (
                <div className="display_myfutureGames" key={index}>
                  <div className="infoGames_FG_Container">
                    <div className="infoGames_FG">
                      <div className="infoGames_FG_Text">
                        <div className="infoGames_FG_TextContent">
                          <span id="goldenText_FG">WITH </span>
                          <span id="future-GM">{game.gm_username}</span>
                        </div>
                        <span id="lineSeparator_FG"></span>
                        <div className="infoGames_FG_TextContent">
                          <span id="goldenText_FG">ON </span>
                          {game.guild_name}
                        </div>
                        <span id="lineSeparator_FG"></span>
                        <div className="infoGames_FG_TextContent">
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
              )
            })
          ) : (
            <div className="noDataMessage">
              <div className="logoContentFG">
                <Link to="/create-game">
                  <button type="button" className="sideButton">
                    <img id="logoAdd" src={Add} alt="logo of a cross" />
                  </button>
                </Link>
                <Link to="/upcoming-table">
                  <button type="button" className="sideButton">
                    <img
                      id="logoSearch"
                      src={Search}
                      alt="logo of a magnifier"
                    />
                  </button>
                </Link>
              </div>
              <div className="messsageNoData">
                <p>
                  You are not registered for any games yet. Check the{" "}
                  <span id="goldenTextFuturGames">
                    list of upcoming games or click on the button to find your
                    party
                  </span>
                </p>
                <Link to="/upcoming-table">
                  <button id="partyFinder" type="button">
                    FIND YOUR PARTY
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
        {isGmCardsOpen && <GmCards onClose={toggleGmCards} />}
      </div>
    </>
  )
}
