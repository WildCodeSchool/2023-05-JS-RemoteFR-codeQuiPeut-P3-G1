import React from "react"
import "./Profil.scss"

const Profil = () => {
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
              balise imageUser registrationDateUser
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
