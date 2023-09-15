import React, { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

import Logo from "../../assets/logo/logoNavBar.svg"
import Home from "../../assets/icon-navbar/home.svg"
import Party from "../../assets/icon-navbar/party.svg"
import Profil from "../../assets/icon-navbar/profile.svg"
import CreateGame from "../../assets/icon-navbar/newGame.svg"
import Messagerie from "../../assets/icon-navbar/message.svg"
import Forum from "../../assets/icon-navbar/forum.svg"
import Setting from "../../assets/icon-navbar/setting.svg"
import LogOut from "../../assets/icon-navbar/logOut.svg"
import HomeWhite from "../../assets/icon-navbar/homeWhite.svg"
import PartyWhite from "../../assets/icon-navbar/partyWhite.svg"
import ProfilWhite from "../../assets/icon-navbar/profileWhite.svg"
import CreateGameWhite from "../../assets/icon-navbar/newGameWhite.svg"
import MessagerieWhite from "../../assets/icon-navbar/messageWhite.svg"
import ForumWhite from "../../assets/icon-navbar/forumWhite.svg"
import SettingWhite from "../../assets/icon-navbar/settingWhite.svg"
import LogOutWhite from "../../assets/icon-navbar/logOutWhite.svg"

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const [hoveredLink, setHoveredLink] = useState(null)

  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  if (location.pathname === "/") {
    return null
  }

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    Cookies.remove("authToken")
    Cookies.remove("loggedInUser")
    Cookies.remove("idUser")

    navigate("/")
  }

  return (
    <>
      <div className="navBarDesktopContainer">
        <div className="logoNavBar">
          <Link to="/home">
            <img
              id="logoNavBar"
              src={Logo}
              alt="logo of website in the navbar"
            />
          </Link>
        </div>
        <div className="mainButtonsNavBar">
          <Link to="/home">
            <div
              className={`homeNavBar ${isActive("/home") ? "activeLink" : ""}`}
              onMouseEnter={() => setHoveredLink("home")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <img
                src={isActive("/home") ? HomeWhite : Home}
                alt="logo of home in the navbar"
              />
              <span className={hoveredLink === "home" ? "slide-in" : ""}>
                HOME
              </span>
            </div>
          </Link>
          <Link to="/upcoming-table">
            <div
              className={`partyNavBar ${
                isActive("/upcoming-table") ? "activeLink" : ""
              }`}
              onMouseEnter={() => setHoveredLink("home")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <img
                src={isActive("/upcoming-table") ? PartyWhite : Party}
                alt="logo of party in the navbar"
              />
              <span className={hoveredLink === "home" ? "slide-in" : ""}>
                PARTY
              </span>
            </div>
          </Link>
          <Link to="/profil">
            <div
              className={`profilNavBar ${
                isActive("/profil") ? "activeLink" : ""
              }`}
              onMouseEnter={() => setHoveredLink("home")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <img
                src={isActive("/profil") ? ProfilWhite : Profil}
                alt="logo of profil in the navbar"
              />
              <span className={hoveredLink === "home" ? "slide-in" : ""}>
                PROFIL
              </span>
            </div>
          </Link>
          <Link to="/create-game">
            <div
              className={`createGameNavBar ${
                isActive("/create-game") ? "activeLink" : ""
              }`}
              onMouseEnter={() => setHoveredLink("home")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <img
                src={isActive("/create-game") ? CreateGameWhite : CreateGame}
                alt="logo of Create Game in the navbar"
              />
              <span className={hoveredLink === "home" ? "slide-in" : ""}>
                CREATE GAME
              </span>
            </div>
          </Link>
          <Link to="/privateMessages">
            <div
              className={`messageNavBar ${
                isActive("/privateMessages") ? "activeLink" : ""
              }`}
              onMouseEnter={() => setHoveredLink("home")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <img
                src={
                  isActive("/privateMessages") ? MessagerieWhite : Messagerie
                }
                alt="logo of messagerie in the navbar"
              />
              <span className={hoveredLink === "home" ? "slide-in" : ""}>
                MESSAGE
              </span>
            </div>
          </Link>
          <Link to="/topics">
            <div
              className={`forumNavBar ${
                isActive("/topics") ? "activeLink" : ""
              }`}
              onMouseEnter={() => setHoveredLink("home")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <img
                src={isActive("/topics") ? ForumWhite : Forum}
                alt="logo of forum in the navbar"
              />
              <span className={hoveredLink === "home" ? "slide-in" : ""}>
                FORUM
              </span>
            </div>
          </Link>
        </div>
        <div className="bottomButtonNavBar">
          <div
            className={`settingNavBar ${isActive("/") ? "activeLink" : ""}`}
            onMouseEnter={() => setHoveredLink("home")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <img
              src={isActive("/") ? SettingWhite : Setting}
              alt="logo of forum in the navbar"
            />
            <span className={hoveredLink === "home" ? "slide-in" : ""}>
              SETTING
            </span>
          </div>
          <div
            className={`logOutNavBar ${isActive("/") ? "activeLink" : ""}`}
            onMouseEnter={() => setHoveredLink("home")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <img
              src={isActive("/") ? LogOutWhite : LogOut}
              onClick={handleLogout}
              alt="logo of forum in the navbar"
            />
            <span className={hoveredLink === "home" ? "slide-in" : ""}>
              LOG OUT
            </span>
          </div>
        </div>
      </div>
      <div className="footerNavbarMobile">
        <div className="logoFooter">
          <div>
            <img src={CreateGame} alt="" />
          </div>
          <div>
            <img src={Party} alt="" />
          </div>
          <div>
            <img id="logoFooter" src={Logo} alt="" />
          </div>
          <div>
            <img src={Messagerie} alt="" />
          </div>
          <div
            className={`menuBurger ${isMenuOpen ? "open" : ""}`}
            onClick={handleMenuToggle}
          >
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
            {isMenuOpen && (
              <div className="menuContent">
                <img src={Profil} alt="" />
                <p>PROFIL</p>
                <img src={Forum} alt="" />
                <p>FORUM</p>
                <img src={Setting} alt="" />
                <p>SETTING</p>
                <img src={LogOut} alt="" />
                <p>LOG OUT</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default NavBar
