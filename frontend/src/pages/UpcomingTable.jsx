import React, { useState, useEffect } from "react"
import axios from "axios"
import Game from "../components/Game/Game"
import Player from "../components/Player/UpComingTablePlayerCard"
import BladeIcon from "../assets/logo/bladeIcon.svg"
import BookVector from "../assets/logo/bookVector.svg"
import CalandarIcon from "../assets/logo/calendarIcon.svg"
import GroupDiscussionIcon from "../assets/logo/groupDiscussionIcon.svg"
import PlaceIconVector from "../assets/logo/placeIconVector.svg"
import ProfilIcon from "../assets/logo/profilIcon.svg"
import HexagonDiceIcon from "../assets/logo/hexagonDiceIcon.svg"
import Cookies from "js-cookie"
import moment from "moment"
import CardGame from "../components/Game/CardGame"

function UpcomingTable() {
  const [games, setGames] = useState([])
  // const [switchPlayer, setSwitchPlayer] = useState(false)
  const [users, setUsers] = useState([])
  const [rpgs, setRpgs] = useState([])
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
  const [modaleGameData, setModaleGameData] = useState(null)
  const [gameModale, setGameModale] = useState(false)
  const [playersList, setPlayersList] = useState([])

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
    Authorization: `Bearer ${tokenFromCookie}`
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

  // console.info(games)

  useEffect(() => {
    axios.get("http://localhost:4242/users", { headers }).then((res) => {
      setUsers(res.data)
    })
    axios
      .get("http://localhost:4242/gameswithrpgname", { headers })
      .then((res) => {
        console.log("Games:", res.data) // Pour le débogage
        setGames(res.data)
      })
    axios
      .get("http://localhost:4242/role-playing-games", { headers })
      .then((res) => {
        setRpgs(res.data)
      })
  }, [])

  const openGameModale = (game) => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/playersbygame/${game.id}`, {
        headers
      })
      .then((res) => {
        setPlayersList(res.data)
      })
      .catch((err) => {
        console.error(err)
      })

    setModaleGameData(game)
    setGameModale(true)
  }

  console.log(playersList)

  return (
    <>
      <div
        className={`globalcontainerUT ${
          showPlayerContainer ? "fade-in" : "fade-out"
        }`}
      >
        <div
          className="containerFilterAndCardsPlayer"
          style={{ display: showPlayerContainer ? "flex" : "none" }}
        >
          <div className="bigBoxPlayer flip-in-hor-top">
            <h1 className="titleUpcommingTable">Players</h1>
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
                <div className="containeurTitlePlayer">Member since</div>
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
            <div id="upComingTablePlayersCards">
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
          <div className="filterContainerMajorPlayer">
            <div className="bigBoxFilterPlayer">
              <h1 className="titleUpcommingTableFilter2">Find your Players</h1>
              <input
                className="inputUT"
                type="text"
                placeholder="FILTER BY USERNAME"
                value={usernameFilter}
                onChange={handleUsernameFilterChange}
              />

              <input
                className="inputUT"
                type="text"
                placeholder="FILTER BY CITY"
                value={locationFilter}
                onChange={handleLocationFilterChange}
              />

              <button type="buttonGame" onClick={toggleContainer}>
                Find a Game
              </button>
            </div>
          </div>
        </div>
        <div
          className="containerFilterAndCardsGames flip-in-hor-top"
          style={{ display: showPlayerContainer ? "none" : "flex" }}
        >
          <div className="filterContainerMajor">
            <div className="filterContainer">
              <div className="titleUpcommingTableFilter">
                <h1>Find your Game</h1>
              </div>
              <div className="selectUT">
                <select
                  value={maxPlayersFilter}
                  onChange={handleMaxPlayersFilterChange}
                >
                  <option value="">SELECT MAX PLAYER</option>
                  {Array.from({ length: 99 }, (_, i) => i + 1).map((num) => (
                    <option value={num} key={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
              <div className="selectUT">
                <select value={typeFilter} onChange={handleTypeFilterChange}>
                  <option value="">FILTER BY TYPE OF GAME</option>
                  <option value="Horror">Horreur</option>
                  <option value="Adventure">Aventure</option>
                  <option value="Sci-Fi">Science-fiction</option>
                </select>
              </div>
              <input
                className="inputUT"
                type="date"
                placeholder="Filtrer par date"
                value={dateFilter}
                onChange={handleDateFilterChange}
              />

              <input
                className="inputUT"
                type="text"
                placeholder="FILTER BY NAME"
                value={nameFilter}
                onChange={handleNameFilterChange}
              />

              <input
                className="inputUT"
                type="text"
                placeholder="FILTER BY GAMEMASTER"
                value={gmFilter}
                onChange={handleGmFilterChange}
              />

              <input
                className="inputUT"
                type="text"
                placeholder="FILTER BY CITY"
                value={cityFilter}
                onChange={(event) => {
                  setCityFilter(event.target.value)
                }}
              />
              <div className="selectUT">
                <select
                  onChange={handleRpgFilterChange}
                  defaultValue=""
                  value={rpgFilter}
                >
                  <option value="">SELECT YOUR RPG</option>
                  {rpgs.map((rpg) => (
                    <option key={rpg.id} value={rpg.rpg_name}>
                      {rpg.name}
                    </option>
                  ))}
                </select>
              </div>
              <button type="button" onClick={toggleContainer}>
                OR FIND A PLAYER
              </button>
            </div>
          </div>

          <div className="gamecard">
            <h1 className="titleUpcommingTable">Upcoming Table</h1>
            <div className="containerMenuGame">
              <div className="boxTitleGame">
                <img
                  className="iconUpcomingTableGame"
                  src={BladeIcon}
                  alt="icon blade gold"
                />
                <div className="containerTitleUP">Guild</div>
              </div>
              <div className="boxTitleGame">
                <img
                  className="iconUpcomingTableGame"
                  src={ProfilIcon}
                  alt="icon profil gold"
                />
                <div className="containerTitleUP">Gamemaster</div>
              </div>
              <div className="boxTitleGame">
                <img
                  className="iconUpcomingTableGame"
                  src={CalandarIcon}
                  alt="icon calandar gold"
                />
                <div className="containerTitleUP">Date</div>
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
                <div className="containerTitleUP">Players number</div>
              </div>
            </div>
            <div id="upComingGamesCards">
              {games
                .filter(
                  (game) =>
                    cityFilter === "" ||
                    game.city.toLowerCase().includes(cityFilter.toLowerCase())
                )
                .filter(
                  (game) =>
                    maxPlayersFilter === "" ||
                    game.max_players_capacity
                      .toString()
                      .includes(maxPlayersFilter)
                )
                .filter(
                  (game) =>
                    typeFilter === "" ||
                    game.type.toLowerCase().includes(typeFilter.toLowerCase())
                )
                .filter(
                  (game) =>
                    dateFilter === "" ||
                    game.schedule
                      .toLowerCase()
                      .includes(dateFilter.toLowerCase())
                )
                .filter(
                  (game) =>
                    nameFilter === "" ||
                    game.guild_name
                      .toLowerCase()
                      .includes(nameFilter.toLowerCase())
                )
                .filter(
                  (game) =>
                    gmFilter === "" ||
                    game.gm_username
                      .toLowerCase()
                      .includes(gmFilter.toLowerCase())
                )
                .filter(
                  (game) =>
                    rpgFilter === "" ||
                    game.rpg_name
                      .toLowerCase()
                      .includes(rpgFilter.toLowerCase())
                )
                .map((game) => (
                  <div
                    className="UTgameCard"
                    onClick={() => openGameModale(game)}
                  >
                    <div className="UTgameTitle">
                      <h3>{game.guild_name}</h3>
                    </div>
                    <div>
                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL}/${
                          game.gm_profil_picture
                        }`}
                        alt=""
                      />
                      <p className="UTgamemaster">{game.gm_username}</p>
                    </div>
                    <div className="UTdate">
                      <p className="textTable">
                        {moment(game.schedule).format("DD/MM/YYYY")}
                      </p>
                    </div>
                    <div className="UTplace">
                      <p className="textTable">
                        {game.is_remote ? "Remote" : game.city}
                      </p>
                    </div>
                    <div className="UTrpg">
                      <p className="textTable">{game.rpg_name}</p>
                    </div>
                    <div className="UTtype">
                      <p className="textTable">{game.type}</p>
                    </div>
                    <div className="UTplayers">
                      <p className="textTable">{game.max_players_capacity}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {gameModale && (
          <div className="modaleBackgroundUT">
            <div className="modaleUT">
              <CardGame
                gameData={modaleGameData}
                playersProfil={playersList}
                onClose={() => setGameModale(false)}
                openJoinGuild={true}
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default UpcomingTable
