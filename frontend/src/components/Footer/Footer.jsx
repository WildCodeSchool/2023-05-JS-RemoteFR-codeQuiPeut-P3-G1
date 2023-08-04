import "./Footer.scss"

import LogoFooter from "../../assets/logo/logo-footer-guild.png"

function Footer() {
  return (
    <div className="footer-Container">
      <div className="footer-subContainer">
        <div className="link-Footer-container">
          <div className="link-Footer-left">
            <span>About us</span>
            <span>FAQ</span>
            <span>Contact</span>
          </div>
          <div className="link-Footer-right">
            <span>Login</span>
            <span>Sitemap</span>
            <span>Privacy Policy</span>
          </div>
        </div>
        <div className="logoANDcopyright-Footer">
          <img src={LogoFooter} alt="Logo de l'entreprise" />
          <span>Copyright © 2023 Alexandra Panastier / Abdou Kerkeb</span>
        </div>
        <div className="newsletter-container">
          <span>SUBSCRIBE TO OUR NEWSLETTER</span>
          <div className="input-container-footer">
            <input type="email" placeholder="Your email here" />
            <hr className="line-footer" />
            <span>OK</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
