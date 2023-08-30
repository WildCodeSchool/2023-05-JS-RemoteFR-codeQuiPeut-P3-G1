import { useState, useEffect } from "react"
import axios from "axios"

import "./PlayerCards.scss"

import Arrow from "../../assets/icon-dashboard/arrow.svg"
import Cross from "../../assets/icon-dashboard/cross.svg"
import ImgProfil from "../../assets/icon-dashboard/playerImgPopUpProfilCard.svg"
import Schedule from "../../assets/icon-dashboard/scheduleIcon.svg"
import Dungeons from "../../assets/logoGames/d&d.svg"
import Cthulhu from "../../assets/logoGames/callOfCthulhu.svg"
import FiveRings from "../../assets/logoGames/fiveRings.svg"

function PlayerCards({ isOpen, onClose }) {
  const [isPlayerOpen, setIsPlayerOpen] = useState(isOpen)
  const [gamesData, setGamesData] = useState({})
  const scheduleDate = new Date(gamesData.schedule)
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }
  const formattedSchedule = scheduleDate.toLocaleDateString("fr-FR", options)

  useEffect(() => {
    axios
      .get("http://localhost:4242/games")
      .then((response) => {
        setGamesData(response.data[1])
      })
      .catch((error) => {
        console.error("An error occurred:", error)
      })
  }, [])

  const handleClose = () => {
    setIsPlayerOpen(false)
    onClose()
  }

  if (!isPlayerOpen) {
    return null
  }
  return (
    <div className="MajorContainer_PlayerCards">
      <div className="PlayerCards_Main_Container">
        <div className="PlayerCards_Inside_FirstElement">
          <button className="PlayerCards_BackButton" type="button">
            <img
              src={Arrow}
              id="PlayerCards_BackButton_Img"
              alt="button_return"
              onClick={handleClose}
            />
          </button>
          <button className="PlayerCards_CloseButton" type="button">
            <img
              src={Cross}
              id="PlayerCards_CloseButton_Img"
              alt="button_close"
            />
          </button>
        </div>
        <div className="PlayerCards_Inside_SecondElement_Container">
          <div className="PlayerCards_Inside_SecondElement_ImgProfil">
            <img src={ImgProfil} alt="image player profil" />
          </div>
          <div className="PlayerCards_Inside_SecondElement_TextContent">
            <div className="PlayerCards_Inside_SecondElement_PlayerName">
              <h1>MonkeyVodka</h1>
            </div>
            <div className="PlayerCards_Inside_SecondElement_LineSeparator"></div>
            <div className="PlayerCards_Inside_SecondElement_ButtonMessage_StatusPlayer">
              <button type="button">SEND A MESSAGE</button>
              <span>PLAYER</span>
            </div>
          </div>
        </div>
        <div className="PlayerCards_Inside_ThirdElement">
          <img src={Schedule} alt="icon of schedule" />
          <span>Play with her : {formattedSchedule}</span>
        </div>
        <div className="PlayerCards_Inside_FourthElement">
          <div className="PlayerCards_Inside_FourthElement_Content">
            <p>
              🕵️‍♀️ Plongeuse dans l'inconnu 🔍 Amatrice de JDR d'enquêtes et
              Cthulhu 🐙 Fascinée par les mystères occultes 🌌 Chasseuse de
              vérité surnaturelle 💪😱 L'univers sombre m'appelle ! 🌑🎲
            </p>
          </div>
        </div>
        <div className="PlayerCards_Inside_FifthElement">
          <span>SEARCH TO PLAY ON</span>
          <div className="PlayerCards_Inside_FifthElement_Underline"></div>
        </div>
        <div className="PlayerCards_Inside_SixthElement">
          <div className="PlayerCards_Inside_SixthElement_ImgContainer">
            <img src={Dungeons} alt="logo of dungeons and dragons" />
          </div>
          <div className="PlayerCards_Inside_SixthElement_ImgContainer">
            <img src={Cthulhu} alt="logo of Call of Cthulhu" />
          </div>
          <div className="PlayerCards_Inside_SixthElement_ImgContainer">
            <img src={FiveRings} alt="logo of Legends of the five Rings" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerCards
