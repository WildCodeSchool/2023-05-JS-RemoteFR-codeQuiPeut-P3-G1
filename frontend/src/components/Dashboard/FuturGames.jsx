import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import Search from "../../assets/icon-dashboard/Search.svg"
import Dice from "../../assets/icon-dashboard/Dice.svg"
import Add from "../../assets/icon-dashboard/Add.svg"
import eyeBtn from "../../assets/icon-dashboard/eyeBtn.svg"
import crossDash from "../../assets/icon-dashboard/crossDash.svg"
import GmCards from "./GmCards"
import Cookies from "js-cookie"

export default function FutureGames() {
  const [isGmCardsOpen, setIsGmCardsOpen] = useState(false)
  const [gameAsUser, setGameAsUser] = useState([])
  const [gameAsGM, setGameAsGM] = useState([])
  const [gameData, setGameData] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [currentRequest, setCurrentRequest] = useState(null)
  // const [gameChildrenData, setGameChildrenData] = useState([])
  // const isEmpty = (obj) => Array.isArray(obj) && obj.length === 0

  const tokenFromCookie = Cookies.get("authToken")
  const idUser = Cookies.get("idUser")

  const openConfirmation = (gameId) => {
    setShowConfirm(true)
    setCurrentRequest({ gameId })
  }

  const closeConfirmation = () => {
    setShowConfirm(false)
    setCurrentRequest(null)
  }

  const confirmReject = () => {
    if (currentRequest) {
      rejectRequest(currentRequest.gameId)
    }
    closeConfirmation()
  }

  const handleGameClick = (gameData) => {
    setGameData(gameData)
  }

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
    idUser !== null &&
      axios
        .get(`http://localhost:4242/usernameGMFutureGames/${idUser}`, {
          headers
        })
        .then((response) => {
          setGameAsUser(response.data)
        })
        .catch((error) => {
          console.error("An error occurred:", error)
        })
  }, [idUser])

  useEffect(() => {
    idUser !== null &&
      axios
        .get(`http://localhost:4242/gameswithrpgname/${idUser}`, {
          headers
        })
        .then((response) => {
          setGameAsGM(response.data)
        })
        .catch((error) => {
          console.error("An error occurred:", error)
        })
  }, [idUser])

  const rejectRequest = (gameId) => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/games/${gameId}`, {
        headers
      })
      .then((response) => {
        console.info("Game successfuly deleted", response.data)
      })
      .catch((error) => {
        console.error("Error accepting request:", error)
      })
  }

  console.info(gameAsGM, "premier")
  console.info(gameAsUser, "deuxieme")
  console.info(gameData, "troisieme")

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
          <div id="futurGamesListGlobal">
            <div id="gamesAsPlayer">
              {gameAsUser.length !== 0 ? (
                gameAsUser.map((game, index) => {
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
                              <span id="goldenText_FG">GM</span>
                              <span id="future-GM">{game.gm_username}</span>
                              {/* <img
                                src={`${import.meta.env.VITE_BACKEND_URL}/${
                                  game.profil_picture
                                }`}
                              /> */}
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
                        <div
                          className="eyeBtnContainer"
                          onClick={() => {
                            toggleGmCards()
                            handleGameClick(game)
                          }}
                        >
                          <img
                            className="eyeBtn"
                            src={eyeBtn}
                            alt="Icône de l'œil"
                          />
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="noDataMessage">
                  <div className="messsageNoData">
                    <p>You are not registered for any games yet</p>
                    <Link to="/upcoming-table">
                      <button id="partyFinder" type="button">
                        FIND YOUR PARTY
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div id="gamesAsGM">
              {gameAsGM.length !== 0 ? (
                gameAsGM.map((game, index) => {
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
                              <span id="goldenText_FG">GM</span>
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
                        <div
                          className="eyeBtnContainer"
                          onClick={() => {
                            toggleGmCards()
                            handleGameClick(game)
                          }}
                        >
                          <img
                            className="eyeBtn"
                            src={eyeBtn}
                            alt="Icône de l'œil"
                          />
                        </div>
                        <div className="deleteBtnContainer">
                          <img
                            id="refuseButton"
                            src={crossDash}
                            alt="refuse"
                            onClick={() => openConfirmation(game.id)}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="noDataMessage">
                  <div className="messsageNoData">
                    <p>You don't have any game created as GM</p>
                    <Link to="/create-game">
                      <button id="partyFinder" type="button">
                        CREATE MY GAME
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {isGmCardsOpen && (
          <GmCards
            onClose={toggleGmCards}
            gameData={gameData}
            setIsGmCardsOpen={setIsGmCardsOpen}
          />
        )}
        {showConfirm && (
          <div className="custom-confirmRequest">
            <div className="modalCustomConfirmRequest">
              <p>Are you sure you want to reject this request ?</p>
              <div className="buttonCustomConfirmRequest">
                <button id="buttonNo" onClick={closeConfirmation}>
                  NO
                </button>
                <button onClick={confirmReject}>YES</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
