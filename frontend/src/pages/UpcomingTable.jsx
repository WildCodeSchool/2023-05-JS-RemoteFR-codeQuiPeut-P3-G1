import React, { useState, useEffect } from "react"
import axios from "axios"
import Game from "../components/Game/Game"
import Player from "../components/Player/playerCard"
import NavBar from "../components/NavBar/Navbar"
import "./UpcomingTable.scss"
import BladeIcon from "../assets/logo/BladeIcon.png"
import BookVector from "../assets/logo/BookVector.png"
import CalandarIcon from "../assets/logo/CalandarIcon.png"
import GroupDiscussionIcon from "../assets/logo/GroupDiscussionIcon.png"
import PlaceIconVector from "../assets/logo/PlaceIconVector.png"
import ProfilIcon from "../assets/logo/ProfilIcon.png"
import HexagonDiceIcon from "../assets/logo/HexagonDiceIcon.png"
// import AuthContext from "../components/AuthContext/AuthContext"
import Cookies from "js-cookie"

function UpcomingTable() {
  const [games, setGames] = useState([])
  // const [switchPlayer, setSwitchPlayer] = useState(false)
  const [users, setUsers] = useState([])
  const [rpg, setRpg] = useState([])
  const [cityFilter, setCityFilter] = useState("")
  const [gmFilter, setGmFilter] = useState("")
  const [maxPlayersFilter, setMaxPlayersFilter] = useState("") // Filtre pour le nombre maximum de joueurs
  const [typeFilter, setTypeFilter] = useState("") // Filtre pour le type de partie
  const [dateFilter, setDateFilter] = useState("") // Filtre pour la date de partie
  const [nameFilter, setNameFilter] = useState("") // Filtre pour le nom de partie
  const [rpgFilter, setRpgFilter] = useState("") // Filtre pour le type de RPG
  const [usernameFilter, setUsernameFilter] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [showPlayerContainer, setShowPlayerContainer] = useState(false)

  const toggleContainer = () => {
    setShowPlayerContainer(!showPlayerContainer)

    // Ajouter la classe d'animation lorsque le conteneur Player devient visible
    if (!showPlayerContainer) {
      const playerContainer = document.querySelector(".bigBoxPlayer")
      if (playerContainer) {
        playerContainer.classList.add("flip-in-hor-top")
      }
    }
  }

  // sert a récupérer le token qui certifie que l'utilisateur est connecté.
  const tokenFromCookie = Cookies.get("authToken")

  const headers = {
    Authorization: `Bearer ${tokenFromCookie}`,
  }

  const handleUsernameFilterChange = (event) => {
    setUsernameFilter(event.target.value)
  }

  const handleLocationFilterChange = (event) => {
    setLocationFilter(event.target.value)
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

  const handleRpgFilterChange = (event) => {
    setRpgFilter(event.target.value)
  }

  // useContexte qui ne fonctionne pas car il est dans App.
  // const { users } = useContext(AuthContext)

  useEffect(() => {
    axios
      .get("http://localhost:4242/users", { headers })
      .then((res) => setUsers(res.data))
    axios
      .get("http://localhost:4242/games", { headers })
      .then((res) => setGames(res.data))
    axios
      .get("http://localhost:4242/role-playing-games", { headers })
      .then((res) => setRpg(res.data))
  }, [])

  return (
    <>
      <div className="globalcontainerUT">
        <NavBar />
        <div
          className="containerFilterAndCardsPlayer"
          style={{ display: showPlayerContainer ? "flex" : "none" }}
        >
          <div className="bigBoxPlayer flip-in-hor-top">
            <h1 className="titleUpcommingTable"> Upcoming Table</h1>
            <div className="BoxTitle">
              <div className="boxTitlePlayer">
                <img
                  className="iconUpcomingTablePlayer"
                  src={ProfilIcon}
                  alt="icon blade gold"
                />
                <div className="containeurTitlePlayer">Player</div>
              </div>
              <div className="boxTitlePlayer">
                <img
                  className="iconUpcomingTablePlayer"
                  src={CalandarIcon}
                  alt="icon blade gold"
                />
                <div className="containeurTitlePlayer">Availability</div>
              </div>
              <div className="boxTitlePlayer">
                <img
                  className="iconUpcomingTablePlayer"
                  src={PlaceIconVector}
                  alt="icon blade gold"
                />
                <div className="containeurTitlePlayer">Place</div>
              </div>
              <div className="boxTitlePlayer">
                <img
                  className="iconUpcomingTablePlayer"
                  src={HexagonDiceIcon}
                  alt="icon blade gold"
                />
                <div className="containeurTitlePlayer">Description</div>
              </div>
            </div>
            <div>
              {users
                .filter((user) =>
                  user.username
                    .toLowerCase()
                    .includes(usernameFilter.toLowerCase())
                )
                .filter((user) =>
                  user.location
                    .toLowerCase()
                    .includes(locationFilter.toLowerCase())
                )
                .map((user) => (
                  <Player key={user.id} users={user} />
                ))}
            </div>
          </div>
          <div className="bigBoxFilterPlayer">
            <h1 className="titleUpcommingTable">"Find your Players"</h1>
            <input
              className="inputUT"
              type="text"
              placeholder="Filter by username"
              value={usernameFilter}
              onChange={handleUsernameFilterChange}
            />

            <input
              className="inputUT"
              type="text"
              placeholder="Filter by city"
              value={locationFilter}
              onChange={handleLocationFilterChange}
            />

            <button type="buttonGame" onClick={toggleContainer}>
              Find a Game
            </button>
          </div>
        </div>
        <div
          className="containerFilterAndCardsGames flip-in-hor-top"
          style={{ display: showPlayerContainer ? "none" : "flex" }}
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
              value={cityFilter}
              onChange={(event) => {
                setCityFilter(event.target.value)
              }}
            />

            <input
              className="inputUT"
              type="text"
              placeholder="Filtrer par type de RPG"
              value={rpgFilter}
              onChange={handleRpgFilterChange}
            />

            <button type="button" onClick={toggleContainer}>
              Find a Player
            </button>
          </div>
          <div className="gamecard">
            <h1 className="titleUpcommingTable"> Upcoming Table</h1>
            <div className="containerMenuGame">
              <div className="boxTitleGame">
                <img
                  className="iconUpcomingTableGame"
                  src={BladeIcon}
                  alt="icon blade gold"
                />
                <div className="containerTitleUP">Game Title</div>
              </div>
              <div className="boxTitleGame">
                <img
                  className="iconUpcomingTableGame"
                  src={ProfilIcon}
                  alt="icon profil gold"
                />
                <div className="containerTitleUP">Game Master</div>
              </div>
              <div className="boxTitleGame">
                <img
                  className="iconUpcomingTableGame"
                  src={CalandarIcon}
                  alt="icon calandar gold"
                />
                <div className="containerTitleUP">Game Date</div>
              </div>
              <div className="boxTitleGame">
                <img
                  className="iconUpcomingTableGame"
                  src={PlaceIconVector}
                  alt="icon place gold"
                />
                <div className="containerTitleUP">Place</div>
              </div>
              <div className="boxTitleGame">
                <img
                  className="iconUpcomingTableGame"
                  src={HexagonDiceIcon}
                  alt="icon Hexagon gold"
                />
                <div className="containerTitleUP">RPG</div>
              </div>
              <div className="boxTitleGame">
                <img
                  className="iconUpcomingTableGame"
                  src={BookVector}
                  alt="icon book gold"
                />
                <div className="containerTitleUP">Type</div>
              </div>
              <div className="boxTitleGame">
                <img
                  className="iconUpcomingTableGame"
                  src={GroupDiscussionIcon}
                  alt="icon Group Discussion gold"
                />
                <div className="containerTitleUP">Player</div>
              </div>
            </div>
            {games
              .filter((game) =>
                game.city.toLowerCase().includes(cityFilter.toLowerCase())
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
              .filter(
                (game) =>
                  gmFilter === "" ||
                  users.some((user) =>
                    user.username.toLowerCase().includes(gmFilter.toLowerCase())
                  )
              )
              .filter(
                (game) =>
                  rpgFilter === "" ||
                  rpg.some((r) =>
                    r.name.toLowerCase().includes(rpgFilter.toLowerCase())
                  )
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
