import React, { useContext, useEffect, useState } from "react"
import Cookies from "js-cookie"
import axios from "axios"
import AuthContext from "../components/AuthContext/AuthContext"
import iconProfil from "../assets/Profil/iconProfil.png.png"
import questionMark from "../assets/Profil/questionMark.png.png"
import Add2 from "../assets/icon-dashboard/Add2.png"

const Profil = () => {
  const { user, setUser, setUsers } = useContext(AuthContext)
  // const [gameData, setGameData] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const idUser = Cookies.get("idUser")
  const [imageUrl, setImageUrl] = useState(null)
  // const [newUsername, setNewUsername] = useState(user.username)
  // const [switchPassword, setSwitchpassWord] = useState(false)
  // const [isEditingBioBox, setIsEditingBioBox] = useState(false)
  // const [newDescription, setNewDescription] = useState(
  //   user.description_as_player
  // )
  const [buttonStates, setButtonStates] = useState({
    profil: false,
    myGames: false,
    social: false,
  })

  const tokenFromCookie = Cookies.get("authToken")
  const headers = {
    Authorization: `Bearer ${tokenFromCookie}`,
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
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:4242/role-playing-games", { headers })
  //     .then((response) => {
  //       setGameData(response.data[1])
  //       console.info(gameData)
  //     })
  //     .catch((error) => {
  //       console.error("An error occurred:", error)
  //     })
  // }, [])
  // const handleKeyPressEnter = (event) => {
  //   if (event.key === "Enter") {
  //     buttonRef.current.click()
  //   }
  // }

  // const handleKeyPressEscape = (event) => {
  //   if (event.key === "Escape") {
  //     onClose();
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("keydown", handleKeyPressEscape);
  //   return () => {
  //     document.removeEventListener("keydown", handleKeyPressEscape);
  //   };
  // }, []);
  // onKeyDown={handleKeyPressEnter} // mettre au niveau des boutons fermants

  const shortDate = String(user.registration_date)
    .substring(0, 10)
    .split("-")
    .reverse()
    .join("-")

  return (
    <div className="mainContainerProfil">
      <div className="questionMark">
        <img src={questionMark} />
      </div>
      <div className="leftBoxMain">
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
                social: false,
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
                social: false,
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
                profil: false,
              })
            }
          >
            <button type="button">SOCIAL</button>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          setIsEditing(!isEditing)
        }}
      >
        Click tamere
      </button>
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
              <div className="boxName"></div>
              <div className="localisationBox">
                <span>Country</span>
                <input
                  type="text"
                  className="inputCountryCity"
                  placeholder="Enter your country"
                />
                <span>City</span>
                <input
                  type="text"
                  className="inputCountryCity"
                  placeholder="Enter Your City"
                />
              </div>
            </div>
            <div className="bioBoxProfil">
              <div className="bioBoxProfilText">
                <div className="bioBoxProfilTitle">Bio on Profil</div>
              </div>
            </div>
            <div className="gameBoxProfil">
              <div className="gameBoxProfilTitle">
                <h2>SEARCH TO PLAY ON</h2>
              </div>
              <div className="hrDiv">
                <hr />
              </div>

              <div className="gameBoxGamesList">composant gamelist</div>
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
              <div className="boxName"></div>
              <div className="localisationBox">
                <span>Country</span>
                <input
                  type="text"
                  className="inputCountryCity"
                  placeholder="Enter your country"
                />
                <span>City</span>
                <input
                  type="text"
                  className="inputCountryCity"
                  placeholder="Enter Your City"
                />
              </div>
            </div>
            <div className="bioBoxProfil">
              <div className="bioBoxProfilText">
                <div className="bioBoxProfilTitle">Bio on Profil</div>
              </div>
            </div>
            <div className="gameBoxProfil">
              <div className="gameBoxProfilTitle">
                <h2>SEARCH TO PLAY ON</h2>
              </div>
              <div className="hrDiv">
                <hr />
              </div>

              <div className="gameBoxGamesList">composant gamelist</div>
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
        </div>
      )}
    </div>
  )
}

export default Profil
