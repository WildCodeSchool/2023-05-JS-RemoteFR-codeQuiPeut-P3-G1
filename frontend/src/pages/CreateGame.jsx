import axios from "axios"
import React, { useEffect, useState } from "react"

import NavBar from "../components/NavBar/Navbar"

import createGameDice from "../assets/icon-create-game/dice.png"

export default function CreateGame() {
  const [rpgs, setRpgs] = useState([])
  const [rpgID, setRpgID] = useState("")
  const [gm, setGm] = useState("")
  const [date, setDate] = useState("")
  const [place, setPlace] = useState("")
  const [playersCapacity, setPlayersCapacity] = useState("")
  const [desc, setDesc] = useState("")

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
          <h1>DASHBOARD</h1>
        </div>
        <form id="createGameForm" onSubmit={handleCreateUser}>
          <select
            type="select"
            onChange={(event) => setRpgID(event.target.value)}
            id="createGameSelecter"
          >
            <option value="">Sélectionnez le jeu de votre choix</option>
            {rpgs.map((rpg) => (
              <option key={rpg.id} value={rpg.id}>
                {rpg.name}
              </option>
            ))}
          </select>
          <div id="createGameInputs">
            {/* <input
              type="text"
              placeholder="id du RPG"
              onChange={(e) => setRpgID(e.target.value)}
            /> */}
            <input
              type="text"
              placeholder="id du GM"
              onChange={(e) => setGm(e.target.value)}
            />
            <input
              type="datetime-local"
              onChange={(e) => setDate(e.target.value)}
            />
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
            <button type="submit">Créer ma partie</button>
          </div>
        </form>
      </div>
    </main>
  )
}
