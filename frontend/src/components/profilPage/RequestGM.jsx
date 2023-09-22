import React, { useState, useEffect } from "react"
import Cookies from "js-cookie"
import check from "../../assets/icon-dashboard/check.svg"
import crossDash from "../../assets/icon-dashboard/crossDash.svg"
import axios from "axios"

const FriendRequest = () => {
  const [joiningRequestData, setJoiningRequestData] = useState([])

  const tokenFromCookie = Cookies.get("authToken")
  const idUser = Cookies.get("idUser")

  const headers = {
    Authorization: `Bearer ${tokenFromCookie}`
  }

  const rejectRequest = (requesterId, gameId) => {
    axios
      .put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/joiningRequestsRejected/${requesterId}/${gameId}`,
        { headers }
      )
      .then((response) => {
        console.info("Request accepted successfully:", response.data)
      })
      .catch((error) => {
        console.error("Error accepting request:", error)
      })
  }

  const acceptedRequest = (requesterId, gameId) => {
    axios
      .put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/joiningRequestsAccepted/${requesterId}/${gameId}`,
        { headers }
      )
      .then((response) => {
        console.info("Request accepted successfully:", response.data)
      })
      .catch((error) => {
        console.error("Error accepting request:", error)
      })

    axios
      .post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/dispatchPlayer/${requesterId}/${gameId}`,
        { headers }
      )
      .then((res) => {
        console.info("Dispatch player successfull", res.data)
      })
      .catch((err) => {
        console.error("Error when dispatch player", err)
      })
  }

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/joiningRequests/${idUser}`, {
        headers
      })
      .then((response) => {
        setJoiningRequestData(response.data)
      })
      .catch((error) => {
        console.error("An error occurred:", error)
      })
  }, [acceptedRequest, rejectRequest])

  return (
    <div className="waitingValidationDiv">
      <div className="titlewaiting">WAITING FOR VALIDATION</div>
      <div className="displayWaiting">
        {joiningRequestData.map((request) => (
          <div className="boxPendingateGame" key={request.id}>
            <div className="firstBoxGM">
              <div className="requesterProfilPicture">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${
                    request.profil_picture
                  }`}
                  alt="profil picture"
                />
              </div>
              <div className="requesterName">{request.username}</div>
            </div>
            <hr className="hrBoxMyGames"></hr>
            <div className="wantsToJoin">WANT TO JOIN :</div>
            <div className="boxGuildAndType">
              <div className="guildNameDiv2">GUILD :{request.guild_name}</div>
              <div className="typeDiv">
                <p>{request.is_campaign === 1 ? "Campaign" : "One Shot"}</p>
              </div>
            </div>
            <hr className="hrBoxMyGames"></hr>
            <div className="requesterButton">
              <img
                id="validateButton"
                src={check}
                alt="validate"
                onClick={() =>
                  acceptedRequest(request.requester_id, request.games_id)
                }
              />
              <img
                id="refuseButton"
                src={crossDash}
                alt="refuse"
                onClick={() =>
                  rejectRequest(request.requester_id, request.games_id)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FriendRequest
