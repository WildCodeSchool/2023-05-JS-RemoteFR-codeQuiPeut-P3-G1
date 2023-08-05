import React, { useState, useEffect, useRef } from "react"
import "./ButtonSignUp.scss"

import SignUp from "../SignUp/SignUp"

function ButtonSignUp() {
  const [showSignIn, setShowSignIn] = useState(false)
  const signInRef = useRef(null)

  useEffect(() => {
    // Ajoute un gestionnaire d'événements pour les clics sur le document
    const handleClickOutside = (event) => {
      if (signInRef.current && !signInRef.current.contains(event.target)) {
        // Ferme la carte SignIn si l'événement de clic se produit en dehors de la carte
        setShowSignIn(false)
      }
    }

    document.addEventListener("click", handleClickOutside)

    // Supprime le gestionnaire d'événements lorsque le composant est démonté
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  const handleButtonClick = (event) => {
    event.stopPropagation() // Empêche la propagation du clic au document
    setShowSignIn(true)
  }

  return (
    <>
      <div className="LogUp-Container2">
        <div className="button-LogUp2">
          <button type="button" onClick={handleButtonClick}>
            SIGN UP
          </button>
        </div>
        {showSignIn ? (
          <div className="card-LogUp-container2">
            <div className="card-LogUp2" ref={signInRef}>
              <SignUp />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  )
}

export default ButtonSignUp
