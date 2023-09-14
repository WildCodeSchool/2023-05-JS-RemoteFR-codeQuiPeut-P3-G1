import { useEffect, useState } from "react"
import axios from "axios"
import Calendar from "moedim"
import Cookies from "js-cookie"

import Players from "../../assets/icon-create-game/players.svg"
import Schedule from "../../assets/icon-create-game/schedule.svg"
import TypeGame from "../../assets/icon-create-game/typeGame.svg"
import PlaceGame from "../../assets/icon-create-game/placeGame.svg"
import PlayersIcon from "../../assets/icon-create-game/playersIcons.svg"

function ResumeCreateGame({
  idUser,
  setCreateOrResume,
  gameDateToFormat,
  headers,
  setGameRPGID,
  setGamePlayersCapacity,
  setGameDesc,
  setGameHourToFormat,
  setGameType,
  setGameName,
  setGamePlace,
  setGameIsRemote,
  setGameIsCampaign
}) {
  const usernameGm = Cookies.get("usernameGm")
  let username = usernameGm
  username = username.replace(/"/g, "")

  const [gamesList, setGamesList] = useState([])

  useEffect(() => {
    axios
      .get(`http://localhost:4242/games/user/${username}`, { headers })
      .then((res) => setGamesList(res.data))
  }, [usernameGm])

  console.info("la liste des jeux", gamesList)

  const [gamemasterPicture, setGamemasterPicture] = useState([])
  useEffect(() => {
    axios
      .get(`http://localhost:4242/users/${idUser}`, { headers })
      .then((res) => setGamemasterPicture(res.data.profil_picture))
  }, [idUser])

  console.info("username please", username)
  console.info(gamemasterPicture)
  console.info("url", `http://localhost:4242/games/${username}`)

  const handleReset = () => {
    setCreateOrResume(1)
    setGameRPGID("")
    setGamePlayersCapacity(1)
    setGameDesc("")
    setGameHourToFormat("00:00")
    setGameType("")
    setGameName("")
    setGamePlace("")
    setGameIsRemote(0)
    setGameIsCampaign(0)
  }

  return (
    <>
      {gamesList.length > 0 && (
        <div className="resumeCreateGameContainer">
          <div className="resumeContent">
            <div className="contentLeftResumeCreateGame">
              <div className="guildNameResume">
                <span id="guildName">
                  GUILD : <span id="gameName">{gamesList[0].guild_name}</span>
                </span>
                <div id="gameIsCampaign">
                  <span>
                    {gamesList[0].is_campaign === 1 ? (
                      <p>Campaign</p>
                    ) : (
                      <p>One Shot</p>
                    )}
                  </span>
                </div>
              </div>
              <div className="underlineGuildNameResume"></div>
              <div className="usernameResume">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${
                    gamesList[0].profil_picture
                  }`}
                  alt="gamemaster profil picture"
                />
                {gamesList[0].gm_username} - AS GM
              </div>
              <div className="typeAndPlaceResume">
                <img src={TypeGame} alt="icon type of game" />
                <p>
                  Type : <span>{gamesList[0].type}</span>
                </p>
                <img src={PlaceGame} alt="icon place of game " />
                {gamesList[0].is_remote === 1 ? (
                  <p>Remote</p>
                ) : (
                  <span>
                    <p>
                      Place : <span id="gamePlace">{gamesList[0].city}</span>
                    </p>
                  </span>
                )}
              </div>
              <div className="titlePresentationResume">Game Presentation</div>
              <div className="presentationGameResumeContainer">
                <div className="presentationGameResume">
                  {gamesList[0].description}
                </div>
              </div>
              <div className="PlayersResume">
                <img src={Players} alt="icon of players" />
                <span>Players</span>
              </div>
              <div className="underlinePlayersResume"></div>
              <div className="playersProfilsResume">
                {Array.from(
                  { length: gamesList[0].max_players_capacity },
                  (_, index) => (
                    <img
                      key={index}
                      src={PlayersIcon}
                      alt={`player ${index + 1} icon`}
                    />
                  )
                )}
              </div>
            </div>
            <div className="contentRightResumeCreateGame">
              <span className="titleRPG">Based on RPG</span>
              <div id="boxRpgPicture">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${
                    gamesList[0].rpg_icon
                  }`}
                  alt="logo of RPG"
                />
              </div>
              <div className="gameDateResume">
                <div id="gameDate">
                  <img src={Schedule} alt="icon of schedule" />
                  <span>Game Date</span>
                </div>
                <div className="underlineGameDateResume"></div>
                <div className="calendarResume">
                  <Calendar
                    value={gameDateToFormat}
                    id="createGameCalendar"
                    required
                  />
                </div>
                <div className="hourSchedule">
                  Game Time : {gamesList[0].schedule.substring(11, 16)}
                </div>
              </div>
            </div>
          </div>
          <div className="buttonResumeCreateGame">
            <button
              type="submit"
              id="createNewGame"
              onClick={() => handleReset()}
            >
              CREATE NEW GAME
            </button>
            <button
              type="button"
              id="editResume"
              onClick={() => setCreateOrResume(2)}
            >
              EDIT
            </button>
            {/* <button type="button" id="sendInvitation">
              SEND INVITATION
            </button> */}
          </div>
        </div>
      )}
    </>
  )
}

export default ResumeCreateGame
