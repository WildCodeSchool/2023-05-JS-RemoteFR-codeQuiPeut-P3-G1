import React, { useState, useEffect } from "react"
import axios from "axios"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"

function TestCarousel() {
  const [testimonials, setTemoignages] = useState([])
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/testimonialsCarrousel`)
      .then((response) => {
        setTemoignages(response.data)
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des témoignages:", error)
      })
  }, [])

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="carrousel-container">
      <div className="title-carrousel">
        <p>
          They{" "}
          <span
            style={{ color: "#A4945E", fontStyle: "italic", fontWeight: "400" }}
          >
            Tested
          </span>
          , They{" "}
          <span
            style={{ color: "#A4945E", fontStyle: "italic", fontWeight: "400" }}
          >
            Find
          </span>{" "}
          Their Guild <br />
          And They{" "}
          <span
            style={{ color: "#A4945E", fontStyle: "italic", fontWeight: "400" }}
          >
            Liked It
          </span>
        </p>
      </div>
      <div className="carousel-content">
        <Carousel
          autoPlay={true} // Active le mode de lecture automatique
          interval={4000} // Définit l'intervalle entre les slides (en millisecondes)
          showArrows={true} // Masque les flèches de navigation
          showThumbs={false} // Masque les miniatures de navigation
          infiniteLoop={true} // Boucle infinie du carousel
          showStatus={false} // Masque le statut
          centerMode={true} // Activer le mode centre pour afficher le nombre d'éléments souhaité
          centerSlidePercentage={windowWidth <= 768 ? 100 : 33.33}
          className="my-carousel"
        >
          {testimonials.map((test) => (
            <div className="testimonialCard" key={test.id}>
              <div className="jeSaisPas">
                <div className="testimonialImg">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${
                      test.profil_picture
                    }`}
                    alt="Profil_picture"
                  />
                </div>
                <div className="testimonialUsername">
                  <h3>{test.username}</h3>
                </div>
              </div>
              <div className="jeSaisPasContenu">
                <p className="textTestimonial">"{test.content}"</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  )
}

export default TestCarousel
