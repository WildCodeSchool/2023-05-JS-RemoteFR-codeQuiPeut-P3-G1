import "./App.scss"

// import Home from "./pages/Home"
import NavBar from "./components/NavBar/Navbar"
import OnlineStatus from "./components/UserProfil/OnlineStatus"

function App() {
  return (
    <>
      <div className="App">
        <OnlineStatus />
        <NavBar />
        {/* <Home /> */}
      </div>
    </>
  )
}

export default App
