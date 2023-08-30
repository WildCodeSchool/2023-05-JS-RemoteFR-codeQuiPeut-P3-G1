import { useContext, useEffect } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import AuthContext from "../components/AuthContext/AuthContext"

import NavBar from "../components/NavBar/Navbar"

import questionMark from "../assets/icon-dashboard/questionMark.png"
import Notepad from "../assets/icon-dashboard/Notepad.png"

import MyProfil from "../components/Dashboard/MyProfil"
import FuturGames from "../components/Dashboard/FuturGames"

const Dashboard = () => {
  const { setUser, setUsers } = useContext(AuthContext)
  const tokenFromCookie = Cookies.get("authToken")
  const idUser = Cookies.get("idUser")
  // const storedUser = JSON.parse(Cookies.get("loggedInUser"))

  const headers = {
    Authorization: `Bearer ${tokenFromCookie}`,
  }

  useEffect(() => {
    axios
      .get(`http://localhost:4242/users`, { headers })
      .then((res) => {
        setUsers(res.data)
      })
      .catch((err) => {
        console.error("Problème lors du chargement des users", err)
      })
  }, [])

  useEffect(() => {
    axios
      .get(`http://localhost:4242/users/${idUser}`, { headers })
      .then((res) => {
        setUser(res.data)
      })
      .catch((err) => {
        console.error("Problème lors du chargement des users", err)
      })
  }, [])

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
            <MyProfil idUser={idUser} />
          </div>
        </div>
        <NavBar />
      </div>
    </>
  )
}

export default Dashboard
