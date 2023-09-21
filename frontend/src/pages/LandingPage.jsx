import FAQ from "../components/FAQ/FAQ"
import GuildPhone from "../components/3DGuildPhone/GuildPhone"
import PhoneTexts from "../components/PhoneTexts/PhoneTexts"
import MockUpInstructions from "../components/MockupInstructions/MockUpInstructions"
import Footer from "../components/Footer/Footer"
import ButtonSignIn from "../components/Register/ButtonSignIn/ButtonSignIn"
import ButtonSignUp from "../components/Register/ButtonSignUp/ButtonSignUp"
import TestCarrousel from "../components/TestCarrousel/TestCarrousel"
import Polygon from "../assets/landing-assets/polygon.svg"

function LandingPage() {
  return (
    <>
      <div className="main-landingPage">
        <div className="imgHeaderLandingPage">
          <img
            src="src/assets/landing-assets/iconGuildHeader.svg"
            className="logoGuild-Header"
          />
        </div>
        <div className="button-register-container">
          <ButtonSignIn />
          <ButtonSignUp />
        </div>
        <div className="Scene">
          <GuildPhone />
        </div>
        <div className="wave-testLandingPage">
          <svg
            // width="1509"
            // height="626"
            viewBox="0 0 1509 626"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1509 347.5L1467 312.75C1425 278 1341 208.5 1257 220.011C1173 232.391 1089 323.609 1005 382.25C921 440.891 837 462.609 753 463.261C669 462.609 585 440.891 501 428.511C417 417 333 417 249 451.75C165 486.5 81.0001 556 39.0001 590.75L-2.99988 625.5V0H39.0001C81.0001 0 165 0 249 0C333 0 417 0 501 0C585 0 669 0 753 0C837 0 921 0 1005 0C1089 0 1173 0 1257 0C1341 0 1425 0 1467 0H1509V347.5Z"
              fill="url(#paint0_linear_1195_10)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1195_10"
                x1="753"
                y1="625.5"
                x2="753"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4D194D" />
                <stop offset="1" stopColor="#4D194D" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="computerPhone">
          <MockUpInstructions />
        </div>
        <div className="phoneTexts">
          <PhoneTexts />
          <div className="polygonSVG">
            <img src={Polygon} alt="image of polygon" />
          </div>
        </div>
        <TestCarrousel />
        <FAQ />
        <Footer />
      </div>
    </>
  )
}

export default LandingPage
