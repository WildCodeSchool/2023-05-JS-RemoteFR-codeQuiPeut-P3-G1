import React, { useState, useEffect, useContext } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import gmProfilePic from "../../assets/GmCards-assets/GMProfilePic.png"
import closeModal from "../../assets/GmCards-assets/closeModal.png"
import gameLogo from "../../assets/GmCards-assets/gameLogo.png"
import Schedule from "../../assets/GmCards-assets/scheduleGMProfil.svg"
import Location from "../../assets/GmCards-assets/locationGames.svg"
import GamesType from "../../assets/GmCards-assets/gamesType.svg"
import participantsLogo from "../../assets/GmCards-assets/participantsLogo.svg"
import PlayerCards from "./PlayerCards"
import AuthContext from "../AuthContext/AuthContext"

const GmCards = () => {
  const [gamesData, setGamesData] = useState({})
  const [isPlayerCardsOpen, setIsPlayerCardsOpen] = useState(false)
  const { user } = useContext(AuthContext)
  const scheduleDate = new Date(gamesData.schedule)
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }
  const formattedSchedule = scheduleDate.toLocaleDateString("fr-FR", options)

  const tokenFromCookie = Cookies.get("authToken")

  const headers = {
    Authorization: `Bearer ${tokenFromCookie}`,
  }

  useEffect(() => {
    axios
      .get("http://localhost:4242/games", { headers })
      .then((response) => {
        setGamesData(response.data[1])
      })
      .catch((error) => {
        console.error("An error occurred:", error)
      })
  }, [])

  const handleTogglePlayerCards = () => {
    setIsPlayerCardsOpen(!isPlayerCardsOpen)
  }

  return (
    <div className="global-GmCards">
      {!isPlayerCardsOpen && (
        <div className="GmCards-container">
          <div className="GmCards-header">
            <img className="profile-picture" src={gmProfilePic} alt="" />
            <div className="GmName-Btn-container">
              <h1 className="GM-Name">{user.username} - AS GM</h1>

              <button className="Btn-send">SEND A MESSAGE</button>
            </div>
            <div className="close-container">
              <img className="close-modale" src={closeModal} alt="GM Profile" />
            </div>
          </div>
          <div className="GM-calendar-location">
            <div className="game-info">
              <div className="game-logo-container">
                <img src={Schedule} alt="icon of schedule" />
                <h3 className="date-to">
                  TO <span className="date">{formattedSchedule}</span>
                </h3>
                <img src={GamesType} alt="icon of the type of games" />
                <h3 className="game-type">{gamesData.type}</h3>
              </div>

              <div className="location-container">
                <img
                  className="location-icon"
                  src={Location}
                  alt="icon of location"
                />
                <h3 className="location-city">
                  IN <span className="city">{gamesData.city}</span>
                </h3>
              </div>
            </div>
            <div className="game-logo-container">
              <img className="game-black-logo" src={gameLogo} alt="" />
            </div>
          </div>
          <div className="Participants">
            <div className="participant-nb-container">
              <img
                className="participant-logo-gold"
                src={participantsLogo}
                alt=""
              />
              <h3 className="Participants-nb">
                3/{gamesData.max_players_capacity} participants
              </h3>
            </div>
            <div className="participants-pictures">
              <img
                className="player-profile-picture"
                src={gmProfilePic}
                alt=""
              />
              <img
                className="player-profile-picture"
                src={gmProfilePic}
                alt=""
              />
              <img
                className="player-profile-picture"
                src={gmProfilePic}
                alt=""
              />
            </div>
          </div>
          <div className="btn-player-container">
            <button onClick={handleTogglePlayerCards}>SHOW PLAYER</button>
          </div>
        </div>
      )}
      {isPlayerCardsOpen && (
        <PlayerCards
          isOpen={isPlayerCardsOpen}
          onClose={handleTogglePlayerCards}
        />
      )}
    </div>
  )
}
export default GmCards
