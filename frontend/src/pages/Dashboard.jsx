import NavBar from "../components/NavBar/Navbar"

import questionMark from "../assets/icon-dashboard/questionMark.png"
import Notepad from "../assets/icon-dashboard/Notepad.png"

import MyProfil from "../components/Dashboard/MyProfil"
import FuturGames from "../components/Dashboard/FuturGames"
import PlayerCards from "../components/Dashboard/PlayerCards"
import GmCards from "../components/Dashboard/GmCards"

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
            <FuturGames />
            <MyProfil />
            <PlayerCards />
            <GmCards />
          </div>
        </div>
        <NavBar />
      </div>
    </>
  )
}

export default Dashboard
