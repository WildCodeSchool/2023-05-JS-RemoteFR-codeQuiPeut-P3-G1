import React, { useContext, useEffect, useState } from "react"
import Cookies from "js-cookie"
import axios from "axios"
import AuthContext from "../components/AuthContext/AuthContext"
import RpgAdding from "../components/profilPage/RpgAdding"

import iconProfil from "../assets/Profil/iconProfil.png.png"
import questionMark from "../assets/Profil/questionMark.png.png"
import Add2 from "../assets/icon-dashboard/Add2.png"
import iconSettings from "../assets/Profil/iconSettings.png.png"
import pinPointer from "../assets/Profil/pinPointer.png.png"
import deleteCross from "../assets/Profil/deleteCross.png"

const Profil = () => {
  const [isEditing, setIsEditing] = useState(false)
  const { user, setUser, setUsers } = useContext(AuthContext)
  const idUser = Cookies.get("idUser")
  const [imageUrl, setImageUrl] = useState(null)
  const [rpgPictures, setRpgPictures] = useState([])
  const [onAddRpg, setOnAddRpg] = useState(false)
  const [refreshPictures, setRefreshPictures] = useState(false)

  const [buttonStates, setButtonStates] = useState({
    profil: false,
    myGames: false,
    social: false
  })

  const tokenFromCookie = Cookies.get("authToken")
  const headers = {
    Authorization: `Bearer ${tokenFromCookie}`
  }

  useEffect(() => {
    axios
      .get(`http://localhost:4242/users`, { headers })
      .then((res) => {
        setUsers(res.data)
      })
      .catch((err) => {
        console.error("Problème lors du chargement des users", err)
      })
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
    setImageUrl(`${import.meta.env.VITE_BACKEND_URL}/${user.profil_picture}`)
  }, [user.profil_picture])

  useEffect(() => {
    axios
      .get(`http://localhost:4242/pictureRPG/${idUser}`, { headers })
      .then((res) => setRpgPictures(res.data))
  }, [user, isEditing, onAddRpg, refreshPictures])

  // console.info(rpgPictures)
  // console.info(idUser)
  // console.info(headers)

  const handleDeleteRpg = (rpgID) => {
    axios
      .delete(
        `${import.meta.env.VITE_BACKEND_URL}/rpgLesser/${idUser}/${rpgID}`,
        {},
        { headers }
      )
      .then((res) => {
        console.info("RPG delete successfully", res.data)
        setRefreshPictures(!refreshPictures)
      })
      .catch((err) => {
        console.error("A problem occured", err)
      })
  }

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

  const shortDate = String(user.registration_date)
    .substring(0, 10)
    .split("-")
    .reverse()
    .join("-")
  // console.info(`${import.meta.env.VITE_BACKEND_URL}/${rpgPictures[0].rpg_icon}`)
  return (
    <div className="mainContainerProfil">
      <div className="questionMark">
        <img src={questionMark} />
      </div>
      <div className="leftBoxMain">
        <img src={iconSettings} />
        <div className="settingsTitle">
          <h1>SETTINGS</h1>
        </div>
        <div className="settingsTab">
          <div
            className={buttonStates.profil ? "Cliked" : "settingsButton"}
            onClick={() =>
              setButtonStates({
                ...buttonStates,
                profil: !buttonStates.profil,
                myGames: false,
                social: false
              })
            }
          >
            <button type="button">PROFILE</button>
          </div>
          <div
            className={buttonStates.myGames ? "Cliked" : "settingsButton"}
            onClick={() =>
              setButtonStates({
                ...buttonStates,
                myGames: !buttonStates.myGames,
                profil: false,
                social: false
              })
            }
          >
            <button type="button">MY GAMES</button>
          </div>
          <div
            className={buttonStates.social ? "Cliked" : "settingsButton"}
            onClick={() =>
              setButtonStates({
                ...buttonStates,
                social: !buttonStates.social,
                myGames: false,
                profil: false
              })
            }
          >
            <button type="button">SOCIAL</button>
          </div>
        </div>
      </div>

      {isEditing === true ? (
        <div className="rightBoxMain">
          <div className="mainTitleProfil">
            <img src={iconProfil} />
            <h1>PROFILE</h1>
          </div>
          <div className="bigBoxRight">
            <div className="titleProfil">PUBLIC INFORMATIONS</div>
            <div className="topBoxProfil">
              <div className="boxDateAndBoxPhoto">
                <div className="boxPhoto">
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
                      <img
                        className="userPicture"
                        src={Add2}
                        alt="logo of a cross"
                      />
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
                <span>Register since {shortDate}</span>
              </div>
              <div className="boxName">
                <div>
                  <span>Username</span>
                </div>
                <div>
                  <input type="text" placeholder={user.username}></input>
                </div>
              </div>
              <div className="localisationBox">
                <div className="countryCityNameBox">
                  <img src={pinPointer} />
                  <span>Country</span>
                </div>
                <input
                  type="text"
                  className="inputCountryCity"
                  placeholder={user.country}
                />
                <div className="countryCityNameBox">
                  <img src={pinPointer} />
                  <span>City</span>
                </div>
                <input
                  type="text"
                  className="inputCountryCity"
                  placeholder={user.location}
                />
              </div>
            </div>
            <div className="bioBoxProfil">
              <div className="bioBoxProfilTitle">Bio on Profil</div>
              <div className="bioBoxProfilText">
                <textarea placeholder={user.description_as_player}></textarea>
              </div>
            </div>
            <div className="gameBoxProfil">
              <div className="gameBoxProfilTitle">
                <h2>SEARCH TO PLAY ON</h2>
              </div>
              <div className="hrDiv">
                <hr />
              </div>
              <div className="compoAndMap">
                <RpgAdding onAddRpg={() => setOnAddRpg(!onAddRpg)} />
                <div className="gameBoxGamesList">
                  {rpgPictures.map((rpgPicture, index) => (
                    <div className="boxRpgPicture" key={index}>
                      <div className="delete">
                        <img
                          src={deleteCross}
                          onClick={() => handleDeleteRpg(rpgPicture.id)}
                        />
                      </div>
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
            <div className="hrDiv">
              <hr />
            </div>
            <div className="bottomBoxProfilEdit">
              <div className="privateInfoBox">
                <h3>PERSONAL</h3>
                <h3>INFORMATIONS</h3>
              </div>

              <hr />
              <div className="mailBox">
                Email adress
                <input
                  type="email"
                  className="inputBottomProfil"
                  placeholder="Enter Your Email"
                />
              </div>
              <div className="changePassword">
                <div className="oldPassword">
                  Current Password
                  <input
                    type="password"
                    className="inputBottomProfil"
                    placeholder="Current password"
                  />
                </div>
                <div className="newPassword">
                  New Password
                  <input
                    type="password"
                    className="inputBottomProfil"
                    placeholder="New password"
                  />
                </div>
                <div />
              </div>
            </div>
          </div>
          <div className="divButtonSwitchValidate">
            <button type="button" onClick={() => setIsEditing(!isEditing)}>
              VALIDATE
            </button>
          </div>
        </div>
      ) : (
        <div className="rightBoxMain">
          <div className="mainTitleProfil">
            <img src={iconProfil} />
            <h1>PROFILE</h1>
          </div>

          <div className="bigBoxRight">
            <div className="titleProfil">PUBLIC INFORMATIONS</div>
            <div className="topBoxProfil">
              <div className="boxDateAndBoxPhoto">
                <div className="boxPhoto">
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
                      <img
                        className="userPicture"
                        src={Add2}
                        alt="logo of a cross"
                      />
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
                <span>Register since {shortDate}</span>
              </div>
              <div className="boxName">
                <div>
                  <span>Username</span>
                </div>
                <div className="displayUsername">
                  <p>{user.username}</p>
                </div>
              </div>
              <div className="localisationBox">
                <div className="countryCityNameBox">
                  <img src={pinPointer} />
                  <span>Country</span>
                </div>
                <div className="countryCityP">
                  <p>{user.country}</p>
                </div>

                <div className="countryCityNameBox">
                  <img src={pinPointer} />
                  <span>City</span>
                </div>
                <div className="countryCityP">
                  <p>{user.location}</p>
                </div>
              </div>
            </div>
            <div className="bioBoxProfil">
              <div className="bioBoxProfilTitle">Bio on Profil</div>
              <div className="bioBoxProfilText">
                {user.description_as_player}
              </div>
            </div>
            <div className="gameBoxProfil">
              <div className="gameBoxProfilTitle">
                <h2>SEARCH TO PLAY ON</h2>
              </div>
              <div className="hrDiv">
                <hr />
              </div>
              <div className="compoAndMap">
                <div className="gameBoxGamesList">
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
            <div className="hrDiv">
              <hr />
            </div>
            <div className="bottomBoxProfil">
              <div className="privateInfoBox">
                <h3>PERSONAL</h3>
                <h3>INFORMATIONS</h3>
              </div>
              <hr />

              <div className="mailBox">
                Email adress
                <p>{user.email_adress}</p>
              </div>
            </div>
          </div>
          <div className="divButtonSwitchEdit">
            <button type="button" onClick={() => setIsEditing(!isEditing)}>
              EDIT PROFILE
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profil
