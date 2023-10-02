import React, { useState, useEffect } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { Link } from "react-router-dom"

import closeModal from "../../assets/icon-dashboard/crossWithBg.svg"
import gameLogo from "../../assets/GmCards-assets/gameLogo.png"
import Schedule from "../../assets/GmCards-assets/scheduleGMProfil.svg"
import Location from "../../assets/GmCards-assets/locationGames.svg"
import GamesType from "../../assets/GmCards-assets/gamesType.svg"
import participantsLogo from "../../assets/GmCards-assets/participantsLogo.svg"
import PlayerCards from "./PlayerCards"

const GmCards = ({ onClose, gameData, setIsGmCardsOpen }) => {
  const [playersProfil, setPlayersProfil] = useState([])
  const [isPlayerCardsOpen, setIsPlayerCardsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState(null)
  const [profilPictureGM, setProfilPictureGM] = useState([])
  const scheduleDate = new Date(gameData.schedule)
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }
  const formattedSchedule = scheduleDate.toLocaleDateString("fr-FR", options)

  const tokenFromCookie = Cookies.get("authToken")
  const idUser = Cookies.get("idUser")

  const headers = {
    Authorization: `Bearer ${tokenFromCookie}`
  }

  useEffect(() => {
    axios
      .get(`http://localhost:4242/usernameGMFutureGames/${idUser}`, { headers })
      .then((response) => {
        // setGamesData(response.data)
        setIsLoading(true)
      })
      .catch((error) => {
        console.error("An error occurred:", error)
      })
  }, [])

  useEffect(() => {
    isLoading &&
      axios
        .get(`http://localhost:4242/gmpicturebygames/${gameData.id}`, {
          headers
        })
        .then((response) => {
          setProfilPictureGM(response.data)
        })
        .catch((error) => {
          console.error("An error occurred:", error)
        })
  }, [isLoading])

  useEffect(() => {
    isLoading &&
      axios
        .get(`http://localhost:4242/playersForThisGame/${gameData.id}`, {
          headers
        })
        .then((response) => {
          setPlayersProfil(response.data)
        })
        .catch((error) => {
          console.error("An error occurred:", error)
        })
  }, [isLoading])

  const handleProfileClick = (playerData) => {
    // Ouvrez le composant PlayerCards en passant les informations du joueur sélectionné.
    setIsPlayerCardsOpen(true)
    setUserData(playerData)
  }

  console.info(profilPictureGM, "gamedataid")
  console.info(gameData.profil_picture, "hola")

  return (
    <div className="global-GmCards">
      {!isPlayerCardsOpen && (
        <div className="GmCards-container">
          <div className="GmCards-header">
            <div className="profile-picture">
              {profilPictureGM !== null &&
                profilPictureGM.map((ppgm, index) => (
                  // <img
                  //   key={index}
                  //   src={`${import.meta.env.VITE_BACKEND_URL}/${
                  //     ppgm.profil_picture.profil_picture
                  //   }`}
                  //   alt="gm profil picture"
                  //   />

                  <img
                    key={index}
                    src={`${import.meta.env.VITE_BACKEND_URL}/${
                      gameData.profil_picture !== undefined
                        ? gameData.profil_picture
                        : profilPictureGM[0].profil_picture
                    }`}
                    alt="image player profil"
                  />
                ))}
            </div>
            <div className="GM-Name">
              <span>{gameData.gm_username} - AS GM</span>
              <div id="underline-GMUsername"></div>
              <div className="Btn-send">
                <Link to="/privatemessages">
                  <button>SEND A MESSAGE</button>
                </Link>
              </div>
            </div>
            <div className="close-container">
              <img
                className="close-modale"
                onClick={onClose}
                src={closeModal}
                alt="GM Profile"
              />
            </div>
          </div>
          <div className="GmCards-Middle">
            <div className="GmCards-Middle-Left">
              <img src={Schedule} alt="icon of schedule" />
              <img
                className="location-icon"
                src={Location}
                alt="icon of location"
              />
              <img
                className="participant-logo-gold"
                src={participantsLogo}
                alt=""
              />
            </div>
            <div className="GmCards-Middle-Middle_Left">
              <div className="date-to-container">
                <h3 className="date-to">ON</h3>
                <span id="date">{formattedSchedule}</span>
              </div>
              <div className="location-city-container">
                {gameData.city !== "" ? (
                  <>
                    <h3 className="location-city">IN</h3>
                    <span className="city">{gameData.city}</span>
                  </>
                ) : (
                  <span className="city">Remote</span>
                )}
              </div>
              <div className="Particpants-nb">
                <h3 className="Participants-nb">
                  {playersProfil.length}/{gameData.max_players_capacity}{" "}
                  participants
                </h3>
              </div>
            </div>
            <div className="GmCards-Middle-Middle_Right">
              <img src={GamesType} alt="icon of the type of games" />
              <h3 className="game-type">{gameData.type}</h3>
            </div>
            <div className="GmCards-Middle-Right">
              <img className="game-black-logo" src={gameLogo} alt="" />
            </div>
          </div>
          <span id="underline-GMParticipants"></span>
          <div className="participants-pictures">
            {playersProfil.map((user) => (
              <img
                key={user.id}
                src={`${import.meta.env.VITE_BACKEND_URL}/${
                  user.profil_picture
                }`}
                alt={`${user.id}-profil`}
                onClick={() => handleProfileClick(user)}
              />
            ))}
          </div>
          <div className="iframe-GmCards">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43214.45269481307!2d0.6537433684748363!3d47.394319723298125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47fcd5b34a979a55%3A0x40dc8d705388430!2sTours!5e0!3m2!1sfr!2sfr!4v1693503608708!5m2!1sfr!2sfr"></iframe>
          </div>
          {/* <div className="btn-player-container">
            <button onClick={handleTogglePlayerCards}>SHOW PLAYER</button>
          </div> */}
        </div>
      )}
      {isPlayerCardsOpen && (
        <PlayerCards
          isPlayerCardsOpen={isPlayerCardsOpen}
          setIsPlayerCardsOpen={setIsPlayerCardsOpen}
          setIsGmCardsOpen={setIsGmCardsOpen}
          userData={userData}
          formattedSchedule={formattedSchedule}
        />
      )}
    </div>
  )
}
export default GmCards
