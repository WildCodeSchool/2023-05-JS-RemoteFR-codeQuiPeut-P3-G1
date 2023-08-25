import React, { useState, useEffect, useRef } from "react"

import SignIn from "../SignIn/SignIn"

function ButtonSignIn() {
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
      <div className="LogIn-Container">
        <div className="button-LogIn">
          <button type="button" onClick={handleButtonClick}>
            LOG IN
          </button>
        </div>
        {showSignIn ? (
          <div className="card-LogIn-container">
            <div className="card-LogIn" ref={signInRef}>
              <SignIn />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  )
}

export default ButtonSignIn
