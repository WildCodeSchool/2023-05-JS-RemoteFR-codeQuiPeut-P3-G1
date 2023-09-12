import axios from "axios"
import React, { useEffect, useState } from "react"
import FormCreateGame from "../components/CreateGame/FormCreateGame"
import ResumeCreateGame from "../components/CreateGame/ResumeCreateGame"

import Cookies from "js-cookie"

import createGameDice from "../assets/icon-create-game/dice.svg"

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
  const [gamemasterId, setGamemasterId] = useState()
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
  const [createOrResume, setCreateOrResume] = useState(1)

  const tokenFromCookie = Cookies.get("authToken")
  const idUser = Cookies.get("idUser")

  const headers = {
    Authorization: `Bearer ${tokenFromCookie}`,
  }

  console.info(gamemasterUsername)
  console.info("bonjour", gamemasterId)

  useEffect(() => {
    axios
      .get("http://localhost:4242/role-playing-games", { headers })
      .then((res) => setGameRPGList(res.data))
  }, [])

  useEffect(() => {
    axios
      .get(`http://localhost:4242/users/${idUser}`, { headers })
      .then((res) => {
        setGamemasterUsername(res.data.username)
        setGamemasterId(res.data.id)
      })
  }, [idUser])

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

  const handleCreateGame = (e) => {
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
          gm_username: gamemasterUsername,
          gm_id: gamemasterId,
        },
        { headers }
      )
      .then((res) => {
        if (res.status === 201) {
          console.info("Partie créée avec succès !")
          setCreateOrResume(0)
          setGamePlayersCapacity(1)
          setGameHourToFormat("00:00")
          document.getElementById("createGameForm").reset()
        }
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
        <div className="underlineCreateGame"></div>
      </div>
      {createOrResume === 1 ? (
        <div className="formCreateGame">
          <FormCreateGame
            isTimeRequired={isTimeRequired}
            setIsTimeRequired={setIsTimeRequired}
            handleDecrement={handleDecrement}
            handleIncrement={handleIncrement}
            gameRPGList={gameRPGList}
            setGameRPGList={setGameRPGList}
            departmentList={departmentList}
            setDepartementList={setDepartementList}
            departmentId={departmentId}
            setDepartementId={setDepartementId}
            cityList={cityList}
            setCityList={setCityList}
            gameRPGID={gameRPGID}
            setGameRPGID={setGameRPGID}
            gamemasterUsername={gamemasterUsername}
            setGamemasterUsername={setGamemasterUsername}
            gameDateToFormat={gameDateToFormat}
            setGameDateToFormat={setGameDateToFormat}
            gameHourToFormat={gameHourToFormat}
            setGameHourToFormat={setGameHourToFormat}
            gameDate={gameDate}
            setGameDate={setGameDate}
            gamePlace={gamePlace}
            setGamePlace={setGamePlace}
            gamePlayersCapacity={gamePlayersCapacity}
            setGamePlayersCapacity={setGamePlayersCapacity}
            gameDesc={gameDesc}
            setGameDesc={setGameDesc}
            gameType={gameType}
            setGameType={setGameType}
            gameName={gameName}
            setGameName={setGameName}
            gameIsCampaign={gameIsCampaign}
            setGameIsCampaign={setGameIsCampaign}
            gameIsRemote={gameIsRemote}
            setGameIsRemote={setGameIsRemote}
            handleChange={handleChange}
            handleCreateGame={handleCreateGame}
            setCreateOrResume={setCreateOrResume}
          />
        </div>
      ) : (
        <div className="ResumeCreateGame">
          <ResumeCreateGame
            gameName={gameName}
            gameIsCampaign={gameIsCampaign}
            gamemasterUsername={gamemasterUsername}
            idUser={idUser}
            headers={headers}
            gameType={gameType}
            gamePlace={gamePlace}
            setCreateOrResume={setCreateOrResume}
            gameDate={gameDate}
            gameDesc={gameDesc}
            gameDateToFormat={gameDateToFormat}
            gamePlayersCapacity={gamePlayersCapacity}
            gameIsRemote={gameIsRemote}
          />
        </div>
      )}
    </main>
  )
}
