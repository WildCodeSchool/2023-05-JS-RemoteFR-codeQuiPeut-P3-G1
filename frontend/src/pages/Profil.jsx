import React, { useContext, useEffect, useState } from "react"
import Cookies from "js-cookie"
import axios from "axios"
import AuthContext from "../components/AuthContext/AuthContext"
import iconProfil from "../assets/Profil/iconProfil.png.png"
import questionMark from "../assets/Profil/questionMark.png.png"

const Profil = () => {
  const { user } = useContext(AuthContext)
  const tokenFromCookie = Cookies.get("authToken")
  const [gameData, setGameData] = useState({})
  // const [isClicked, setIsClicked] = useState(false)
  const [buttonStates, setButtonStates] = useState({
    profil: false,
    myGames: false,
    social: false,
  })

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
      <div className="questionMark">
        <img src={questionMark} />
      </div>
      <div className="leftBoxMain">
        <div className="settingsTitle">
          <h1>SETTINGS</h1>
        </div>
        <div className="settingsTab">
          <div
            className={buttonStates.profil ? "Cliked" : "settingsButton"}
            onClick={() =>
              setButtonStates({
                ...buttonStates,
                profil: !buttonStates.profil,
                myGames: false,
                social: false,
              })
            }
          >
            <button type="button">PROFILE</button>
          </div>
          <div
            className={buttonStates.myGames ? "Cliked" : "settingsButton"}
            onClick={() =>
              setButtonStates({
                ...buttonStates,
                myGames: !buttonStates.myGames,
                profil: false,
                social: false,
              })
            }
          >
            <button type="button">MY GAMES</button>
          </div>
          <div
            className={buttonStates.social ? "Cliked" : "settingsButton"}
            onClick={() =>
              setButtonStates({
                ...buttonStates,
                social: !buttonStates.social,
                myGames: false,
                profil: false,
              })
            }
          >
            <button type="button">SOCIAL</button>
          </div>
        </div>
      </div>

      <div className="rightBoxMain">
        <div className="mainTitleProfil">
          <img src={iconProfil} />
          <h1>PROFILE</h1>
        </div>

        <div className="bigBoxRight">
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
            <div className="boxName">{user.username}</div>
            <div className="localisationBox">
              <span>Country</span>
              <input
                type="text"
                className="inputTopProfil"
                placeholder="France d'afrique"
              />
              <span>City</span>
              <input
                type="text"
                className="inputTopProfil"
                placeholder="Oran de l'Est"
              />
            </div>
          </div>
          <div className="bioBoxProfil">
            <div className="bioBoxProfilTitle">Bio on Profil</div>
            <div className="bioBoxProfilText">{user.description_as_player}</div>
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
