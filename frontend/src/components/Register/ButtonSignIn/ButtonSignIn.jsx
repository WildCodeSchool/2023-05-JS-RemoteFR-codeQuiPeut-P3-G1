import React, { useState, useEffect, useRef } from "react"

import SignIn from "../SignIn/SignIn"
import SignUp from "../SignUp/SignUp"

function ButtonSignIn() {
  const [showSignIn, setShowSignIn] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const signInRef = useRef(null)
  // const signUpRef = useRef(null)

  const handleCloseEscape = (event) => {
    if (event.key === "Escape") {
      setShowSignIn(false)
    }
  }

  const closeOnOutsideClick = (e) => {
    if (e.target.className === "modal") {
      setShowModal(false)
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleCloseEscape)
    return () => {
      document.removeEventListener("keydown", handleCloseEscape)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (signInRef.current && !signInRef.current.contains(event.target)) {
        setShowSignIn(false)
      }
    }

    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  const handleButtonClick = (event) => {
    event.stopPropagation()
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

        {showSignIn && (
          <div className="card-LogIn-container">
            <div className="card-LogIn" ref={signInRef}>
              <SignIn
                setShowSignIn={setShowSignIn}
                setShowModal={setShowModal}
                showModal={showModal}
                closeOnOutsideClick={closeOnOutsideClick}
              />
            </div>
          </div>
        )}

        {showModal && (
          <div className="modal" onClick={closeOnOutsideClick}>
            <div>
              <SignUp />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ButtonSignIn
