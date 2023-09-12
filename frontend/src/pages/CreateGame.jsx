import axios from "axios"
import React, { useEffect, useState } from "react"
import { TimePicker } from "react-ios-time-picker"
import Cookies from "js-cookie"
import Calendar from "moedim"

import createGameDice from "../assets/icon-create-game/dice.svg"
import hour from "../assets/icon-create-game/horaire.png"

export default function CreateGame() {
  const [isTimeRequired, setIsTimeRequired] = useState(true)

  const handleDecrement = () => {
    if (gamePlayersCapacity > 1) {
      setGamePlayersCapacity(gamePlayersCapacity - 1)
    }
  }

  const handleIncrement = () => {
    setGamePlayersCapacity(gamePlayersCapacity + 1)
  }

  const [gameRPGList, setGameRPGList] = useState([])
  const [departmentList, setDepartementList] = useState([])
  const [departmentId, setDepartementId] = useState("")
  const [cityList, setCityList] = useState([])
  const [gameRPGID, setGameRPGID] = useState("")
  const [gamemasterUsername, setGamemasterUsername] = useState("")
  const [gameDateToFormat, setGameDateToFormat] = useState(new Date())
  const [gameHourToFormat, setGameHourToFormat] = useState("00:00")
  const [gameDate, setGameDate] = useState("")
  const [gamePlace, setGamePlace] = useState("")
  const [gamePlayersCapacity, setGamePlayersCapacity] = useState(1)
  const [gameDesc, setGameDesc] = useState("")
  const [gameType, setGameType] = useState("")
  const [gameName, setGameName] = useState("")
  const [gameIsCampaign, setGameIsCampaign] = useState(0)
  const [gameIsRemote, setGameIsRemote] = useState(0)

  const tokenFromCookie = Cookies.get("authToken")
  const idUser = Cookies.get("idUser")

  const headers = {
    Authorization: `Bearer ${tokenFromCookie}`
  }

  useEffect(() => {
    axios
      .get("http://localhost:4242/role-playing-games", { headers })
      .then((res) => setGameRPGList(res.data))
  }, [])

  useEffect(() => {
    axios
      .get(`http://localhost:4242/users/${idUser}`, { headers })
      .then((res) => setGamemasterUsername(res.data.username))
  }, [])

  useEffect(() => {
    axios
      .get("https://geo.api.gouv.fr/departements")
      .then((res) => setDepartementList(res.data))
  }, [])

  useEffect(() => {
    if (departmentId !== "") {
      axios
        .get(`https://geo.api.gouv.fr/departements/${departmentId}/communes`)
        .then((res) => {
          setCityList(res.data)
        })
        .catch((error) => {
          console.error("Error fetching cities:", error)
          setCityList([])
        })
    } else {
      setCityList([])
    }
  }, [departmentId])

  const handleChange = () => {
    if (gameIsCampaign === 0) {
      setGameIsCampaign(1)
    } else {
      setGameIsCampaign(0)
    }
  }

  const handleCreateUser = (e) => {
    e.preventDefault()
    axios
      .post(
        "http://localhost:4242/games",
        {
          role_playing_game_id: gameRPGID,
          schedule: gameDate,
          max_players_capacity: gamePlayersCapacity,
          description: gameDesc,
          type: gameType,
          name: gameName,
          city: gamePlace,
          is_remote: gameIsRemote,
          is_campaign: gameIsCampaign,
          gm_username: gamemasterUsername
        },
        { headers }
      )
      .then((res) => {
        if (res.status === 201) {
          console.info("Partie créée avec succès !")
        }
        setGamePlayersCapacity(1)
        setGameHourToFormat("00:00")
        document.getElementById("createGameForm").reset()
        // document.getElementById("createGameSelecter").selectedIndex = 0
      })
      .catch((error) => {
        console.error("Erreur lors de la création de la partie :", error)
      })
  }

  const formattedDate = (gameDateToFormat) => {
    const year = gameDateToFormat.getFullYear()
    const month = String(gameDateToFormat.getMonth() + 1).padStart(2, "0")
    const day = String(gameDateToFormat.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  useEffect(() => {
    setGameDate(`${formattedDate(gameDateToFormat)}T${gameHourToFormat}:00`)
  }, [gameHourToFormat, gameDateToFormat])

  console.info(
    "finalTest",
    gamemasterUsername,
    gameName,
    gameType,
    gameRPGID,
    gameIsCampaign,
    gameIsRemote,
    gamePlayersCapacity,
    gameDesc,
    gamePlace,
    gameDate
  )

  return (
    <main id="createGameGlobal">
      <div id="createGameTitle-Container">
        <div id="createGameTitle">
          <div id="createGameTitle-Img">
            <img src={createGameDice} />
          </div>
          <div id="createGameTitle-Title">
            <span>CREATE GAME</span>
          </div>
        </div>
      </div>
      <div id="contentCreateGame">
        <form id="createGameForm" onSubmit={handleCreateUser}>
          <div id="createGameColumns">
            <div id="createGameFirstGroup">
              <label htmlFor="guildName">
                <p>Guild's Name</p>
                <input
                  type="text"
                  onChange={(e) => setGameName(e.target.value)}
                  name="guildName"
                  id="createGameGuildName"
                />
              </label>
              <label htmlFor="gameTypeSelecter">
                <p>Game Type</p>
                <div className="createGameSelect">
                  <select
                    onChange={(event) => setGameType(event.target.value)}
                    name="format"
                    id="gameTypeSelecter"
                    defaultValue=""
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
                    defaultValue=""
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
                  <input type="checkbox" onClick={handleChange} />
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
                />
              </label>
              <div className="checkbox-CreateGame-Remote">
                <input
                  type="radio"
                  name="gameLocation"
                  className="demo1"
                  id="radio-Remote"
                  checked={gameIsRemote === 1}
                  onChange={() => setGameIsRemote(1)}
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
                      onChange={(event) => setDepartementId(event.target.value)}
                    >
                      <option value="" disabled>
                        Select your department
                      </option>
                      {departmentList.map((department) => (
                        <option key={department.code} value={department.code}>
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
              {/* <label htmlFor="heure">
                <p>Hour</p>
                <input
                  id="createGameHour"
                  type="time"
                  placeholder="00:00"
                  maxLength="5"
                  required={isTimeRequired} // Utilisation de l'état pour gérer le required
                  onFocus={() => setIsTimeRequired(false)} // Désactive le required lorsque l'input est en focus
                  onBlur={() => setIsTimeRequired(true)} // Réactive le required lorsque l'input perd le focus
                />
              </label> */}
              <label htmlFor="hour">
                <p>Hour</p>
                <div className="timePicker-CreateGame">
                  <TimePicker
                    onChange={(timeValue) => {
                      setGameHourToFormat(timeValue)
                    }}
                    value={gameHourToFormat}
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
            <button type="submit" onClick={handleCreateUser}>
              <span>VALIDATE</span>
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
