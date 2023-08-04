import "./App.scss"
import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import CreateGame from "./pages/CreateGame"
import LandingPage from "./pages/LandingPage"
import Dashboard from "./pages/Dashboard"
import Topics from "./pages/Topics"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/create-game" element={<CreateGame />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/test" element={<Home />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
