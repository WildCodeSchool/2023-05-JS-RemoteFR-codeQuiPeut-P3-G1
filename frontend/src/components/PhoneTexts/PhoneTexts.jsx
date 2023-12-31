import React, { useState } from "react"
import Spline from "@splinetool/react-spline"
import SignIn from "../Register/SignIn/SignIn"

const PhoneTexts = () => {
  const [showModal, setShowModal] = useState(false)

  const handleJoinAdventure = () => {
    setShowModal(true)
  }

  return (
    <>
      <div className="PhoneText-Global">
        <div className="PhoneTexts">
          <div className="title-p-PhoneTexts">
            <h1 className="h1-phoneTexts">ORGANIZE ADVENTUROUS SESSIONS</h1>
            <p className="p-phoneTexts">
              Initiate conversations with potential partners via GUILD's
              integrated messaging system. Plan your role-playing sessions,
              choosing the perfect date, time, and platform (virtual or
              physical) for your epic quests.
              <br />
              <br />
              Initiate conversations with potential partners via GUILD's
              integrated messaging system. Plan your role-playing sessions,
              choosing the perfect date, time, and platform (virtual or
              physical) for your epic quests.
            </p>
            <p className="p-phoneTexts"></p>
          </div>
          <div className="Btn-container-phone">
            <button
              className="Btn-PhoneText"
              type="button"
              onClick={handleJoinAdventure}
            >
              JOIN ADVENTURE
            </button>
          </div>
          {showModal && (
            <div className="modal">
              <SignIn />
              <button onClick={() => setShowModal(false)}>Close</button>
            </div>
          )}
        </div>
        <div className="scene-PhoneTexts">
          <Spline scene="https://prod.spline.design/Hm-EQFsFWBdKeM48/scene.splinecode" />
        </div>
      </div>
    </>
  )
}

export default PhoneTexts
