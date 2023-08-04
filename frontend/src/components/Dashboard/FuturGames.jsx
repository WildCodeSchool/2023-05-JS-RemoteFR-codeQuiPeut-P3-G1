import "./FuturGames.scss"
// import axios from "axios"
// import React, { useEffect, useState } from "react"

import Search from "../../assets/icon-dashboard/Search.png"
import Dice from "../../assets/icon-dashboard/Dice.png"
import Add from "../../assets/icon-dashboard/Add.png"

export default function futurGames() {
  // const [games, setGames] = useState([])
  // useEffect(() => {
  //   axios.get("http://localhost:4242/games").then((res) => setGames(res.data))
  //   console.info(games)
  // }, [])

  return (
    <div className="myFutureGames">
      <img id="logoFutureGames" src={Dice} alt="logo of D20" />
      <h2>MY FUTURE GAMES</h2>
      <div className="contentFutureGames">
        <div className="contentWindow">
          <div className="divButtonsss">
            <div className="logoContentFG">
              <img id="logoAdd" src={Add} alt="logo of a cross" />
              <img id="logoSearch" src={Search} alt="logo of a magnifier" />
            </div>
          </div>
          <p>
            You are not registered for any games yet Check the list of upcoming
            games or click on bouton find your party
          </p>
          <button id="partyFinder" type="button">
            FIND YOUR PARTY
          </button>
        </div>
      </div>
    </div>
  )
}

// <div>
//   {" "}
//   {games.map((game) => (
//     <div key={game.id}>
//       <ul>
//         <li>{game.role_playing_game_id}</li>
//         <li>{game.gm_profiles_id}</li>
//         <li>{game.schedule}</li>
//         <li>{game.location}</li>
//         <li>{game.max_players_capacity}</li>
//         <li>{game.description}</li>
//         <li>{game.filters_id}</li>
//       </ul>
//     </div>
//   ))}
// </div>
