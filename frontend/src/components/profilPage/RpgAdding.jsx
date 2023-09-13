import React, { useContext, useEffect, useState } from "react"
import Cookies from "js-cookie"
import axios from "axios"
import AuthContext from "../AuthContext/AuthContext"

import AddButton from "../../assets/Profil/AddButton.png"
import ClosingCross from "../../assets/Profil/crossDash.png"

const RpgAdding = ({ onAddRpg }) => {
  const { setUser } = useContext(AuthContext)
  const idUser = Cookies.get("idUser")
  const [gameRPGList, setGameRPGList] = useState([])
  const [isPopupRpg, setIsPopupRpg] = useState(false)

  const tokenFromCookie = Cookies.get("authToken")
  const headers = {
    Authorization: `Bearer ${tokenFromCookie}`,
  }

  const handleKeyPressEscape = (event) => {
    if (event.key === "Escape") {
      setIsPopupRpg(false)
    }
  }

  const handleOverlayClick = (e) => {
    if (e.target.id === "overlay") {
      setIsPopupRpg(false)
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPressEscape)
    return () => {
      document.removeEventListener("keydown", handleKeyPressEscape)
    }
  }, [])

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

  const handleAddRpg = (rpgID) => {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/rpgAdder/${idUser}/${rpgID}`,
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
      <div className="divButtonRpg">
        <img src={AddButton} onClick={() => setIsPopupRpg(!isPopupRpg)} />
      </div>
      <div
        className={isPopupRpg === true ? "popupTrue" : "popupFalse"}
        id="overlay"
        onClick={handleOverlayClick}
      >
        <div className="popupContainer">
          <div className="closingCross">
            <img
              src={ClosingCross}
              onClick={() => setIsPopupRpg(!isPopupRpg)}
            />
          </div>
          <div className="titlePopup">
            <span>ALL RPG</span>
          </div>
          <div className="containerBoxImg">
            {gameRPGList.map((rpg) => (
              <div className="boxImgRpg" key={rpg.id} value={rpg.id}>
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${rpg.rpg_icon}`}
                  onClick={() => handleAddRpg(rpg.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RpgAdding
