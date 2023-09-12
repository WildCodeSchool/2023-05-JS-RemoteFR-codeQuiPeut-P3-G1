import React, { useContext, useEffect, useState } from "react"
import Cookies from "js-cookie"
import axios from "axios"
import AuthContext from "../AuthContext/AuthContext"

const RpgAdding = ({ onAddRpg }) => {
  const { setUser } = useContext(AuthContext)
  const idUser = Cookies.get("idUser")
  const [gameRPGList, setGameRPGList] = useState([])
  const [gameRPGID, setGameRPGID] = useState("")

  const tokenFromCookie = Cookies.get("authToken")
  const headers = {
    Authorization: `Bearer ${tokenFromCookie}`,
  }

  useEffect(() => {
    axios
      .get(`http://localhost:4242/users/${idUser}`, { headers })
      .then((res) => {
        setUser(res.data)
      })
      .catch((err) => {
        console.error("Problème lors du chargement des users", err)
      })
  }, [])

  useEffect(() => {
    axios
      .get("http://localhost:4242/role-playing-games", { headers })
      .then((res) => setGameRPGList(res.data))
  }, [])

  const handleAddRpg = () => {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/rpgAdder/${idUser}/${gameRPGID}`,
        {},
        { headers }
      )
      .then((res) => {
        console.info("RPG added successfully", res.data)
        onAddRpg()
      })
      .catch((err) => {
        console.error("Problème lors de l'ajout du rpg", err)
      })
  }

  return (
    <div className="mainBoxRpgAdding">
      <label htmlFor="rpgNameSelecter">
        <p>Select Your Game</p>
        <div className="createGameSelect">
          <select
            onChange={(event) => setGameRPGID(event.target.value)}
            id="rpgNameSelecter"
            defaultValue=""
          >
            <option value="" disabled>
              Select your game
            </option>
            {gameRPGList.map((rpg) => (
              <option key={rpg.id} value={rpg.id}>
                {rpg.name}
              </option>
            ))}
          </select>
          <div className="divButtonRpg">
            <button type="button" onClick={() => handleAddRpg()}>
              Add this RPG to your list
            </button>
          </div>
        </div>
      </label>
    </div>
  )
}

export default RpgAdding
