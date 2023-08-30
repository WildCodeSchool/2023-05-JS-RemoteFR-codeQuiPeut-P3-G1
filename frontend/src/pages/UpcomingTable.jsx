import React, { useState, useEffect } from "react"
import axios from "axios"
import Game from "../components/Game/Game"
import NavBar from "../components/NavBar/Navbar"
import "./UpcomingTable.scss"
import BladeIcon from "../assets/logo/BladeIcon.png"
import BookVector from "../assets/logo/BookVector.png"
import CalandarIcon from "../assets/logo/CalandarIcon.png"
import GroupDiscussionIcon from "../assets/logo/GroupDiscussionIcon.png"
import PlaceIconVector from "../assets/logo/PlaceIconVector.png"
import ProfilIcon from "../assets/logo/ProfilIcon.png"
import HexagonDiceIcon from "../assets/logo/HexagonDiceIcon.png"

function UpcomingTable() {
  const [games, setGames] = useState([])
  const [switchPlayer, setSwitchPlayer] = useState(false)
  const [users, setUsers] = useState([])
  const [rpg, setRpg] = useState([])
  const [cityFilter, setCityFilter] = useState("")
  const [gmFilter, setGmFilter] = useState("")
  const [maxPlayersFilter, setMaxPlayersFilter] = useState("") // Filtre pour le nombre maximum de joueurs
  const [typeFilter, setTypeFilter] = useState("") // Filtre pour le type de partie
  const [dateFilter, setDateFilter] = useState("") // Filtre pour la date de partie
  const [nameFilter, setNameFilter] = useState("") // Filtre pour le nom de partie

  const handleSwitchPlayer = () => {
    setSwitchPlayer(!switchPlayer)
  }

  const handleCityFilterChange = (event) => {
    setCityFilter(event.target.value)
  }

  const handleGmFilterChange = (event) => {
    setGmFilter(event.target.value)
  }

  const handleMaxPlayersFilterChange = (event) => {
    setMaxPlayersFilter(event.target.value)
  }

  const handleTypeFilterChange = (event) => {
    setTypeFilter(event.target.value)
  }

  const handleDateFilterChange = (event) => {
    setDateFilter(event.target.value)
  }

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  useEffect(() => {
    axios.get("http://localhost:4242/games").then((res) => setGames(res.data))
    axios.get("http://localhost:4242/users").then((res) => setUsers(res.data))
    axios
      .get("http://localhost:4242/role-playing-games")
      .then((res) => setRpg(res.data))
  }, [])

  return (
    <>
      <div className="globalcontainerUT">
        <NavBar />
        <div
          className={`containerFilterAndCards ${
            switchPlayer ? "filterGameLeft" : "filterGameRight"
          }`}
        >
          <div className="filterContainer">
            <div className="titleUpcommingTable">
              <h1> "Find your Game" </h1>
            </div>

            <input
              className="inputUT"
              type="text"
              placeholder="Filtrer par nombre de joueurs max"
              value={maxPlayersFilter}
              onChange={handleMaxPlayersFilterChange}
            />

            <input
              className="inputUT"
              type="text"
              placeholder="Filtrer par type de partie"
              value={typeFilter}
              onChange={handleTypeFilterChange}
            />

            <input
              className="inputUT"
              type="text"
              placeholder="Filtrer par date de partie"
              value={dateFilter}
              onChange={handleDateFilterChange}
            />

            <input
              className="inputUT"
              type="text"
              placeholder="Filtrer par nom de partie"
              value={nameFilter}
              onChange={handleNameFilterChange}
            />

            <input
              className="inputUT"
              type="text"
              placeholder="Filtrer par gm"
              value={gmFilter}
              onChange={handleGmFilterChange}
            />

            <input
              className="inputUT"
              type="text"
              placeholder="Filtrer par ville"
              value={gmFilter}
              onChange={handleCityFilterChange}
            />

            <button type="button" onClick={handleSwitchPlayer}>
              Find a Player
            </button>
          </div>
          <div className="gamecard">
            <div className="containerMenuGame">
              <div className="containerTitleBar">
                <img
                  className="iconUpcomingTable"
                  src={BladeIcon}
                  alt="icon blade gold"
                />
                <p className="containerTitleUP">Guil</p>
              </div>
              <div className="containerTitleBar">
                <img
                  className="iconUpcomingTable"
                  src={ProfilIcon}
                  alt="icon blade gold"
                />
                <p className="containerTitleUP">Game Master</p>
              </div>
              <div className="containerTitleBar">
                <img
                  className="iconUpcomingTable"
                  src={CalandarIcon}
                  alt="icon blade gold"
                />
                <p className="containerTitleUP">Game Date</p>
              </div>
              <div className="containerTitleBar">
                <div className="containerTitleUP">
                  <p>Place</p>
                  <img
                    className="iconUpcomingTable"
                    src={PlaceIconVector}
                    alt="icon blade gold"
                  />
                </div>
              </div>
              <div className="containerTitleBar">
                <img
                  className="iconUpcomingTable"
                  src={HexagonDiceIcon}
                  alt="icon blade gold"
                />
                <p className="containerTitleUP">RPG</p>
              </div>
              <div className="containerTitleBar">
                <img
                  className="iconUpcomingTable"
                  src={BookVector}
                  alt="icon blade gold"
                />
                <p className="containerTitleUP">Type</p>
              </div>
              <div className="containerTitleBar">
                <img
                  className="iconUpcomingTable"
                  src={GroupDiscussionIcon}
                  alt="icon blade gold"
                />
                <p className="containerTitleUP">Player</p>
              </div>
            </div>
            {games
              .filter((game) =>
                game.location.toLowerCase().includes(cityFilter.toLowerCase())
              )
              .filter((users) =>
                users.some((user) =>
                  user.username.toLowerCase().includes(gmFilter.toLowerCase())
                )
              )
              .filter((game) =>
                game.max_players_capacity.toString().includes(maxPlayersFilter)
              )
              .filter((game) =>
                game.type.toLowerCase().includes(typeFilter.toLowerCase())
              )
              .filter((game) =>
                game.schedule.toLowerCase().includes(dateFilter.toLowerCase())
              )
              .filter((game) =>
                game.name.toLowerCase().includes(nameFilter.toLowerCase())
              )
              .map((game) => (
                <Game key={game.id} games={game} users={users} rpg={rpg} />
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default UpcomingTable