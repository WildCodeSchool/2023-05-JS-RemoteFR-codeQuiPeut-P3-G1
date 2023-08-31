import React from "react"
import sword from "../../assets/icon-dashboard/sword.svg"
import check from "../../assets/icon-dashboard/check.svg"
import crossDash from "../../assets/icon-dashboard/crossDash.svg"
import friendRequest from "../../assets/icon-dashboard/friendRequest.png"

const FriendRequest = () => {
  return (
    <div className="Friends-container">
      <div className="Global-friendRequest">
        <img className="sword-logo" src={sword} />
        <h1 className="Request-Title">REQUEST TO JOIN YOURS GUILD</h1>
      </div>
      <div className="Friends-content">
        <div className="friends">
          <img src={friendRequest}></img>
          <h2 className="friend-name">MonkeyVodka</h2>
          <p className="wantToJoin">WANT TO JOIN</p>
          <p className="guild-name">CODE QUI PEUT</p>
          <div className="logo-check">
            <img src={check} alt="logo-accepted" />
          </div>
          <div>
            <div className="logo-rejected">
              <img src={crossDash} alt="logo-rejected" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FriendRequest
