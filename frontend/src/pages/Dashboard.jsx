import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import AuthContext from "../components/AuthContext/AuthContext"

import questionMark from "../assets/icon-dashboard/questionMark.svg"
import Notifications from "../assets/icon-dashboard/icon-Notifications.svg"
import Notepad from "../assets/icon-dashboard/Notepad.svg"
import CrossWithBG from "../assets/icon-dashboard/crossWithBG.svg"
import check from "../assets/icon-dashboard/check.svg"
import crossDash from "../assets/icon-dashboard/crossDash.svg"

import MyProfil from "../components/Dashboard/MyProfil"
import FuturGames from "../components/Dashboard/FuturGames"
import FriendRequest from "../components/Dashboard/FriendRequest"
import CardGame from "../components/Game/CardGame"

const Dashboard = () => {
  const { setUser, setUsers } = useContext(AuthContext)
  const tokenFromCookie = Cookies.get("authToken")
  const idUser = Cookies.get("idUser")

  const headers = {
    Authorization: `Bearer ${tokenFromCookie}`
  }

  const [playersProfil, setPlayersProfil] = useState([])
  const [notificationCount, setNotificationCount] = useState(0)
  const [hasFriendRequest, setHasFriendRequest] = useState(false)
  const [invitationsData, setInvitationsData] = useState()
  const [isCardGameModalOpen, setIsCardGameModalOpen] = useState(false)
  const [selectedGameData, setSelectedGameData] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [currentRequest, setCurrentRequest] = useState(null)

  const openConfirmation = (invitedId, gameId) => {
    setShowConfirm(true)
    setCurrentRequest({ invitedId, gameId })
  }

  const closeConfirmation = () => {
    setShowConfirm(false)
    setCurrentRequest(null)
  }

  const confirmReject = () => {
    if (currentRequest) {
      rejectRequest(currentRequest.invitedId, currentRequest.gameId)
    }
    closeConfirmation()
  }

  const rejectRequest = async (invitedId, gameId) => {
    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/joiningRequestsRejectedNotification/${invitedId}/${gameId}`,
        { headers }
      )
      console.info("Request rejected successfully:", response.data)

      const updatedInvitations = invitationsData.filter(
        (invitation) =>
          !(
            invitation.player_id === invitedId && invitation.games_id === gameId
          )
      )
      setInvitationsData(updatedInvitations)
      setNotificationCount((prevCount) => prevCount - 1)
    } catch (error) {
      console.error("Error rejecting request:", error)
    }
  }

  const acceptedRequest = async (invitedId, gameId) => {
    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/joiningRequestsAcceptedNotification/${invitedId}/${gameId}`,
        { headers }
      )
      console.info("Request accepted successfully:", response.data)

      const updatedInvitations = invitationsData.filter(
        (invitation) =>
          !(
            invitation.player_id === invitedId && invitation.games_id === gameId
          )
      )
      setInvitationsData(updatedInvitations)
      setNotificationCount((prevCount) => prevCount - 1)
    } catch (error) {
      console.error("Error accepting request:", error)
    }
  }

  const handleOpenCardGameModal = (gameData) => {
    axios
      .get(`http://localhost:4242/playersbygame/${gameData.id}`, {
        headers
      })
      .then((response) => {
        setPlayersProfil(response.data, "test")
      })
      .catch((error) => {
        console.error("An error occurred:", error)
      })
    setSelectedGameData(gameData)
    setIsCardGameModalOpen(true)
    if (!clickedInvitations.includes(gameData.id)) {
      setClickedInvitations((prev) => [...prev, gameData.id])
      setNotificationCount((prevCount) => prevCount - 1)
    }
  }

  const handleCloseCardGameModal = () => {
    setIsCardGameModalOpen(false)
  }

  const useLocalStorage = (key, defaultValue) => {
    const [state, setState] = useState(() => {
      const saved = localStorage.getItem(key)
      if (saved) {
        return JSON.parse(saved)
      }
      return defaultValue
    })

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state))
    }, [key, state])

    return [state, setState]
  }

  const [clickedInvitations, setClickedInvitations] = useLocalStorage(
    "clickedInvitations",
    []
  )

  useEffect(() => {
    if (invitationsData && clickedInvitations) {
      const unclickedInvitations = invitationsData.filter(
        (invitation) => !clickedInvitations.includes(invitation.id)
      )
      setNotificationCount(unclickedInvitations.length)
    }
  }, [invitationsData, clickedInvitations])

  useEffect(() => {
    axios
      .get(`http://localhost:4242/gameregistrationasplayer/${idUser}`, {
        headers
      })
      .then((res) => {
        const pendingInvitations = res.data.filter(
          (invitation) => invitation.status === "pending"
        )
        setInvitationsData(pendingInvitations)
        setNotificationCount(pendingInvitations.length)
      })
      .catch((err) => {
        console.error("Problème lors du chargement des invitations", err)
      })
  }, [])

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
    idUser !== null &&
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
    idUser !== null &&
      axios
        .get(`http://localhost:4242/joiningRequests/${idUser}`, { headers })
        .then((res) => {
          if (res.data.length > 0) {
            setHasFriendRequest(true)
          }
        })
        .catch((err) => {
          console.error("Problème lors du chargement des friend requests", err)
        })
  }, [])

  const [isPopupOpen, setPopupOpen] = useState(false)

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen)
  }

  return (
    <>
      <div className="mainDivDashboard">
        <div className="Icon-Title-Dashboard">
          <div className="dashboardTitle">
            <h1>Dashboard</h1>
          </div>
          <div className="iconRight">
            <img
              id="logoNotepad"
              src={Notepad}
              alt="logo of notepad"
              onClick={togglePopup}
            />
            {notificationCount > 0 && (
              <span className="notificationCount">{notificationCount}</span>
            )}

            <img
              id="logoQuestionMark"
              src={questionMark}
              alt="logo of question mark"
            />
          </div>
          {isPopupOpen && (
            <div className="popupNotification">
              <div className="contentPopUpNotification">
                <div className="headerNotif">
                  <div className="logoNotif">
                    <img src={Notifications} alt="Notifications logo" />
                  </div>
                  <div className="buttonClosePopUpNotification">
                    <img
                      src={CrossWithBG}
                      alt="icon close popup of notification"
                      onClick={togglePopup}
                    />
                  </div>
                </div>
                <div className="Notifications-content">
                  {invitationsData.map((invitation) => (
                    <div className="Invitations" key={invitation.id}>
                      <div
                        className={`rawInvitations ${
                          clickedInvitations.includes(invitation.id)
                            ? "clicked"
                            : ""
                        }`}
                      >
                        <div className="rawContent">
                          <div className="invitProfilPicture">
                            <img
                              src={`${import.meta.env.VITE_BACKEND_URL}/${
                                invitation.profil_picture
                              }`}
                              alt="profil picture"
                            />
                          </div>
                          <div className="invitedName">
                            <p>{invitation.gm_username}</p>
                          </div>
                          <div className="hasInvitedYou">
                            <span>HAS INVITED YOU TO JOIN</span>
                          </div>
                          <div className="invitationGame">
                            <p
                              onClick={() =>
                                handleOpenCardGameModal(
                                  invitation,
                                  invitation.id
                                )
                              }
                            >
                              {invitation.guild_name}
                            </p>
                            {isCardGameModalOpen && (
                              <div className="ModalGameCard">
                                <div className="innerModalGameCard">
                                  <CardGame
                                    gameData={selectedGameData}
                                    playersProfil={playersProfil}
                                    onClose={handleCloseCardGameModal}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="requesterButton">
                            <img
                              id="validateButton"
                              src={check}
                              alt="validate"
                              onClick={() =>
                                acceptedRequest(
                                  invitation.player_id,
                                  invitation.games_id
                                )
                              }
                            />
                            <img
                              id="refuseButton"
                              src={crossDash}
                              alt="refuse"
                              onClick={() =>
                                openConfirmation(
                                  invitation.player_id,
                                  invitation.games_id
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="underLineNotification"></div>
                      </div>
                    </div>
                  ))}
                  {showConfirm && (
                    <div className="custom-confirmRequest">
                      <div className="modalCustomConfirmRequest">
                        <p>Are you sure you want to reject this request ?</p>
                        <div className="buttonCustomConfirmRequest">
                          <button id="buttonNo" onClick={closeConfirmation}>
                            NO
                          </button>
                          <button onClick={confirmReject}>YES</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="dashboardAllComponents">
          <div className="friends-games-container">
            <FuturGames />
            <FriendRequest />
          </div>
          <div className="dashboardComponents">
            <MyProfil idUser={idUser} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
