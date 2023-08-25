import axios from "axios"
import React, { useEffect, useState } from "react"

import NavBar from "../components/NavBar/Navbar"

import createGameDice from "../assets/icon-create-game/dice.png"

export default function CreateGame() {
  const [rpgs, setRpgs] = useState([])
  // const [gameCategories, setGameCategories] = usestate(gameCategoriesTest)
  const [rpgID, setRpgID] = useState("")
  const [gm, setGm] = useState("")
  const [date, setDate] = useState("")
  const [place, setPlace] = useState("")
  const [playersCapacity, setPlayersCapacity] = useState("")
  const [desc, setDesc] = useState("")

  const gameCategoriesTest = [
    {
      id: 1,
      name: "horror",
    },
    {
      id: 2,
      name: "adventure",
    },
    {
      id: 3,
      name: "sci-fi",
    },
  ]

  useEffect(() => {
    axios
      .get("http://localhost:4242/role-playing-games")
      .then((res) => setRpgs(res.data))
  }, [])

  const handleCreateUser = (e) => {
    e.preventDefault()
    axios
      .post("http://localhost:4242/games", {
        role_playing_game_id: rpgID,
        gm_profiles_id: gm,
        schedule: date,
        location: place,
        max_players_capacity: playersCapacity,
        description: desc,
      })
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

  return (
    <main id="createGameGlobal">
      <NavBar />
      <div id="contentCreateGame">
        <div id="createGameTitle">
          <img src={createGameDice} />
          <h1>CREATE GAME</h1>
        </div>
        <label htmlFor="idGm">
          <p style={{ color: "white" }}>ID du GM</p>
          <input
            type="text"
            name="idGm"
            onChange={(e) => setGm(e.target.value)}
          />
        </label>
        <form id="createGameForm" onSubmit={handleCreateUser}>
          <div id="createGameFirstGroup">
            <label htmlFor="guildName">
              <p>Guild's Name</p>
              <input
                type="text"
                // onChange={(e) => setPlace(e.target.value)}
                name="guildName"
              />
            </label>
            <label htmlFor="gameTypeSelecter">
              <p>Game Type</p>
              <div className="createGameSelect">
                <select
                  // onChange={(event) => nomduSeter(event.target.value)}
                  name="format"
                  id="gameTypeSelecter"
                >
                  <option selected disabled>
                    Select your categorie
                  </option>
                  <option value=""></option>
                  {gameCategoriesTest.map((gameCategorie) => (
                    <option key={gameCategorie.id} value={gameCategorie.id}>
                      {gameCategorie.name}
                    </option>
                  ))}
                </select>
              </div>
            </label>
            <label htmlFor="rpgNameSelecter">
              <p>Based on RPG</p>
              <div className="createGameSelect">
                <select
                  onChange={(event) => setRpgID(event.target.value)}
                  id="rpgNameSelecter"
                >
                  <option selected disabled>
                    Select your game
                  </option>
                  <option value=""></option>
                  {rpgs.map((rpg) => (
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
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
              <p>Campaign</p>
            </div>
            <div id="createGameInputs">
              {/* <input
              type="text"
              placeholder="id du RPG"
              onChange={(e) => setRpgID(e.target.value)}
            /> */}
              <label htmlFor="date">
                <p>Date</p>
                <input
                  type="datetime-local"
                  onChange={(e) => setDate(e.target.value)}
                  name="date"
                />
              </label>
              <input
                type="text"
                placeholder="ville"
                onChange={(e) => setPlace(e.target.value)}
              />
              <input
                type="text"
                placeholder="Capacité max"
                onChange={(e) => setPlayersCapacity(e.target.value)}
              />
              <input
                type="text"
                placeholder="description"
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
          </div>
          <button type="submit">VALIDATE</button>
        </form>
      </div>
    </main>
  )
}
