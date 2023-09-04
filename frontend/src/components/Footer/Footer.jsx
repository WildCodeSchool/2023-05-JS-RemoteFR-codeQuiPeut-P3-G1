import LogoFooter from "../../assets/logo/logo-footer-guild.png"

function Footer() {
  return (
    <div className="footer-Container">
      <div className="footer-subContainer">
        <div className="link-Footer-container">
          <div className="link-Footer-left">
            <p>About us</p>
            <p>FAQ</p>
            <p>Contact</p>
          </div>
          <div className="link-Footer-right">
            <p>Login</p>
            <p>Sitemap</p>
            <p>Privacy Policy</p>
          </div>
        </div>
        <div className="logoANDcopyright-Footer">
          <img src={LogoFooter} alt="Logo de l'entreprise" />
          <p>
            Copyright © 2023 Alexandra Panastier / Abdou Kerkeb / Wild Groupe 1
          </p>
        </div>
        <div className="newsletter-container">
          <p>SUBSCRIBE TO OUR NEWSLETTER</p>
          <div className="input-container-footer">
            <input type="email" placeholder="Your email here" />
            <hr className="line-footer" />
            <p>OK</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
