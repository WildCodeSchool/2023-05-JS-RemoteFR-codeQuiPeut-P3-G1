import axios from "axios"
import React, { useState, useContext, useEffect } from "react"
import iconProfile from "../../assets/icon-dashboard/iconProfile.png"
import Add2 from "../../assets/icon-dashboard/Add2.png"
import Edit from "../../assets/icon-dashboard/Edit.png"
import Location from "../../assets/icon-dashboard/Location.png"
import AuthContext from "../AuthContext/AuthContext"

import GmCards from "./GmCards"

const MyProfil = () => {
  const [isGmCardsOpen, setIsGmCardsOpen] = useState(false)
  const toggleGmCards = () => {
    setIsGmCardsOpen(!isGmCardsOpen)
  }

  const { user } = useContext(AuthContext)

  // const [userPicture, setUserPicture] = useState(null);
  const [imageUrl, setImageUrl] = useState(
    user.profil_picture !== null ? user.profil_picture : null
  )

  const longDate = user.registration_date
  const shortDate = longDate.substring(0, 10)

  const handlePictureChange = (e) => {
    const picture = e.target.files[0]
    setImageUrl(URL.createObjectURL(picture))

    // updateProfilPictureOnServer(user.id, URL.createObjectURL(picture));
  }

  const updateProfilPictureOnServer = async (userId, newProfilPicture) => {
    try {
      const response = await axios.put(
        `http://localhost:4242/users/${userId}/updateProfilPicture`,
        newProfilPicture
      )
      return response.data
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de la photo de profil :",
        error
      )
      throw error
    }
  }
  useEffect(() => {
    console.info(imageUrl)
  }, [imageUrl])

  return (
    <div className="myProfil">
      <div className="titleProfil">
        <img id="logoProfile" src={iconProfile} alt="logo of a profile" />
        <h2>MY PROFIL</h2>
      </div>
      <div className="contentMyProfil">
        <div className="editProfile">
          <button type="button" id="editButton">
            <img id="logoEdit" src={Edit} alt="logo of a pen" />
            <p>Edit Profile</p>
          </button>
        </div>
        <div className="topProfile">
          <div className="logoAdd2">
            <label htmlFor="buttonPicture">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="userPicture"
                  className="userPicture"
                  id="profilPictureForm"
                />
              ) : (
                <img className="userPicture" src={Add2} alt="logo of a cross" />
              )}
            </label>
            <input
              type="file"
              id="buttonPicture"
              accept="image/*"
              onChange={(e) => {
                handlePictureChange(e)
                updateProfilPictureOnServer(user.id, imageUrl)
              }}
              style={{ display: "none" }}
            />
          </div>
          <div className="centralDiv">
            <div className="userInfoProfile">
              <p>{user.username}</p>
              <h2>{shortDate}</h2>
            </div>
            <div className="locationProfile">
              <img
                id="logoLocation"
                src={Location}
                alt="logo of a map pointer"
              />
              <p>{user.location}</p>
            </div>
          </div>
          <div className="profileButton">
            <p>{user.is_gamemaster === 0 ? "PLAYER" : "GAMEMASTER"}</p>
          </div>
        </div>
        <div className="middleProfile">
          <p>
            {user.description === "null"
              ? "Warning: No bio founded on this profile. Dear user, please consider adding a bio to let others know more about you !"
              : user.description}
          </p>
        </div>
        <div className="bottomProfile">
          <h1>MY GAMES / SEARCH TO PLAY ON</h1>
        </div>
        <button onClick={toggleGmCards}>
          {isGmCardsOpen ? "Close GmCards" : "Show GmCards"}
        </button>
      </div>
      <button onClick={toggleGmCards}>
        {isGmCardsOpen ? "Close GmCards" : "Show GmCards"}
      </button>
      {isGmCardsOpen && <GmCards onClose={toggleGmCards} />}
    </div>
  )
}

export default MyProfil
