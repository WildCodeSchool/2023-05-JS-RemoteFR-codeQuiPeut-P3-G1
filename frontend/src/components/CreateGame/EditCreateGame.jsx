import Cookies from "js-cookie"
import axios from "axios"
import hour from "../../assets/icon-create-game/horaire.png"
import { TimePicker } from "react-ios-time-picker"
import { toast } from "react-toastify"
import Calendar from "moedim"
import { useEffect, useState } from "react"

function EditCreateGame({
  isTimeRequired,
  setIsTimeRequired,
  handleDecrement,
  handleIncrement,
  gameRPGList,
  // setGameRPGList,
  departmentList,
  //   setDepartementList,
  departmentId,
  setDepartementId,
  cityList,
  //   setCityList,
  gameRPGID,
  setGameRPGID,
  //   gamemasterUsername,
  //   setGamemasterUsername,
  gameDateToFormat,
  setGameDateToFormat,
  // gameHourToFormat,
  setGameHourToFormat,
  //   setGameDate,
  gameDate,
  gamePlace,
  setGamePlace,
  gamePlayersCapacity,
  setGamePlayersCapacity,
  gameDesc,
  setGameDesc,
  gameType,
  setGameType,
  gameName,
  setGameName,
  gameIsCampaign,
  setGameIsCampaign,
  gameIsRemote,
  setGameIsRemote,
  handleChange,
  handleCreateGame,
  headers,
  setCreateOrResume
}) {
  const usernameGm = Cookies.get("usernameGm")
  let username = usernameGm
  username = username.replace(/"/g, "")

  const [gamesList, setGamesList] = useState([])

  useEffect(() => {
    axios
      .get(`http://localhost:4242/games/user/${username}`, { headers })
      .then((res) => {
        setGamesList(res.data)
        setGameName(res.data[0].guild_name)
        setGameType(res.data[0].type)
        setGameRPGID(res.data[0].rpg_id)
        setGameIsRemote(res.data[0].is_remote)
        setGameIsCampaign(res.data[0].is_campaign)
        setGamePlayersCapacity(res.data[0].max_players_capacity)
        setGameDesc(res.data[0].description)
        setGamePlace(res.data[0].city)
        setGameHourToFormat(res.data[0].schedule.substring(11, 16))
        console.info("je suis dans le axios", res.data[0].id, gameRPGID)
      })
      .catch((error) => {
        console.error("An error occurred while retrieving :", error)
      })
  }, [username])

  const handleEditGame = (e) => {
    e.preventDefault()
    axios
      .put(
        `http://localhost:4242/games/${gamesList[0].id}`,
        {
          role_playing_game_id: gameRPGID,
          schedule: gameDate,
          max_players_capacity: gamePlayersCapacity,
          description: gameDesc,
          type: gameType,
          guild_name: gameName,
          city: gamePlace,
          is_remote: gameIsRemote,
          is_campaign: gameIsCampaign
        },
        { headers }
      )
      .then((res) => {
        if (res.status === 204) {
          console.info("Partie modifiée avec succès !")
          setGameRPGID("")
          setGamePlayersCapacity(1)
          setGameDesc("")
          setGameHourToFormat("00:00")
          setGameType("")
          setGameName("")
          setGamePlace("")
          setGameIsRemote(0)
          setGameIsCampaign(0)
          setCreateOrResume(0)
          document.getElementById("createGameForm").reset()
          toast.success("Game modified with success !", {
            position: toast.POSITION.TOP_RIGHT
          })
        }
        // document.getElementById("createGameSelecter").selectedIndex = 0
      })
      .catch((error) => {
        console.error("Erreur lors de la création de la partie :", error)
        toast.error("Erreur when modifying the game", {
          position: toast.POSITION.TOP_RIGHT
        })
      })
  }

  // console.info(
  //   "editTest",
  //   gameName,
  //   gameType,
  //   gameRPGID,
  //   typeof gameRPGID,
  //   gameIsCampaign,
  //   gamePlayersCapacity,
  //   gameDesc,
  //   gameIsRemote,
  //   gamePlace,
  //   gameDate,
  //   gameRPGList
  // )

  return (
    <>
      {gamesList.length > 0 && (
        <>
          <div id="contentCreateGame">
            <form
              id="createGameForm"
              onSubmit={(e) => {
                handleEditGame(e)
              }}
            >
              <div id="createGameColumns">
                <div id="createGameFirstGroup">
                  <label htmlFor="guildName">
                    <p>Guild's Name</p>
                    <input
                      type="text"
                      onChange={(e) => setGameName(e.target.value)}
                      name="guildName"
                      id="createGameGuildName"
                      value={gameName}
                    />
                  </label>
                  <label htmlFor="gameTypeSelecter">
                    <p>Game Type</p>
                    <div className="createGameSelect">
                      <select
                        onChange={(event) => setGameType(event.target.value)}
                        name="format"
                        id="gameTypeSelecter"
                        defaultValue={gameType}
                      >
                        <option value="" disabled>
                          Select your categorie
                        </option>
                        <option value="Horror">Horror</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Sci-Fi">Sci-Fi</option>
                      </select>
                    </div>
                  </label>
                  <label htmlFor="rpgNameSelecter">
                    <p>Based on RPG</p>
                    <div className="createGameSelect">
                      <select
                        onChange={(event) => setGameRPGID(event.target.value)}
                        id="rpgNameSelecter"
                        defaultValue={gameRPGID}
                      >
                        <option value="" disabled>
                          Select your game
                        </option>
                        {gameRPGList.map((rpg) => (
                          <option key={rpg.id} value={rpg.id}>
                            {rpg.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </label>
                  <div id="createGameSwitchGlobal">
                    <p>One Shot</p>
                    <label id="createGameSwitch">
                      <input
                        type="checkbox"
                        onClick={handleChange}
                        checked={gameIsCampaign}
                      />
                      <span className="slider round"></span>
                    </label>
                    <p>Campaign</p>
                  </div>
                  <label htmlFor="maxCapacity">
                    <p>Number of Players</p>
                    <div className="formTypeNumber">
                      <button
                        type="button"
                        className="btn-minus"
                        onClick={handleDecrement}
                      >
                        -
                      </button>
                      <input
                        id="createGameQuantity"
                        max="99"
                        min="1"
                        name="maxCapacity"
                        value={gamePlayersCapacity}
                        readOnly
                        onChange={(e) => setGamePlayersCapacity(e.target.value)}
                      />

                      <button
                        type="button"
                        onClick={handleIncrement}
                        className="btn-plus"
                      >
                        +
                      </button>
                    </div>
                  </label>
                </div>
                <div id="createGameSecondGroup">
                  <label htmlFor="description">
                    <p>Quick description of the game</p>
                    <textarea
                      type="textarea"
                      name="description"
                      onChange={(e) => setGameDesc(e.target.value)}
                      value={gameDesc}
                    />
                  </label>
                  <div className="checkbox-CreateGame-Remote">
                    <input
                      type="radio"
                      name="gameLocation"
                      className="demo1"
                      id="radio-Remote"
                      checked={gameIsRemote === 1}
                      onChange={() => {
                        setGameIsRemote(1)
                        setGamePlace("")
                      }}
                    />

                    <label htmlFor="radio-Remote">Remote</label>

                    <input
                      type="radio"
                      name="gameLocation"
                      className="demo1"
                      id="radio-OnPlace"
                      checked={gameIsRemote === 0}
                      onChange={() => setGameIsRemote(0)}
                    />
                    <label htmlFor="radio-OnPlace">On Place</label>
                  </div>
                </div>
                <div id="createGameThirdGroup">
                  {gameIsRemote === 1 ? (
                    ""
                  ) : (
                    <label htmlFor="Department">
                      <p>Department</p>
                      <div className="createGameSelect">
                        <select
                          id="departmentNameSelecter"
                          defaultValue=""
                          onChange={(event) =>
                            setDepartementId(event.target.value)
                          }
                        >
                          <option value="" disabled>
                            Select your department
                          </option>
                          {departmentList.map((department) => (
                            <option
                              key={department.code}
                              value={department.code}
                            >
                              {department.nom}
                            </option>
                          ))}
                        </select>
                      </div>
                    </label>
                  )}
                  {departmentId !== "" && gameIsRemote !== 1 ? (
                    <label htmlFor="city">
                      <p>City</p>
                      <div className="createGameSelect">
                        <select
                          onChange={(event) => setGamePlace(event.target.value)}
                          id="cityNameSelecter"
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select your city
                          </option>
                          {cityList.map((city) => (
                            <option key={city.code} value={city.nom}>
                              {city.nom}
                            </option>
                          ))}
                        </select>
                      </div>
                    </label>
                  ) : (
                    ""
                  )}
                  <label htmlFor="date">
                    <p>Date</p>
                    <Calendar
                      value={gameDateToFormat}
                      onChange={(e) => setGameDateToFormat(e)}
                      id="createGameCalendar"
                      required
                    />
                  </label>
                  <label htmlFor="hour">
                    <p>Hour</p>
                    <div className="timePicker-CreateGame">
                      <TimePicker
                        onChange={(timeValue) => {
                          setGameHourToFormat(timeValue)
                        }}
                        value={new Date(gamesList[0].schedule).toLocaleString(
                          "fr-FR",
                          {
                            hour: "2-digit",
                            minute: "2-digit"
                          }
                        )}
                        className="timepicker"
                        required={isTimeRequired}
                        onFocus={() => setIsTimeRequired(false)} // Désactive le required lorsque l'input est en focus
                        onBlur={() => setIsTimeRequired(true)} // Réactive le required lorsque l'input perd le focus
                      />
                      <img src={hour} />
                    </div>
                  </label>
                  <div />
                </div>
              </div>
              <div id="createGameButton">
                <button type="submit">
                  <span>VALIDATE</span>
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  )
}

export default EditCreateGame
