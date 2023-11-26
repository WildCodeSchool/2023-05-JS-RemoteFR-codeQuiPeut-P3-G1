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

  const handleKeyDown = (e) => {
    if (e.code === "Enter" || (e.key === "Enter" && signInPassword !== "")) {
      handleLogin(e)
    }
  }

  const navigate = useNavigate()

  const validateCredentials = (username, password) => {
    const isString = (str) => typeof str === "string" && str.trim().length > 0
    const isValidLength = (str, min, max) =>
      str.length >= min && str.length <= max

    return (
      isString(username) &&
      isValidLength(username, 3, 50) &&
      isString(password) &&
      isValidLength(password, 6, 50)
    )
  }

  const handleLogin = (e) => {
    e.preventDefault()

    if (!validateCredentials(signInUsername, signInPassword)) {
      console.error("Wrong credentials format")
      return
    }

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        username: signInUsername,
        password: signInPassword
      })
      .then((res) => {
        if (res.status === 200) {
          const token = res.data.token

          const cookiesOptions = { expires: 0.5, sameSite: "strict" }
          //*  Utiliser l'option "secure" si HTTPS

          Cookies.set("authToken", token, cookiesOptions)
          Cookies.set("usernameGm", res.data.user.username, cookiesOptions)
          Cookies.set(
            "idUser",
            JSON.stringify(res.data.user.id),
            cookiesOptions
          )

          document.getElementById("cardLogIn-Input").reset()
          setSignInUsername()
          setSignInPassword()
          navigate("/home")
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          alert("Wrong username or password")
          console.error("Authentication error :", error)
        } else if (error.response && error.response.status === 400) {
          console.error(
            "Validation error :" +
              error.response.data.errorMessages.map((e) => e.message).join(",")
          )
        } else {
          console.error("Error :", error)
        }
      })
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
    </div>
  )
}

export default SignIn
