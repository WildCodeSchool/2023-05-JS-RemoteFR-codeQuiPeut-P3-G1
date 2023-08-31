import axios from "axios"
import React, { useContext, useState, useEffect } from "react"
import iconProfile from "../../assets/icon-dashboard/iconProfile.png"
import Add2 from "../../assets/icon-dashboard/Add2.png"
import Edit from "../../assets/icon-dashboard/Edit.png"
import Location from "../../assets/icon-dashboard/Location.png"
import AuthContext from "../AuthContext/AuthContext"
import Cookies from "js-cookie"

import GmCards from "./GmCards"

const MyProfil = () => {
  const [gmCardsVisible, setGmCardsVisible] = useState(true)
  const { user } = useContext(AuthContext)
  console.info(user)
  const [imageUrl, setImageUrl] = useState(null)

  useEffect(() => {
    setImageUrl(`${import.meta.env.VITE_BACKEND_URL}/${user.profil_picture}`)
  }, [user.profil_picture])

  const tokenFromCookie = Cookies.get("authToken")

  console.info("prout", user.profil_picture)

  const shortDate = String(user.registration_date)
    .substring(0, 10)
    .split("-")
    .reverse()
    .join("-")

  const updateProfilPictureOnServer = async (userId, formData) => {
    try {
      const response = await axios.put(
        `http://localhost:4242/users/${userId}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for sending files,
            Authorization: `Bearer ${tokenFromCookie}`,
          },
        }
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

  const handlePictureChange = (e) => {
    const picture = e.target.files[0]

    // Créez un objet FormData pour envoyer la photo
    const formData = new FormData()
    formData.append("myFile", picture)

    setImageUrl(URL.createObjectURL(picture))

    // Appel de la fonction pour mettre à jour la photo de profil sur le serveur
    updateProfilPictureOnServer(user.id, formData)
  }

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
              {user.profil_picture !== null ? (
                <img
                  src={imageUrl}
                  alt="userPicture"
                  name="myFile"
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
      </div>
      {gmCardsVisible && <GmCards />}
      <button onClick={() => setGmCardsVisible(!gmCardsVisible)}>
        {gmCardsVisible ? "Fermer GmCards" : "Afficher GmCards"}
      </button>
    </div>
  )
}
export default MyProfil
