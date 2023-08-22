// src/Carousel.js
import React, { useState, useEffect } from "react"
import axios from "axios"
import "./TestCarrousel.scss"

import imgCarrousel from "../../assets/test-carrousel/photoCarrousel.png"

function TestCarousel() {
  const sentence = "They Tested, They Find Their Guild And They Like It"
  const wordsToColor = ["Tested", "Find", "Like", "It"]
  const words = sentence.split(/\s+|[,!.?;]/) // Séparation par espace ou les signes de ponctuation

  const cleanWord = (word) => {
    // Suppression des signes de ponctuation en début et fin de mot
    return word.replace(/^[,!.?;:()]+|[,!.?;:()]+$/g, "")
  }
  const [testimonials, setTemoignages] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

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

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 3 : prevIndex - 1
    )
  }

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 3 ? 0 : prevIndex + 1
    )
  }

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
      <div className="carrousel-content">
        <button className="carrousel-button prev" onClick={handlePrevClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="31"
            viewBox="0 0 32 31"
            fill="none"
          >
            <path
              d="M0.982613 16.8102C0.201563 16.0292 0.201563 14.7628 0.982613 13.9818L13.7105 1.25386C14.4916 0.472812 15.7579 0.472812 16.539 1.25386C17.32 2.03491 17.32 3.30124 16.539 4.08229L5.22525 15.396L16.539 26.7097C17.32 27.4908 17.32 28.7571 16.539 29.5381C15.7579 30.3192 14.4916 30.3192 13.7105 29.5381L0.982613 16.8102ZM31.5886 17.396L2.39683 17.396L2.39683 13.396L31.5886 13.396L31.5886 17.396Z"
              fill="#A4945E"
            />
          </svg>
        </button>
        {testimonials
          .slice(currentIndex, currentIndex + 3)
          .map((testimonial, index) => (
            <div key={index} className="carrousel-item">
              <div className="carrousel-header">
                <img src={imgCarrousel} alt="photo de profil du temoignant" />
                <div className="H2HR-carrousel">
                  <span>{testimonial.title}</span>
                  <hr />
                </div>
              </div>
              <p>{testimonial.content}</p>
            </div>
          ))}
        <button className="carrousel-button next" onClick={handleNextClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="31"
            viewBox="0 0 32 31"
            fill="none"
          >
            <path
              d="M31.004 16.8102C31.785 16.0292 31.785 14.7628 31.004 13.9818L18.276 1.25386C17.495 0.472812 16.2287 0.472812 15.4476 1.25386C14.6666 2.03491 14.6666 3.30124 15.4476 4.08229L26.7613 15.396L15.4476 26.7097C14.6666 27.4908 14.6666 28.7571 15.4476 29.5381C16.2287 30.3192 17.495 30.3192 18.276 29.5381L31.004 16.8102ZM0.397949 17.396L29.5897 17.396L29.5897 13.396L0.397949 13.396L0.397949 17.396Z"
              fill="#A4945E"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default TestCarousel
