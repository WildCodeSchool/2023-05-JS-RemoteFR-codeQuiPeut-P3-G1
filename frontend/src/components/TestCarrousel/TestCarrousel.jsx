import React, { useState, useEffect } from "react"
import axios from "axios"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"

// import imgCarrousel from "../../assets/test-carrousel/photoCarrousel.png"

function TestCarousel() {
  const sentence = "They Tested, They Find Their Guild And They Like It"
  const wordsToColor = ["Tested", "Find", "Like", "It"]
  const words = sentence.split(/\s+|[,!.?;]/) // Séparation par espace ou les signes de ponctuation

  const cleanWord = (word) => {
    // Suppression des signes de ponctuation en début et fin de mot
    return word.replace(/^[,!.?;:()]+|[,!.?;:()]+$/g, "")
  }
  const [testimonials, setTemoignages] = useState([])

  useEffect(() => {
    const apiUrl = "http://localhost:4242/testimonials"

    axios
      .get(apiUrl)
      .then((response) => {
        setTemoignages(response.data)
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des témoignages:", error)
      })
  }, [])

  return (
    <div className="carrousel-container">
      <div className="title-carrousel">
        {words.map((word, index) => {
          const cleanedWord = cleanWord(word)
          return (
            <span
              key={index}
              style={{
                color: wordsToColor.includes(cleanedWord)
                  ? "#A4945E"
                  : "#FFFFFF",
              }}
            >
              {word}{" "}
            </span>
          )
        })}
      </div>
      <div className="carousel-content">
        <Carousel
          // autoPlay // Active le mode de lecture automatique
          interval={3000} // Définit l'intervalle entre les slides (en millisecondes)
          showArrows={false} // Masque les flèches de navigation
          showThumbs={false} // Masque les miniatures de navigation
          infiniteLoop // Boucle infinie du carousel
          showStatus={false} // Masque le statut
          itemsToShow={1} // Définissez le nombre de slides à afficher
        >
          {testimonials.map((test) => (
            <div className="testimonialCard" key={test.id}>
              <h3>{test.user_name}</h3>
              <p className="textTestimonial">{test.content}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  )
}

export default TestCarousel
