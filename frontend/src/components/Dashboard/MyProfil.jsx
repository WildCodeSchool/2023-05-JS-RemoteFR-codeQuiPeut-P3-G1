import "./MyProfil.scss"

import iconProfile from "../../assets/icon-dashboard/iconProfile.png"
import Add2 from "../../assets/icon-dashboard/Add2.png"
import Edit from "../../assets/icon-dashboard/Edit.png"
import Location from "../../assets/icon-dashboard/Location.png"

const MyProfil = () => {
  return (
    <div className="myProfil">
      <div className="titleProfil">
        <img id="logoProfile" src={iconProfile} alt="logo of a profile" />
        <h2>MY PROFIL</h2>
      </div>
      <div className="contentMyProfil">
        <div className="editProfile">
          <img id="logoEdit" src={Edit} alt="logo of a pen" />
          <p>Edit Profile</p>
        </div>
        <div className="topProfile">
          <div className="logoAdd2">
            <img id="logoAdd2" src={Add2} alt="logo of a cross" />
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
            <button type="button"> NOT DEFINED</button>
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
