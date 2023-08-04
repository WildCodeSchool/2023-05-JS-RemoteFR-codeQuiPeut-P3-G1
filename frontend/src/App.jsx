import "./App.scss"
import Carousel from "./components/Carousel/Carousel"
import NavBar from "./components/NavBar/Navbar"
import OnlineStatus from "./components/UserProfil/OnlineStatus"

function App() {
  return (
    <>
      <div className="App">
        <OnlineStatus />
        <NavBar />
        <Carousel />
        {/* <Home /> */}
      </div>
    </>
  )
}

export default App
