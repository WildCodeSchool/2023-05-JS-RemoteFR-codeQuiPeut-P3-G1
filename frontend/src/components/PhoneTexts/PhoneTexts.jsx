import Spline from "@splinetool/react-spline"

import "./PhoneTexts.scss"

import BtnJoin from "../BtnJoin/BtnJoin"

const PhoneTexts = () => {
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
            <BtnJoin />
          </div>
        </div>
        <div className="scene-PhoneTexts">
          <Spline scene="https://prod.spline.design/Hm-EQFsFWBdKeM48/scene.splinecode" />
        </div>
      </div>
    </>
  )
}

export default PhoneTexts
