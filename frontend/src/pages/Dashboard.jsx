import NavBar from "../components/NavBar/Navbar"
import "./Dashboard.scss"

import Dice from "../assets/icon-dashboard/Dice.png"
import Add from "../assets/icon-dashboard/Add.png"
import questionMark from "../assets/icon-dashboard/questionMark.png"
import Notepad from "../assets/icon-dashboard/Notepad.png"
import Search from "../assets/icon-dashboard/Search.png"
import iconProfile from "../assets/icon-dashboard/iconProfile.png"
import Add2 from "../assets/icon-dashboard/Add2.png"
import Edit from "../assets/icon-dashboard/Edit.png"
import Location from "../assets/icon-dashboard/Location.png"

const Dashboard = () => {
  return (
    <>
      <div className="mainDivDashboard">
        <div className="iconRight">
          <img id="logoNotepad" src={Notepad} alt="logo of notepad" />
          <img
            id="logoQuestionMark"
            src={questionMark}
            alt="logo of question mark"
          />
        </div>
        <div className="dashboardAllComponents">
          <div className="dashboardTitle">
            <h1>DASHBOARD</h1>
          </div>
          <div className="dashboardComponents">
            <div className="myFutureGames">
              <img id="logoFutureGames" src={Dice} alt="logo of D20" />
              <h2>MY FUTURE GAMES</h2>
              <div className="contentFutureGames">
                <div className="contentWindow">
                  <div className="divButtonsss">
                    <div className="logoContentFG">
                      <img id="logoAdd" src={Add} alt="logo of a cross" />
                      <img
                        id="logoSearch"
                        src={Search}
                        alt="logo of a magnifier"
                      />
                    </div>
                  </div>
                  <p>
                    You are not registered for any games yet Check the list of
                    upcoming games or click on bouton find your party
                  </p>
                  <button id="partyFinder" type="button">
                    FIND YOUR PARTY
                  </button>
                </div>
              </div>
            </div>
            <div className="myProfil">
              <div className="titleProfil">
                <img
                  id="logoProfile"
                  src={iconProfile}
                  alt="logo of a profile"
                />
                <h2>MY PROFIL</h2>
              </div>
              <div className="contentMyProfil">
                <div className="editProfile">
                  <img id="logoEdit" src={Edit} alt="logo of a pen" />
                  <p>Edit Profile</p>
                </div>
                <div className="topProfile">
                  <div className="logoAdd2">
                    <img id="logoAdd2" src={Add2} alt="logo of a cross" />
                  </div>
                  <div className="centralDiv">
                    <div className="userInfoProfile">
                      <p>DogsLord</p>
                      <h2>registered since 07/07/2010</h2>
                    </div>
                    <div className="locationProfile">
                      <img
                        id="logoLocation"
                        src={Location}
                        alt="logo of a map pointer"
                      />
                      <p>Not Defined</p>
                    </div>
                  </div>
                  <div className="profileButton">
                    <button type="button"> NOT DEFINED</button>
                  </div>
                </div>
                <div className="middleProfile">
                  <p>
                    Warning: No bio founded on this profile. Dear user, please
                    consider adding a bio to let others know more about you!
                  </p>
                </div>
                <div className="bottomProfile">
                  <h1>MY GAMES / SEARCH TO PLAY ON</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NavBar />
      </div>
    </>
  )
}

export default Dashboard
