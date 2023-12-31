import axios from "axios"
import { useState } from "react"

function SignUp() {
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
        location: signUpCity,
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
                signUpPassword === signUpVerifyPassword ? handleCreateUser : ""
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
        >
          <path
            d="M24.8527 10.5737L24.7241 10.0385H12.8675V14.9615H19.9516C19.2162 18.3878 15.8032 20.1914 13.0154 20.1914C10.9869 20.1914 8.84869 19.3544 7.43345 18.0089C6.68676 17.2877 6.09241 16.4291 5.68441 15.4823C5.27641 14.5355 5.06278 13.519 5.05575 12.4911C5.05575 10.4174 6.00569 8.34319 7.38794 6.97879C8.77019 5.6144 10.8578 4.851 12.9334 4.851C15.3106 4.851 17.0142 6.08929 17.6513 6.65402L21.2173 3.17411C20.1712 2.27232 17.2975 0 12.8185 0C9.36291 0 6.04949 1.29855 3.62742 3.66685C1.2372 5.99888 0 9.37109 0 12.5C0 15.6289 1.17065 18.8326 3.48692 21.183C5.96189 23.6897 9.46701 25 13.0762 25C16.3601 25 19.4727 23.7377 21.6911 21.4475C23.872 19.1931 25 16.0737 25 12.8036C25 11.4269 24.8589 10.6094 24.8527 10.5737Z"
            fill="url(#paint0_linear_39_116)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_39_116"
              x1="12.5"
              y1="0"
              x2="12.5"
              y2="25"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#180B23" />
              <stop offset="1" stopColor="#4D194D" />
            </linearGradient>
          </defs>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
        >
          <path
            d="M24.4334 2.88518C24.0407 3.09794 23.6369 3.2775 23.2243 3.42328C23.7128 2.74856 24.0852 1.95464 24.3125 1.08587C24.3635 0.891133 24.3107 0.677978 24.1796 0.550617C24.0487 0.423158 23.8669 0.40789 23.7228 0.512202C22.8466 1.14694 21.9012 1.60309 20.91 1.86983C19.9116 0.678176 18.5554 0 17.1535 0C14.1942 0 11.7867 2.94053 11.7867 6.55491C11.7867 6.83957 11.8014 7.12266 11.8306 7.40181C8.15846 7.00801 4.74452 4.80347 2.40017 1.29104C2.31662 1.16585 2.18791 1.09838 2.05614 1.11128C1.92429 1.12389 1.80582 1.21471 1.73921 1.35428C1.26372 2.35081 1.01235 3.49056 1.01235 4.6502C1.01235 6.22966 1.47404 7.72824 2.28961 8.89922C2.04162 8.79431 1.80098 8.66321 1.5713 8.50748C1.448 8.42366 1.29751 8.42494 1.17501 8.51073C1.05243 8.59653 0.975578 8.75432 0.972353 8.9268C0.971788 8.95586 0.971788 8.98491 0.971788 9.01436C0.971788 11.372 2.01066 13.4946 3.59896 14.6514C3.46251 14.6348 3.32614 14.6107 3.19065 14.579C3.05097 14.5464 2.90735 14.6062 2.81315 14.7364C2.7188 14.8664 2.68759 15.0476 2.73106 15.2131C3.31896 17.455 4.83258 19.104 6.66241 19.6067C5.14476 20.7677 3.4092 21.3759 1.58727 21.3759C1.20711 21.3759 0.824772 21.3486 0.45058 21.2945C0.264694 21.2675 0.0869523 21.4016 0.0236461 21.6175C-0.0396602 21.8335 0.0274364 22.0743 0.185581 22.1982C2.52614 24.0311 5.2325 25 8.01193 25C13.4759 25 16.8941 21.8529 18.7993 19.2128C21.1751 15.9208 22.5377 11.5635 22.5377 7.2581C22.5377 7.07824 22.5354 6.89661 22.5309 6.71556C23.4682 5.85299 24.2753 4.80909 24.932 3.60925C25.0317 3.42703 25.0209 3.18619 24.9053 3.01845C24.7899 2.8506 24.5976 2.79633 24.4334 2.88518Z"
            fill="url(#paint0_linear_39_117)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_39_117"
              x1="12.5"
              y1="0"
              x2="12.5"
              y2="25"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#180B23" />
              <stop offset="1" stopColor="#4D194D" />
            </linearGradient>
          </defs>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M21.5909 0C23.4737 0 25 1.52631 25 3.40909V21.5909C25 23.4737 23.4737 25 21.5909 25H3.40909C1.52631 25 0 23.4737 0 21.5909V3.40909C0 1.52631 1.52631 0 3.40909 0H21.5909ZM21.5909 2.27273C22.2185 2.27273 22.7273 2.7815 22.7273 3.40909V21.5909C22.7273 22.2185 22.2185 22.7273 21.5909 22.7273H15.9091V14.7726H18.2684C18.7575 14.7726 19.1917 14.4597 19.3465 13.9956L19.8499 12.4853C20.0339 11.9334 19.6231 11.3635 19.0414 11.3635H15.9091V9.09082C15.9091 8.52264 16.4773 7.95445 17.0455 7.95445H19.3182C19.9458 7.95445 20.4545 7.44568 20.4545 6.81809V6.03856C20.4545 5.67149 20.2201 5.34239 19.8651 5.24872C18.3756 4.85562 17.0455 4.85563 17.0455 4.85563C14.2045 4.85563 12.5 6.81809 12.5 8.52264V11.3635H10.2273C9.59968 11.3635 9.09091 11.8723 9.09091 12.4999V13.6362C9.09091 14.2639 9.59967 14.7726 10.2273 14.7726H12.5V22.7273H3.40909C2.7815 22.7273 2.27273 22.2185 2.27273 21.5909V3.40909C2.27273 2.7815 2.7815 2.27273 3.40909 2.27273H21.5909Z"
            fill="url(#paint0_linear_39_118)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_39_118"
              x1="12.5"
              y1="0"
              x2="12.5"
              y2="25"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#180B23" />
              <stop offset="1" stopColor="#4D194D" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  )
}

export default SignUp
