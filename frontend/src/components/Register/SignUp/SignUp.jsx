import axios from "axios"
import { useState } from "react"

import Google from "../../../assets/logo/google.svg"
import Twitter from "../../../assets/logo/twitter.svg"
import Facebook from "../../../assets/logo/facebook.svg"

function SignUp({ setShowModal }) {
  console.info("SignUp component is rendered")

  const [signUpUsername, setSignUpUsername] = useState()
  const [signUpEmail, setSignUpEmail] = useState()
  const [signUpCity, setSignUpCity] = useState()
  const [signUpPassword, setSignUpPassword] = useState()
  const [signUpVerifyPassword, setSignUpVerifyPassword] = useState()

  const handleCreateUser = (e) => {
    e.preventDefault()
    axios
      .post("http://localhost:4242/users", {
        username: signUpUsername,
        email_adress: signUpEmail,
        password: signUpPassword,
        location: signUpCity
      })
      .then((res) => {
        if (res.status === 201) {
          console.info("Utilisateur créé avec succès !")
          document.getElementById("cardLogIn-Input2").reset()
          setSignUpUsername()
          setSignUpEmail()
          setSignUpCity()
          setSignUpPassword()
          setSignUpVerifyPassword()
        }
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la création de la création de l'utilisateur :",
          error
        )
      })
  }

  return (
    <div className="cardLogIn-container2-Major">
      <div className="cardLogIn-container2">
        <span id="title-card-logIn2">SIGN UP</span>
        <div>
          <form id="cardLogIn-Input2">
            <span>Username</span>
            <input
              type="text"
              onChange={(event) => setSignUpUsername(event.target.value)}
              required
              minLength="4"
            />
            <span>Email</span>
            <input
              type="email"
              onChange={(event) => setSignUpEmail(event.target.value)}
              required
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              minLength="4"
            />
            <span>City</span>
            <input
              type="text"
              onChange={(event) => setSignUpCity(event.target.value)}
              required
              minLength="1"
            />
            <span>Password</span>
            <input
              type="password"
              onChange={(event) => setSignUpPassword(event.target.value)}
              required
              minLength="5"
            />
            <span>Validate Password</span>
            <input
              id="input-password-LogIn2"
              type="password"
              onChange={(event) => setSignUpVerifyPassword(event.target.value)}
            />
          </form>
          <div className="button-SignIn-Container2">
            <div className="button-SignIn2">
              <button
                type="button"
                onClick={
                  signUpPassword === signUpVerifyPassword
                    ? handleCreateUser
                    : ""
                }
              >
                VALIDATE
              </button>
            </div>
          </div>
        </div>
        <span id="social-account-logIn2">Login With Social Accounts</span>
        <div className="line-hr-LogIn2">
          <hr />
          <hr />
        </div>
        <div className="logo-socialAccountLogIn2">
          <img src={Google} alt="logo of google" />
          <img src={Twitter} alt="logo of twitter" />
          <img src={Facebook} alt="logo of facebook" />
        </div>
      </div>
    </div>
  )
}

export default SignUp
