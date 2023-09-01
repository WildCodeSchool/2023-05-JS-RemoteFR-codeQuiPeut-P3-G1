import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"

import Logo from "../../assets/logo/logoNavBar.png"
import Home from "../../assets/icon-navbar/home.png"
import Party from "../../assets/icon-navbar/party.png"
import Profil from "../../assets/icon-navbar/profile.png"
import CreateGame from "../../assets/icon-navbar/newGame.png"
import Messagerie from "../../assets/icon-navbar/message.png"
import Forum from "../../assets/icon-navbar/forum.png"
import Setting from "../../assets/icon-navbar/setting.png"
import LogOut from "../../assets/icon-navbar/logOut.png"

function NavBar() {
  const [isHovering1, setIsHovering1] = useState(false)
  const [isHovering2, setIsHovering2] = useState(false)
  const [isHovering3, setIsHovering3] = useState(false)
  const [isHovering4, setIsHovering4] = useState(false)
  const [isHovering5, setIsHovering5] = useState(false)
  const [isHovering6, setIsHovering6] = useState(false)
  const [isHovering7, setIsHovering7] = useState(false)
  const [isHovering8, setIsHovering8] = useState(false)

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const location = useLocation()

  if (location.pathname === "/") {
    return null
  }

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleMouseEnter1 = () => {
    setIsHovering1(true)
  }

  const handleMouseLeave1 = () => {
    setIsHovering1(false)
  }

  const handleMouseEnter2 = () => {
    setIsHovering2(true)
  }

  const handleMouseLeave2 = () => {
    setIsHovering2(false)
  }

  const handleMouseEnter3 = () => {
    setIsHovering3(true)
  }

  const handleMouseLeave3 = () => {
    setIsHovering3(false)
  }

  const handleMouseEnter4 = () => {
    setIsHovering4(true)
  }

  const handleMouseLeave4 = () => {
    setIsHovering4(false)
  }

  const handleMouseEnter5 = () => {
    setIsHovering5(true)
  }

  const handleMouseLeave5 = () => {
    setIsHovering5(false)
  }

  const handleMouseEnter6 = () => {
    setIsHovering6(true)
  }

  const handleMouseLeave6 = () => {
    setIsHovering6(false)
  }
  const handleMouseEnter7 = () => {
    setIsHovering7(true)
  }

  const handleMouseLeave7 = () => {
    setIsHovering7(false)
  }
  const handleMouseEnter8 = () => {
    setIsHovering8(true)
  }

  const handleMouseLeave8 = () => {
    setIsHovering8(false)
  }

  return (
    <>
      <div className="navBarDesktopContainer">
        <div className="logoNavBar">
          <img id="logoNavBar" src={Logo} alt="logo of website in the navbar" />
        </div>
        <div className="mainButtonsNavBar">
          <Link to="/home">
            <div
              className="homeNavBar"
              onMouseEnter={handleMouseEnter1}
              onMouseLeave={handleMouseLeave1}
            >
              <img src={Home} alt="logo of home in the navbar" />
              {isHovering1 && (
                <div className="hiddenHomeNavBar">
                  <span>HOME</span>
                </div>
              )}
            </div>
          </Link>
          <Link to="/upcoming-table">
            <div
              className="partyNavBar"
              onMouseEnter={handleMouseEnter2}
              onMouseLeave={handleMouseLeave2}
            >
              <img src={Party} alt="logo of party in the navbar" />
              {isHovering2 && (
                <div className="hiddenPartyNavBar">
                  <span>PARTY</span>
                </div>
              )}
            </div>
          </Link>
          <Link to="/profil">
            <div
              className="profilNavBar"
              onMouseEnter={handleMouseEnter3}
              onMouseLeave={handleMouseLeave3}
            >
              <img src={Profil} alt="logo of profil in the navbar" />
              {isHovering3 && (
                <div className="hiddenProfilNavBar">
                  <span>PROFIL</span>
                </div>
              )}
            </div>
          </Link>
          <Link to="/create-game">
            <div
              className="createGameNavBar"
              onMouseEnter={handleMouseEnter4}
              onMouseLeave={handleMouseLeave4}
            >
              <img src={CreateGame} alt="logo of Create Game in the navbar" />
              {isHovering4 && (
                <div className="hiddenCreateGameNavBar">
                  <span>CREATE GAME</span>
                </div>
              )}
            </div>
          </Link>
          <div
            className="messageNavBar"
            onMouseEnter={handleMouseEnter5}
            onMouseLeave={handleMouseLeave5}
          >
            <img src={Messagerie} alt="logo of messagerie in the navbar" />
            {isHovering5 && (
              <div className="hiddenMessageNavBar">
                <span>MESSAGE</span>
              </div>
            )}
          </div>
          <Link to="/topics">
            <div
              className="forumNavBar"
              onMouseEnter={handleMouseEnter6}
              onMouseLeave={handleMouseLeave6}
            >
              <img src={Forum} alt="logo of forum in the navbar" />
              {isHovering6 && (
                <div className="hiddenForumNavBar">
                  <span>FORUM</span>
                </div>
              )}
            </div>
          </Link>
        </div>
        <div className="bottomButtonNavBar">
          <div
            className="settingNavBar"
            onMouseEnter={handleMouseEnter7}
            onMouseLeave={handleMouseLeave7}
          >
            <img src={Setting} alt="logo of forum in the navbar" />
            {isHovering7 && (
              <div className="hiddenSettingNavBar">
                <span>SETTING</span>
              </div>
            )}
          </div>
          <div
            className="logOutNavBar"
            onMouseEnter={handleMouseEnter8}
            onMouseLeave={handleMouseLeave8}
          >
            <img src={LogOut} alt="logo of forum in the navbar" />
            {isHovering8 && (
              <div className="hiddenLogOutNavBar">
                <span>LOG OUT</span>
              </div>
            )}
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
