import "./PlayerCards.scss"

import Arrow from "../../assets/icon-dashboard/arrow.svg"
import Cross from "../../assets/icon-dashboard/cross.svg"
import ImgProfil from "../../assets/icon-dashboard/playerImgPopUpProfilCard.svg"

function PlayerCards() {
  return (
    <div className="PlayerCards_Main_Container">
      <div className="PlayerCards_Inside_FirstElement">
        <button className="PlayerCards_BackButton" type="button">
          <img
            src={Arrow}
            id="PlayerCards_BackButton_Img"
            alt="button_return"
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
      <div className="PlayerCards_Inside_ThirdElement"></div>
      <div className="PlayerCards_Inside_FourthElement"></div>
      <div className="PlayerCards_Inside_FifthElement"></div>
      <div className="PlayerCards_Inside_SixthElement"></div>
    </div>
  )
}

export default PlayerCards
