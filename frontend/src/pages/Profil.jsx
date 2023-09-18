import React, { useContext, useEffect, useState } from "react"
import Cookies from "js-cookie"
import axios from "axios"
import AuthContext from "../components/AuthContext/AuthContext"
import RpgAdding from "../components/profilPage/RpgAdding"
import RequestGM from "../components/profilPage/RequestGM"

import iconProfil from "../assets/Profil/iconProfil.png.png"
import questionMark from "../assets/Profil/questionMark.png.png"
import Add2 from "../assets/icon-dashboard/Add2.png"
import iconSettings from "../assets/Profil/iconSettings.png.png"
import pinPointer from "../assets/Profil/pinPointer.png.png"
import deleteCross from "../assets/Profil/deleteCross.png"
import calendar from "../assets/Profil/calendar.png"

const Profil = () => {
  const [isEditing, setIsEditing] = useState(false)
  const { user, setUser, setUsers } = useContext(AuthContext)
  const idUser = Cookies.get("idUser")
  const [imageUrl, setImageUrl] = useState(null)
  const [rpgPictures, setRpgPictures] = useState([])
  const [onAddRpg, setOnAddRpg] = useState(false)
  const [refreshPictures, setRefreshPictures] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [validateRequestData, setValidateRequestData] = useState([])
  const [pendingRequestData, setPendingRequestData] = useState([])
  const [gameHistoryPlayerData, setGameHistoryPlayerData] = useState([])
  const [upcommingGameGMData, setUpcommingGameGMData] = useState([])
  const [historyGameGMData, setHistoryGameGMData] = useState([])
  const [isPlayer, setIsPlayer] = useState(true)

  const [buttonStates, setButtonStates] = useState({
    mainDiv: true,
    myGames: false,
    social: false
  })

  const tokenFromCookie = Cookies.get("authToken")
  const headers = {
    Authorization: `Bearer ${tokenFromCookie}`
  }

  const [formData, setFormData] = useState({
    username: user.username || "",
    country: user.country || "",
    city: user.city || "",
    description_as_player: user.description_as_player || ""
  })

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
        console.error("A problem occurred", err)
      })
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/validateRequests/${idUser}`, {
        headers
      })
      .then((response) => {
        setValidateRequestData(response.data)
      })
      .catch((error) => {
        console.error("An error occurred:", error)
      })
  }, [])

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/pendingRequests/${idUser}`, {
        headers
      })
      .then((response) => {
        setPendingRequestData(response.data)
      })
      .catch((error) => {
        console.error("An error occurred:", error)
      })
  }, [])

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/gameHistoryPlayer/${idUser}`, {
        headers
      })
      .then((response) => {
        setGameHistoryPlayerData(response.data)
      })
      .catch((error) => {
        console.error("An error occurred:", error)
      })
  }, [])

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/upcommingGameGM/${idUser}`, {
        headers
      })
      .then((response) => {
        setUpcommingGameGMData(response.data)
      })
      .catch((error) => {
        console.error("An error occurred:", error)
      })
  }, [])

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/historyGameGM/${idUser}`, {
        headers
      })
      .then((response) => {
        setHistoryGameGMData(response.data)
      })
      .catch((error) => {
        console.error("An error occurred:", error)
      })
  }, [])

  // console.info(pendingRequestData)
  // console.info(validateRequestData)

  // const modifyProfil = () => {
  //   if (newPassword !== user.currentPassword) {
  //     if (currentPassword !== user.currentPassword) {
  //       console.error("Mot de passe actuel incorrect");
  //       return;
  //     }
  //   }
  //   axios
  //     .put(
  //       `${import.meta.env.VITE_BACKEND_URL}/modifyProfil/${idUser}`, formData, { headers }
  //     )
  //     .then((res) => {
  //       console.info("data user successfully updated", res.data)
  //       setUser(res.data);
  //       setIsEditing(false);
  //     })
  //     .catch((err) => {
  //       console.error("Problème lors du changement des données du user", err)
  //     })
  // }

  const updateProfilPictureOnServer = async (userId, formData) => {
    try {
      const response = await axios.put(
        `http://localhost:4242/users/${userId}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for sending files;
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

  console.info("caca", upcommingGameGMData)

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
            className={buttonStates.mainDiv ? "Cliked" : "settingsButton"}
            onClick={() =>
              setButtonStates({
                ...buttonStates,
                mainDiv: !buttonStates.mainDiv,
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
                mainDiv: false,
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
                mainDiv: false
              })
            }
          >
            <button type="button">SOCIAL</button>
          </div>
        </div>
      </div>
      {buttonStates.myGames === true && (
        <div className="rightBoxMain">
          <div className="mainTitleProfil">
            <img src={iconProfil} />
            <h1>MY GAMES</h1>
          </div>
          <div className="bigBoxRight">
            <div className="topDivMyGames">
              <div className="middleTopDiv">
                <span>{isPlayer === true ? "PLAYER" : "GAMEMASTER"}</span>
              </div>
              <div className="leftTopDiv">
                PLAYER
                <input
                  type="checkbox"
                  id="switch"
                  onClick={() => setIsPlayer(!isPlayer)}
                />
                <label htmlFor="switch">
                  <p></p>
                </label>
                GM
              </div>
            </div>

            {isPlayer === false && (
              <>
                <div className="validateDiv">
                  <div className="titleValidate">UPCOMMING GAMES</div>
                  <div className="displayValidate">
                    {upcommingGameGMData.map((validated, index) => {
                      const date = new Date(validated.schedule)
                      const formatedDate = date.toISOString().split("T")[0]
                      return (
                        <div className="boxValidatedGame" key={index}>
                          <div className="scheduleDiv">
                            <div className="pictureCalendar">
                              <img src={calendar} />
                            </div>
                            <div className="dateCalendar">{formatedDate}</div>
                            <hr className="hrBoxMyGames"></hr>
                          </div>
                          <div className="guildNameDiv">
                            GUILD : {validated.guild_name}
                          </div>
                          <div className="typeDiv">
                            <p>
                              {validated.is_campaign === 1
                                ? "Campaign"
                                : "One Shot"}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="waitingValidationDiv">
                  <RequestGM />
                </div>
                <div className="invitationDiv">
                  <div className="titleInvitation">INVITATION FOR GAMES</div>
                  <div className="displayInvitation">
                    .map invitation à faire ici
                  </div>
                </div>
                <div className="historyDiv">
                  <div className="titleHistory">HISTORY</div>
                  <div className="displayHistory">
                    {historyGameGMData.map((history, index) => {
                      const date = new Date(history.schedule)
                      const formatedDate = date.toISOString().split("T")[0]
                      return (
                        <div className="boxHistoryGame" key={index}>
                          <div className="scheduleDiv">
                            <div className="pictureCalendar">
                              <img src={calendar} />
                            </div>
                            <div className="dateCalendar">{formatedDate}</div>
                            <hr className="hrBoxMyGames"></hr>
                          </div>
                          <div className="guildNameDiv">
                            GUILD : {history.guild_name}
                          </div>
                          <div className="typeDiv">
                            <p>
                              {history.is_campaign === 1
                                ? "Campaign"
                                : "One Shot"}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </>
            )}

            {isPlayer === true && (
              <>
                <div className="validateDiv">
                  <div className="titleValidate">VALIDATED</div>
                  <div className="displayValidate">
                    {validateRequestData.map((validated, index) => {
                      const date = new Date(validated.schedule)
                      const formatedDate = date.toISOString().split("T")[0]
                      return (
                        <div className="boxValidatedGame" key={index}>
                          <div className="scheduleDiv">
                            <div className="pictureCalendar">
                              <img src={calendar} />
                            </div>
                            <div className="dateCalendar">{formatedDate}</div>
                            <hr className="hrBoxMyGames"></hr>
                          </div>
                          <div className="guildNameDiv">
                            GUILD : {validated.guild_name}
                          </div>
                          <div className="typeDiv">
                            <p>
                              {validated.is_campaign === 1
                                ? "Campaign"
                                : "One Shot"}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="waitingValidationDiv">
                  <div className="titlewaiting">WAITING FOR VALIDATION</div>
                  <div className="displayWaiting">
                    {pendingRequestData.map((pending, index) => {
                      const date = new Date(pending.schedule)
                      const formatedDate = date.toISOString().split("T")[0]
                      return (
                        <div className="boxPendingateGame" key={index}>
                          <div className="scheduleDiv">
                            <div className="pictureCalendar">
                              <img src={calendar} />
                            </div>
                            <div className="dateCalendar">{formatedDate}</div>
                            <hr className="hrBoxMyGames"></hr>
                          </div>
                          <div className="guildNameDiv">
                            GUILD : {pending.guild_name}
                          </div>
                          <div className="typeDiv">
                            <p>
                              {pending.is_campaign === 1
                                ? "Campaign"
                                : "One Shot"}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="invitationDiv">
                  <div className="titleInvitation">INVITATION FOR GAMES</div>
                  <div className="displayInvitation">
                    .map invitation à faire ici
                  </div>
                </div>
                <div className="historyDiv">
                  <div className="titleHistory">HISTORY</div>
                  <div className="displayHistory">
                    {gameHistoryPlayerData.map((history, index) => {
                      const date = new Date(history.schedule)
                      const formatedDate = date.toISOString().split("T")[0]
                      return (
                        <div className="boxHistoryGame" key={index}>
                          <div className="scheduleDiv">
                            <div className="pictureCalendar">
                              <img src={calendar} />
                            </div>
                            <div className="dateCalendar">{formatedDate}</div>
                            <hr className="hrBoxMyGames"></hr>
                          </div>
                          <div className="guildNameDiv">
                            GUILD : {history.guild_name}
                          </div>
                          <div className="typeDiv">
                            <p>
                              {history.is_campaign === 1
                                ? "Campaign"
                                : "One Shot"}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {isEditing === true && buttonStates.mainDiv === true && (
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
                  <input
                    type="text"
                    placeholder={user.username}
                    value={formData.username}
                    onChange={handleFormChange}
                    name="username"
                  />
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
                  name="country"
                  value={formData.country}
                  onChange={handleFormChange}
                />
                <div className="countryCityNameBox">
                  <img src={pinPointer} />
                  <span>City</span>
                </div>
                <input
                  type="text"
                  className="inputCountryCity"
                  placeholder={user.city}
                  name="city"
                  value={formData.city}
                  onChange={handleFormChange}
                />
              </div>
            </div>
            <div className="bioBoxProfil">
              <div className="bioBoxProfilTitle">Bio on Profil</div>
              <div className="bioBoxProfilText">
                <textarea
                  placeholder={user.description_as_player}
                  name="description_as_player"
                  value={formData.description_as_player}
                  onChange={handleFormChange}
                ></textarea>
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
                Email address
                <input
                  type="email"
                  className="inputBottomProfil"
                  placeholder="Enter Your Email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                />
              </div>
              <div className="changePassword">
                <div className="oldPassword">
                  Current Password
                  <input
                    type="password"
                    className="inputBottomProfil"
                    placeholder="Current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div className="newPassword">
                  New Password
                  <input
                    type="password"
                    className="inputBottomProfil"
                    placeholder="New password"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div />
              </div>
            </div>
          </div>
          <div className="divButtonSwitchValidate">
            <button type="button" onClick={() => setIsEditing(false)}>
              {/* onClick={modifyProfil} */}
              VALIDATE
            </button>
          </div>
        </div>
      )}

      {isEditing === false && buttonStates.mainDiv === true && (
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
                  <p>{user.city}</p>
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
                Email address
                <p>{user.email_adress}</p>
              </div>
            </div>
          </div>
          <div className="divButtonSwitchEdit">
            <button type="button" onClick={() => setIsEditing(true)}>
              EDIT PROFILE
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profil
