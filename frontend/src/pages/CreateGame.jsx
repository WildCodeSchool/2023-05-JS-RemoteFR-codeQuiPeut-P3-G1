import axios from "axios"
import React, { useEffect, useState } from "react"
import Cookies from "js-cookie"

import createGameDice from "../assets/icon-create-game/dice.png"

export default function CreateGame() {
  const [gameRPGList, setGameRPGList] = useState([])
  const [departmentList, setDepartementList] = useState([])
  const [departmentId, setDepartementId] = useState("")
  const [cityList, setCityList] = useState([])
  const [gameRPGID, setGameRPGID] = useState("")
  const [gamemasterUsername, setGamemasterUsername] = useState("")
  const [gameDate, setGameDate] = useState("")
  const [gamePlace, setGamePlace] = useState("")
  const [gamePlayersCapacity, setGamePlayersCapacity] = useState("")
  const [gameDesc, setGameDesc] = useState("")
  const [gameType, setGameType] = useState("")
  const [gameName, setGameName] = useState("")
  // const [gameIsRemote, setGameIsRemote] = useState(0)
  const [gameIsCampaign, setGameIsCampaign] = useState(0)

  const tokenFromCookie = Cookies.get("authToken")
  const idUser = Cookies.get("idUser")

  const headers = {
    Authorization: `Bearer ${tokenFromCookie}`,
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
          gm_username: gamemasterUsername,
          schedule: gameDate,
          city: gamePlace,
          max_players_capacity: gamePlayersCapacity,
          description: gameDesc,
          type: gameType,
          name: gameName,
        },
        { headers }
      )
      .then((res) => {
        if (res.status === 200) {
          console.info("Partie créée avec succès !")
        }
        document.getElementById("createGameForm").reset()
        document.getElementById("createGameSelecter").selectedIndex = 0
      })
      .catch((error) => {
        console.error("Erreur lors de la création de la partie :", error)
      })
  }

  console.info(
    "finalTest",
    gamemasterUsername,
    gameName,
    gameType,
    gameRPGID,
    gameIsCampaign,
    gamePlayersCapacity,
    gameDesc,
    gamePlace,
    gameDate
  )

  return (
    <main id="createGameGlobal">
      <div id="contentCreateGame">
        <div id="createGameTitle">
          <img src={createGameDice} />
          <h1>CREATE GAME</h1>
        </div>
        {/* <label htmlFor="idGm">
          <p style={{ color: "white" }}>ID du GM</p>
          <input
            type="text"
            name="idGm"
            onChange={(e) => setGamemasterUsername(e.target.value)}
          />
        </label> */}
        <form id="createGameForm" onSubmit={handleCreateUser}>
          <div id="createGameColumns">
            <div id="createGameFirstGroup">
              <label htmlFor="guildName">
                <p>Guild's Name</p>
                <input
                  type="text"
                  onChange={(e) => setGameName(e.target.value)}
                  name="guildName"
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
                <input
                  type="text"
                  name="maxCapacity"
                  onChange={(e) => setGamePlayersCapacity(e.target.value)}
                  maxLength="2"
                />
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
            </div>
            <div id="createGameThirdGroup">
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
              {departmentId !== "" ? (
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
                <input
                  type="datetime-local"
                  onChange={(e) => setGameDate(e.target.value)}
                  name="date"
                />
              </label>
            </div>
          </div>
          <div id="createGameButton">
            <button type="submit">
              <span>VALIDATE</span>
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
