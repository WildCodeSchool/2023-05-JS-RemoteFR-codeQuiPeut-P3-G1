import { useEffect, useState } from "react"
import axios from "axios"
import Calendar from "moedim"

import Players from "../../assets/icon-create-game/players.svg"
import Schedule from "../../assets/icon-create-game/schedule.svg"
import TypeGame from "../../assets/icon-create-game/typeGame.svg"
import PlaceGame from "../../assets/icon-create-game/placeGame.svg"
import PlayersIcon from "../../assets/icon-create-game/playersIcons.svg"

function ResumeCreateGame({
  gameRPGList,
  gameIsCampaign,
  gameName,
  gamemasterUsername,
  gameType,
  gamePlace,
  handleCreateGame,
  idUser,
  headers,
  setCreateOrResume,
  gameDateToFormat,
  gameDate,
  gameDesc,
  gamePlayersCapacity,
  gameIsRemote,
}) {
  const [gamemasterPicture, setGamemasterPicture] = useState([])
  useEffect(() => {
    axios
      .get(`http://localhost:4242/users/${idUser}`, { headers })
      .then((res) => setGamemasterPicture(res.data.profil_picture))
  }, [idUser])

  console.info(gamemasterPicture)
  return (
    <div className="resumeCreateGameContainer">
      <div className="resumeContent">
        <div className="contentLeftResumeCreateGame">
          <div className="guildNameResume">
            <span id="guildName">
              GUILD : <span id="gameName">{gameName}</span>
            </span>
            <div id="gameIsCampaign">
              <span>
                {gameIsCampaign === 1 ? <p>Campaign</p> : <p>One Shot</p>}
              </span>
            </div>
          </div>
          <div className="underlineGuildNameResume"></div>
          <div className="usernameResume">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${gamemasterPicture}`}
              alt="gamemaster profil picture"
            />
            {gamemasterUsername} - AS GM
          </div>
          <div className="typeAndPlaceResume">
            <img src={TypeGame} alt="icon type of game" />
            <p>
              Type : <span>{gameType}</span>
            </p>
            <img src={PlaceGame} alt="icon place of game " />
            {gameIsRemote === 0 ? (
              <p>Remote</p>
            ) : (
              <span>
                <p>
                  Place : <span id="gamePlace">{gamePlace}</span>
                </p>
              </span>
            )}
          </div>
          <div className="titlePresentationResume">Presentation of Game</div>
          <div className="presentationGameResumeContainer">
            <div className="presentationGameResume">{gameDesc}</div>
          </div>
          <div className="PlayersResume">
            <img src={Players} alt="icon of players" />
            <span>Players</span>
          </div>
          <div className="underlinePlayersResume"></div>
          <div className="playersProfilsResume">
            <img src={PlayersIcon} alt="players icon" />
          </div>
        </div>
        <div className="contentRightResumeCreateGame">
          <span className="titleRPG">Based on RPG</span>
          <img src="" alt="logo of RPG" />
          <div className="gameDateResume">
            <div id="gameDate">
              <img src={Schedule} alt="icon of schedule" />
              <span>Game date</span>
            </div>
            <div className="underlineGameDateResume"></div>
            <div className="calendarResume">
              <Calendar
                value={gameDateToFormat}
                id="createGameCalendar"
                required
              />
            </div>
          </div>
        </div>
      </div>
      <div className="buttonResumeCreateGame">
        <button
          type="submit"
          id="createNewGame"
          onClick={() => setCreateOrResume(1)}
        >
          CREATE NEW GAME
        </button>
        <button type="button" id="editResume">
          EDIT
        </button>
        <button type="button" id="sendInvitation">
          SEND INVITATION
        </button>
      </div>
    </div>
  )
}

export default ResumeCreateGame
