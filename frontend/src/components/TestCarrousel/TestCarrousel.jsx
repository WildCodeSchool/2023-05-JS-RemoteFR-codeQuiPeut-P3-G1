import React, { useState, useEffect } from "react"
import axios from "axios"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"

function TestCarousel() {
  const [testimonials, setTemoignages] = useState([])

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
  console.info(testimonials)

  return (
    <div className="carrousel-container">
      <div className="title-carrousel">
        <p>
          They <span style={{ color: "#e2d07c" }}>Tested</span>, They{" "}
          <span style={{ color: "#e2d07c" }}>Find</span> Their Guild <br />
          And They{" "}
          <span style={{ color: "#e2d07c", fontWeight: "bold" }}>Liked It</span>
        </p>
      </div>
      <div className="carousel-content">
        <Carousel
          autoPlay // Active le mode de lecture automatique
          interval={4000} // Définit l'intervalle entre les slides (en millisecondes)
          showArrows={false} // Masque les flèches de navigation
          showThumbs={false} // Masque les miniatures de navigation
          infiniteLoop // Boucle infinie du carousel
          showStatus={false} // Masque le statut
          centerMode={true} // Activer le mode centre pour afficher le nombre d'éléments souhaité
          centerSlidePercentage={33.33} // Définir la largeur des éléments centraux
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
