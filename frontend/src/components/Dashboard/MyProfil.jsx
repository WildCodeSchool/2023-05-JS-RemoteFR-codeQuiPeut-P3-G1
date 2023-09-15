import axios from "axios"
import React, { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import Cookies from "js-cookie"

import Add2 from "../../assets/icon-dashboard/Add2.png"
import Edit from "../../assets/icon-dashboard/Edit.svg"
import Location from "../../assets/icon-dashboard/Location.png"
import AuthContext from "../AuthContext/AuthContext"
import profilePictureLogo from "../../assets/icon-dashboard/profilePictureLogo.svg"
// import gameLogo from "../../assets/icon-dashboard/gameLogo.png"

const MyProfil = () => {
  const { user } = useContext(AuthContext)
  const [imageUrl, setImageUrl] = useState(null)
  const [rpgPictures, setRpgPictures] = useState([])
  const idUser = Cookies.get("idUser")

  useEffect(() => {
    setImageUrl(`${import.meta.env.VITE_BACKEND_URL}/${user.profil_picture}`)
  }, [user.profil_picture])

  useEffect(() => {
    axios
      .get(`http://localhost:4242/pictureRPG/${idUser}`, { headers })
      .then((res) => setRpgPictures(res.data))
  }, [user])

  const tokenFromCookie = Cookies.get("authToken")
  const headers = {
    Authorization: `Bearer ${tokenFromCookie}`
  }

  const shortDate = String(user.registration_date)
    .substring(0, 10)
    .substring(5, 10)
    .split("-")
    .join("-")
    .concat("-", String(user.registration_date).substring(0, 4))

  const updateProfilPictureOnServer = async (userId, formData) => {
    try {
      const response = await axios.put(
        `http://localhost:4242/users/${userId}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for sending files,
            Authorization: `Bearer ${tokenFromCookie}`
          }
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
      <div className="titleMyProfil">
        <div className="profilePic-container">
          <img
            id="logoProfile"
            src={profilePictureLogo}
            alt="logo of a profile"
          />
        </div>
        <h2>MY PROFIL</h2>
      </div>
      <div className="contentMyProfil">
        <div className="editProfile">
          <Link to="/profil">
            <button type="button" id="editButton">
              <img id="logoEdit" src={Edit} alt="logo of a pen" />
              <p>Edit Profile</p>
            </button>
          </Link>
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
              <h2>registered since {shortDate}</h2>
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
            {user.description_as_player === "null"
              ? "Warning: No bio founded on this profile. Dear user, please consider adding a bio to let others know more about you !"
              : user.description_as_player}
          </p>
        </div>
        <div className="bottomProfile">
          <h1>MY GAMES / SEARCH TO PLAY ON</h1>
          <div className="gamesContainer">
            {rpgPictures.map((rpgPicture, index) => (
              <div className="boxRpgPicture" key={index}>
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${
                    rpgPicture.rpg_icon
                  }`}
                  alt={`Image for game with ID ${rpgPicture.rpg_icon}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default MyProfil
