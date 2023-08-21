import "./CreateGame.scss"
import axios from "axios"
import React, { useEffect, useState } from "react"
import NavBar from "../components/NavBar/Navbar"

export default function CreateGame() {
  // const form = useRef()
  const [rpgs, setRpgs] = useState([])

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
        filters_id: filterID,
      })
      .then((res) => {
        if (res.status === 200) {
          console.info("Partie créée avec succès !")
        }
        document.getElementById("createGameForm").reset()
      })
      .catch((error) => {
        console.error("Erreur lors de la création de la partie :", error)
      })
  }

  const [rpgID, setRpgID] = useState("")
  const [gm, setGm] = useState("")
  const [date, setDate] = useState("")
  const [place, setPlace] = useState("")
  const [playersCapacity, setPlayersCapacity] = useState("")
  const [desc, setDesc] = useState("")
  const [filterID, setFilterID] = useState("")

  return (
    <main id="createGameGlobal">
      <NavBar />
      <p style={{ color: "white" }}>je suis dans la page creategame</p>
      {rpgs.map((rpg) => (
        <select key={rpg.id}>
          <option>{rpg.name}</option>
        </select>
      ))}
      <header className="App-header">
        <div id="createGameInputs">
          <form id="createGameForm" onSubmit={handleCreateUser}>
            <input
              type="text"
              placeholder="id du RPG"
              onChange={(e) => setRpgID(e.target.value)}
            />
            <input
              type="text"
              placeholder="id du GM"
              onChange={(e) => setGm(e.target.value)}
            />
            <input
              type="datetime-local"
              onChange={(e) => setDate(e.target.value)}
            ></input>
            <input
              type="text"
              placeholder="ville"
              onChange={(e) => setPlace(e.target.value)}
            ></input>
            <input
              type="text"
              placeholder="Capacité max"
              onChange={(e) => setPlayersCapacity(e.target.value)}
            ></input>
            <input
              type="text"
              placeholder="description"
              onChange={(e) => setDesc(e.target.value)}
            ></input>
            <input
              type="text"
              placeholder="id du filter"
              onChange={(e) => setFilterID(e.target.value)}
            ></input>
            <button type="submit">Créer ma partie</button>
          </form>
        </div>
      </header>
    </main>
  )
}
