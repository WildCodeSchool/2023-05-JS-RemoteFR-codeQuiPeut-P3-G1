import React, { useState, useEffect } from "react"
import Cookies from "js-cookie"
import sword from "../../assets/icon-dashboard/sword.svg"
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
  }, [])

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
  }

  return (
    <div className="Friends-container">
      <div className="Global-friendRequest">
        <img className="sword-logo" src={sword} />
        <h1 className="Request-Title">REQUEST TO JOIN YOURS GUILD</h1>
      </div>
      <div className="Friends-content">
        <div className="friends">
          {joiningRequestData.map((request) => (
            <div className="rawFriendRequest" key={request.id}>
              <div className="requesterProfilPicture">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${
                    request.profil_picture
                  }`}
                  alt="profil picture"
                />
              </div>
              <div className="requesterName">
                <p>{request.username}</p>
              </div>
              <div className="wantsToJoin">
                <p>requests to join</p>
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
    </div>
  )
}

export default FriendRequest
