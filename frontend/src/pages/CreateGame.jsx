import "./CreateGame.scss"
import axios from "axios"
import React, { useState } from "react"

export default function CreateGame() {
  const [rpgs, setRpgs] = useState([])
  useEffect(() => {
    axios
      .get("http://localhost:4242/role-playing-games")
      .then((res) => setRpgs(res.data))
  }, [])

  const handleCreateUser = () => {
    axios
      .post("http://localhost:4242/games", {
        role_playing_game_id: usernameDb,
        gm_profiles_id: passwordDb,
        schedule: passwordDb,
        location: passwordDb,
        max_players_capacity: passwordDb,
        description: passwordDb,
        filters_id: passwordDb,
      })
      .then((res) => {
        if (res.status === 200) {
          console.info("Partie créée avec succès !")
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la création de la partie :", error)
      })
    // console.info(usernameDb + passwordDb)
  }

  //   const [rpgID, setRpgID] = useState("")
  //   const [gm, setPasswordDb] = useState("")

  const handleUser = (e) => {
    setUsernameDb(e.target.value)
  }
  const handlePass = (e) => {
    setPasswordDb(e.target.value)
  }
  return (
    <>
      <p>je suis dans la page creategame</p>
      {rpgs.map((rpg) => (
        <select key={rpg.id}>
          <li>{rpg.name}</li>
        </select>
      ))}
      <header className="App-header">
        <input type="text" placeholder="username" />
        <input type="text" placeholder="pass" />
        <button onClick={handleCreateUser}>Créer ma partie</button>
      </header>
    </>
  )
}
