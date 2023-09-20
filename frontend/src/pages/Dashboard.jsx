import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import AuthContext from "../components/AuthContext/AuthContext"

import questionMark from "../assets/icon-dashboard/questionMark.svg"
import Notifications from "../assets/icon-dashboard/icon-Notifications.svg"
import Notepad from "../assets/icon-dashboard/Notepad.svg"
import CrossWithBG from "../assets/icon-dashboard/crossWithBG.svg"

import MyProfil from "../components/Dashboard/MyProfil"
import FuturGames from "../components/Dashboard/FuturGames"
import FriendRequest from "../components/Dashboard/FriendRequest"

const Dashboard = () => {
  const { setUser, setUsers } = useContext(AuthContext)
  const tokenFromCookie = Cookies.get("authToken")
  const idUser = Cookies.get("idUser")

  const headers = {
    Authorization: `Bearer ${tokenFromCookie}`
  }

  const [hasFriendRequest, setHasFriendRequest] = useState(false)

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
            <img
              id="logoQuestionMark"
              src={questionMark}
              alt="logo of question mark"
            />
          </div>
          {isPopupOpen && (
            <div className="popupNotification">
              <div className="contentPopUpNotification">
                <div className="buttonClosePopUpNotification">
                  <img
                    src={CrossWithBG}
                    alt="icon close popup of notification"
                    onClick={togglePopup}
                  />
                </div>
                {/* <div className="Notifications-content">
                  <div className="Invitations">
                    {joiningRequestData.map((request) => (
                      <div className="rawInvitations" key={request.id}>
                        <div className="invitProfilPicture">
                          <img
                            src={`${import.meta.env.VITE_BACKEND_URL}/${
                              request.profil_picture
                            }`}
                            alt="profil picture"
                          />
                        </div>
                        <div className="invitedName">
                          <p>{request.username}</p>
                        </div>
                        <div className="wantsToJoin">
                          <span>has invited to join:</span>
                        </div>
                        <div className="requesterGame">
                          <p>{request.guild_name}</p>
                        </div>
                        <div className="requesterButton">
                          <img
                            id="validateButton"
                            src={check}
                            alt="validate"
                            onClick={() =>
                              acceptedRequest(
                                request.requester_id,
                                request.games_id
                              )
                            }
                          />
                          <img
                            id="refuseButton"
                            src={crossDash}
                            alt="refuse"
                            onClick={() =>
                              openConfirmation(
                                request.requester_id,
                                request.games_id
                              )
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
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
                </div> */}
              </div>
            </div>
          )}
        </div>
        <div className="dashboardAllComponents">
          <div className="friends-games-container">
            <FuturGames />
            {hasFriendRequest && <FriendRequest />}
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
