import "./App.scss"
import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import CreateGame from "./pages/CreateGame"
import PrivateMessages from "./components/PrivateMessages/PrivateMessages"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-game" element={<CreateGame />} />
          <Route path="/privatemessages" element={<PrivateMessages />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
