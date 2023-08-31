import React, { useState } from "react"
// import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import Cookies from "js-cookie"
// import axios from "axios"

import AuthContext from "./components/AuthContext/AuthContext"
import Home from "./pages/Home"
import CreateGame from "./pages/CreateGame"
import LandingPage from "./pages/LandingPage"
import Dashboard from "./pages/Dashboard"
import GmCards from "./components/Dashboard/GmCards"
import PrivateMessages from "./components/PrivateMessages/PrivateMessages"
import Topics from "./pages/Topics"
import NavBar from "./components/NavBar/Navbar"

function App() {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState([])

  // const tokenFromCookie = Cookies.get("authToken")
  // const idUser = Cookies.get("idUser")
  // const storedUser = JSON.parse(Cookies.get("loggedInUser"))

  // const headers = {
  //   Authorization: `Bearer ${tokenFromCookie}`,
  // }

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:4242/users`, { headers })
  //     .then((res) => {
  //       setUsers(res.data)
  //     })
  //     .catch((err) => {
  //       console.error("Problème lors du chargement des users", err)
  //     })
  // }, [])

  return (
    <>
      <div className="App">
        <AuthContext.Provider
          value={{
            users,
            setUsers,
            user,
            setUser,
          }}
        >
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/create-game" element={<CreateGame />} />
              <Route path="/home" element={<Dashboard />} />
              <Route path="/gmcards" element={<GmCards />} />
              <Route path="/topics" element={<Topics />} />
              <Route path="/test" element={<Home />} />
              <Route path="/privatemessages" element={<PrivateMessages />} />
            </Routes>
            <div className="navBar">
              <NavBar />
            </div>
          </Router>
        </AuthContext.Provider>
      </div>
    </>
  )
}

export default App
