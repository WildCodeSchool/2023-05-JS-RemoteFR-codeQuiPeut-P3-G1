// SignIn.js
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import axios from "axios"
// import SignUp from "../SignUp/SignUp"

import Google from "../../../assets/logo/google.svg"
import Twitter from "../../../assets/logo/twitter.svg"
import Facebook from "../../../assets/logo/facebook.svg"

function SignIn({
  setShowSignIn,
  showModal,
  setShowModal,
  closeOnOutsideClick
}) {
  const [signInUsername, setSignInUsername] = useState()
  const [signInPassword, setSignInPassword] = useState()
  // const [showModal, setShowModal] = useState(false)

  const handleJoinAdventure = () => {
    setShowModal(true)
    setShowSignIn(false)
  }

  // const closeOnOutsideClick = (e) => {
  //   if (e.target.className === "modal") {
  //     setShowModal(false)
  //   }
  // }
  const handleKeyDown = (e) => {
    console.info("Key down event triggered")
    if (e.code === "Enter" || (e.key === "Enter" && signInPassword !== "")) {
      handleLogin(e)
    }
  }

  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    axios
      .post("http://localhost:4242/login", {
        username: signInUsername,
        password: signInPassword
      })
      .then((res) => {
        if (res.status === 200) {
          console.info("Connexion établie !")
          document.getElementById("cardLogIn-Input").reset()
          const token = res.data.token
          Cookies.set("authToken", token, { expires: 0.5, sameSite: "strict" })
          Cookies.set("usernameGm", res.data.user.username, {
            sameSite: "strict"
          })
          Cookies.set("loggedInUser", JSON.stringify(res.data.user), {
            sameSite: "strict"
          })
          Cookies.set("idUser", JSON.stringify(res.data.user.id), {
            sameSite: "strict"
          })
          setSignInUsername()
          setSignInPassword()
          navigate("/home")
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion :", error)
      })

    // Close sign-up modal if open
    setShowModal(false)
  }

  return (
    <div className="modalBlur">
      <div className="cardLogIn-container">
        <span id="title-card-logIn">LOGIN</span>
        <div>
          <form id="cardLogIn-Input">
            <span>Username</span>
            <input
              type="text"
              onChange={(e) => setSignInUsername(e.target.value)}
            />
            <span>Password</span>
            <input
              id="input-password-LogIn"
              type="password"
              onChange={(e) => setSignInPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="forgot-Input">
              <span>Forgot Password ?</span>
            </div>
          </form>
          <div className="button-SignIn-Container">
            <div className="button-SignIn">
              <Link to="/home">
                <button type="button" onClick={handleLogin}>
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        </div>
        <span id="social-account-logIn">Login With Social Accounts</span>
        <div className="line-hr-LogIn">
          <hr />
          <hr />
        </div>
        <div className="logo-socialAccountLogIn">
          <img src={Google} alt="logo of google" />
          <img src={Twitter} alt="logo of twitter" />
          <img src={Facebook} alt="logo of facebook" />
        </div>
        <div className="signUpButton-LogInForm">
          <span>Don't have an account ?</span>
          <button type="button" onClick={handleJoinAdventure}>
            Sign Up
          </button>
        </div>
      </div>
      {/* {showModal && (
        <div className="modal" onClick={closeOnOutsideClick}>
          <SignUp onClick={() => setShowModal(true)} />
        </div>
      )} */}
    </div>
  )
}

export default SignIn
