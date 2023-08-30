// import NavBar from "../components/NavBar/Navbar"

import questionMark from "../assets/icon-dashboard/questionMark.png"
import Notepad from "../assets/icon-dashboard/Notepad.png"

import MyProfil from "../components/Dashboard/MyProfil"
import FuturGames from "../components/Dashboard/FuturGames"
import FriendRequest from "../components/Dashboard/FriendRequest"

const Dashboard = () => {
  return (
    <>
      <div className="mainDivDashboard">
        <div className="Icon-Title-Dashboard">
          <div className="dashboardTitle">
            <h1>DASHBOARD</h1>
          </div>
          <div className="iconRight">
            <img id="logoNotepad" src={Notepad} alt="logo of notepad" />
            <img
              id="logoQuestionMark"
              src={questionMark}
              alt="logo of question mark"
            />
          </div>
        </div>
        <div className="dashboardAllComponents">
          <div className="friends-games-container">
            <FuturGames />
            <FriendRequest />
          </div>
          <div className="dashboardComponents">
            <MyProfil />
          </div>
        </div>
        {/* <NavBar /> */}
      </div>
    </>
  )
}

export default Dashboard
