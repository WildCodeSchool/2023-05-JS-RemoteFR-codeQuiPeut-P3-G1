import { useState } from "react"

import "./PlayerCards.scss"

import Arrow from "../../assets/icon-dashboard/arrow.svg"
import Cross from "../../assets/icon-dashboard/cross.svg"
import Schedule from "../../assets/icon-dashboard/scheduleIcon.svg"
import Dungeons from "../../assets/logoGames/d&d.svg"
import Cthulhu from "../../assets/logoGames/callOfCthulhu.svg"
import FiveRings from "../../assets/logoGames/fiveRings.svg"

function PlayerCards({ isOpen, onClose, userData, formattedSchedule }) {
  if (!isOpen) {
    return null
  }
  const [isPlayerOpen, setIsPlayerOpen] = useState(isOpen)

  const handleClose = () => {
    setIsPlayerOpen(false)
    onClose()
  }

  if (!isPlayerOpen) {
    return null
  }

  console.info("userdata", userData)
  return (
    <div className="major_Container_PlayerCards">
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
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${
                userData.profil_picture
              }`}
              alt="image player profil"
            />
          </div>
          <div className="PlayerCards_Inside_SecondElement_TextContent">
            <div className="PlayerCards_Inside_SecondElement_PlayerName">
              <h1>{userData.username}</h1>
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
            <p>{userData.description_as_player}</p>
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
