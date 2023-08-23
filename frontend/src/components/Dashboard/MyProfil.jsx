import "./MyProfil.scss"
// import axios from "axios"
import React, { useState } from "react"
// import { Link } from "react-router-dom"
import iconProfile from "../../assets/icon-dashboard/iconProfile.png"
import Add2 from "../../assets/icon-dashboard/Add2.png"
import Edit from "../../assets/icon-dashboard/Edit.png"
import Location from "../../assets/icon-dashboard/Location.png"

const MyProfil = () => {
  // const [games, setGames] = useState([])
  // useEffect(() => {
  //   axios.get("http://localhost:4242/games")
  //   .then((res) => setGames(res.data))
  //   console.info(games)
  // }, [])

  const [userPicture, setUserPicture] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)

  const handlePictureChange = (e) => {
    const picture = e.target.files[0]
    setUserPicture(picture)
    setImageUrl(URL.createObjectURL(picture))
  }

  return (
    <div className="myProfil">
      <div className="titleProfil">
        <img id="logoProfile" src={iconProfile} alt="logo of a profile" />
        <h2>MY PROFIL</h2>
      </div>
      <div className="contentMyProfil">
        <div className="editProfile">
          <button type="button" id="editButton">
            <img id="logoEdit" src={Edit} alt="logo of a pen" />
            <p>Edit Profile</p>
          </button>
        </div>
        <div className="topProfile">
          <div className="logoAdd2">
            <label htmlFor="buttonPicture">
              {userPicture ? (
                <img src={imageUrl} alt="userPicture" id="logoAdd2" />
              ) : (
                <img id="logoAdd2" src={Add2} alt="logo of a cross" />
              )}
            </label>
            <input
              type="file"
              id="buttonPicture"
              accept="image/*"
              onChange={handlePictureChange}
              style={{ display: "none" }}
            />
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
            <p> NOT DEFINED</p>
          </div>
        </div>
        <div className="middleProfile">
          <p>
            Warning: No bio founded on this profile. Dear user, please consider
            adding a bio to let others know more about you!
          </p>
        </div>
        <div className="bottomProfile">
          <h1>MY GAMES / SEARCH TO PLAY ON</h1>
        </div>
      </div>
    </div>
  )
}
export default MyProfil
