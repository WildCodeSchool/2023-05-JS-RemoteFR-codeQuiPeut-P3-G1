import React, { useContext, useEffect, useState } from "react"
import Cookies from "js-cookie"
import "./Profil.scss"
import axios from "axios"
import AuthContext from "../components/AuthContext/AuthContext"

const Profil = () => {
  const { user } = useContext(AuthContext)
  const tokenFromCookie = Cookies.get("authToken")
  const [gameData, setGameData] = useState({})

  const headers = {
    Authorization: `Bearer ${tokenFromCookie}`,
  }

  useEffect(() => {
    axios
      .get("http://localhost:4242/role-playing-games", { headers })
      .then((response) => {
        setGameData(response.data[1])
        console.info(gameData)
      })
      .catch((error) => {
        console.error("An error occurred:", error)
      })
  }, [])

  const shortDate = String(user.registration_date)
    .substring(0, 10)
    .split("-")
    .reverse()
    .join("-")

  return (
    <div className="mainContainerProfil">
      <div className="leftBoxMain">
        <div className="settingsTitle">SETTINGS</div>
        <div className="settingsTab">
          <ul>
            <li>PROFILE</li>
            <li>MY GAMES</li>
            <li>SOCIAL</li>
          </ul>
        </div>
      </div>
      <div className="mainTitleand?">balise image PROFILE balise image</div>
      <div className="rightBoxMain">
        <div>
          <div className="titleProfil">PUBLIC INFORMATION</div>
          <div className="topBoxProfil">
            <div className="boxPhoto">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${
                  user.profil_picture
                }`}
              />
              <span>{shortDate}</span>
            </div>
            <div className="boxName">INPUT NAME</div>
            <div className="localisationBox">INPUT/PAYS INPUT/PARIS</div>
          </div>
          <div className="bioBoxProfil">
            <div className="bioBoxProfilTitle">Bio en profile</div>
            <div className="bioBoxProfilText">votre bio de sarasin ici</div>
          </div>
          <div className="gameBoxProfil">
            <div className="gameBoxProfilTitle">SEARCH TO PLAY ON</div>
            <div className="gameBoxGamesList">composant gamelist</div>
          </div>
          <div className="bottomBoxProfil">
            <div className="privateInfoBox">PERSONAL EN ITALIEN</div>
            <div className="mailBox">CHAMP EMAIL</div>
            <div className="passwordBox">
              <div className="oldPassword">CHAMP ANCIEN PASSWORD</div>
              <div className="newPassword">NEW PASSWORD</div>
            </div>
          </div>
          <div className="validateProfil">BOUTON VALIDATE</div>
        </div>
      </div>
    </div>
  )
}

export default Profil
