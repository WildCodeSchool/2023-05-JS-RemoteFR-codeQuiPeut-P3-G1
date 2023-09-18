import React from "react"
import Calendar from "moedim"

import Players from "../../assets/icon-create-game/players.svg"
import Schedule from "../../assets/icon-create-game/schedule.svg"
import TypeGame from "../../assets/icon-create-game/typeGame.svg"
import PlaceGame from "../../assets/icon-create-game/placeGame.svg"
import diceButton from "../../assets/upcomingTable-assets/join-button.svg"

export default function CardGame({ onClose, gameData, playersProfil }) {
  console.info(gameData.rpg_icon)
  return (
    <div id="globalCardGameContainer">
      <button id="buttonClose" onClick={onClose}>
        X
      </button>
      <div id="resumeContent">
        <div className="contentLeftResumeCreateGame">
          <div className="guildNameResume">
            <span id="guildName">
              GUILD : <span id="gameName">{gameData.guild_name}</span>
            </span>
            <div id="gameIsCampaign">
              <span>
                {gameData.is_campaign === 1 ? <p>Campaign</p> : <p>One Shot</p>}
              </span>
            </div>
          </div>
          <div className="underlineGuildNameResume"></div>
          <div id="UserTypePlaceRpg">
            <div id="UserTypePlace">
              <div className="usernameResume">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${
                    gameData.gm_profil_picture
                  }`}
                  alt="gamemaster profil picture"
                />
                {gameData.gm_username} - AS GM
              </div>
              <div className="typeAndPlaceResume">
                <img src={TypeGame} alt="icon type of game" />
                <p>
                  Type : <span>{gameData.type}</span>
                </p>
                <img src={PlaceGame} alt="icon place of game " />
                {gameData.is_remote === 1 ? (
                  <p>Remote</p>
                ) : (
                  <span>
                    <p>
                      Place : <span id="gamePlace">{gameData.city}</span>
                    </p>
                  </span>
                )}
              </div>
            </div>
            <div id="boxRpgPicture">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${gameData.rpg_icon}`}
                alt="logo of RPG"
              />
            </div>
          </div>
          <div className="titlePresentationResume">Game Presentation</div>
          <div className="presentationGameResumeContainer">
            <div className="presentationGameResume">{gameData.description}</div>
          </div>
          <div className="PlayersResume">
            <div id="titlePlayers">
              <img src={Players} alt="icon of players" />
              <p>
                <span>Players</span>
              </p>
            </div>
            <div id="numberPlayers">
              <span>
                {playersProfil.length} / {gameData.max_players_capacity}
              </span>
            </div>
          </div>
          <div className="underlinePlayersResume"></div>
          <div className="playersProfilsResume">
            {playersProfil.map((user) => (
              <div id="pictureName" key={user.id}>
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${
                    user.profil_picture
                  }`}
                  alt={`${user.id}-profil`}
                  // onClick={() => handleProfileClick(user)}
                />
                <p>{user.username}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="contentRightResumeCreateGame">
          <div id="buttonJoinGuild">
            <img src={diceButton} />
            <button>JOIN THE GUILD</button>
          </div>
          <div className="gameDateResume">
            <div id="gameDate">
              <img src={Schedule} alt="icon of schedule" />
              <span>Game Date</span>
            </div>
            <div className="underlineGameDateResume"></div>
            <div className="calendarResume">
              <Calendar
                // value={gameData.schedule}
                id="createGameCalendar"
                required
              />
            </div>
            <div className="hourSchedule">
              Game Time :{" "}
              {new Date(gameData.schedule).toLocaleString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit"
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
