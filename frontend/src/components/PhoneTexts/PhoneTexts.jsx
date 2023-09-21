import React, { useState, useEffect, useRef } from "react"
import SignUp from "../Register/SignUp/SignUp"
import PhoneText from "../../assets/landing-assets/phoneTexts.png"

const PhoneTexts = () => {
  const modalRef = useRef(null)
  const [showModal, setShowModal] = useState(false)

  const handleJoinAdventure = () => {
    setShowModal(true)
  }

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false)
    }
  }

  useEffect(() => {
    // Ajoute un écouteur d'événements quand le composant est monté
    document.addEventListener("mousedown", handleClickOutside)

    // Retire l'écouteur d'événements quand le composant est démonté
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, []) // Le tableau vide signifie que `useEffect` s'exécute une fois après le premier rendu

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
              Join GUILD today and embark on unforgettable journeys filled with
              extraordinary characters, captivating quests, and moments of
              camaraderie that will stay etched in your memories forever.
            </p>
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
        </div>
        <img src={PhoneText} alt="mockup phone text" />
      </div>

      {showModal && (
        <div className="modalPhoneText" onClick={handleClickOutside}>
          <div ref={modalRef}>
            <SignUp setShowModal={setShowModal} />
          </div>
        </div>
      )}
    </>
  )
}

export default PhoneTexts
