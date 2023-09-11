import React, { useState, useEffect } from "react"
import Cookies from "js-cookie"
import sword from "../../assets/icon-dashboard/sword.svg"
import check from "../../assets/icon-dashboard/check.svg"
import crossDash from "../../assets/icon-dashboard/crossDash.svg"
import axios from "axios"

const FriendRequest = () => {
  const [gamesData, setGamesData] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const tokenFromCookie = Cookies.get("authToken")
  const idUser = Cookies.get("idUser")

  const headers = {
    Authorization: `Bearer ${tokenFromCookie}`,
  }

  console.info(gamesData)
  useEffect(() => {
    isLoading &&
      axios
        .get(`http://localhost:4242/games/${idUser}`, {
          headers,
        })
        .then((response) => {
          setGamesData(response.data)
          setIsLoading(true)
        })
        .catch((error) => {
          console.error("An error occurred:", error)
        })
  }, [isLoading])

  return (
    <div className="Friends-container">
      <div className="Global-friendRequest">
        <img className="sword-logo" src={sword} />
        <h1 className="Request-Title">REQUEST TO JOIN YOURS GUILD</h1>
      </div>
      <div className="Friends-content">
        <div className="friends">
          {/* <img
            src={`${import.meta.env.VITE_BACKEND_URL}/${
              friendData.profil_picture
            }`}
            alt="friend request profil"
          /> */}
          <h2 className="friend-name">MonkeyVodka</h2>
          <p className="wantToJoin">WANT TO JOIN</p>
          <p className="guild-name">{gamesData.name}</p>
          <div className="logo-check">
            <img src={check} alt="logo-accepted" />
          </div>
          <div>
            <div className="logo-rejected">
              <img src={crossDash} alt="logo-rejected" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FriendRequest
