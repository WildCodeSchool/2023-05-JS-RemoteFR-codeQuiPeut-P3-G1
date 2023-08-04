import "./FuturGames.scss"
import axios from "axios"
import React, { useEffect, useState } from "react"

export default function futurGames() {
  const [games, setGames] = useState([])
  useEffect(() => {
    axios.get("http://localhost:4242/games").then((res) => setGames(res.data))
    console.info(games)
  }, [])

  return (
    <div>
      {" "}
      {games.map((game) => (
        <div key={game.id}>
          <ul>
            <li>{game.role_playing_game_id}</li>
            <li>{game.gm_profiles_id}</li>
            <li>{game.schedule}</li>
            <li>{game.location}</li>
            <li>{game.max_players_capacity}</li>
            <li>{game.description}</li>
            <li>{game.filters_id}</li>
          </ul>
        </div>
      ))}
    </div>
  )
}
