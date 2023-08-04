import "./App.scss"
import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import Home from "./pages/Home"
import CreateGame from "./pages/CreateGame"
import LandingPage from "./pages/LandingPage"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/create-game" element={<CreateGame />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
