import React, { useState, useEffect } from "react"

import iconGuildHeader from "../../assets/landing-assets/iconGuildHeader.svg"

import { gsap, CSSPlugin, Expo } from "gsap"
gsap.registerPlugin(CSSPlugin)

function Loader({ loadingComplete, handleLoadingComplete }) {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const count = setInterval(() => {
      setCounter((counter) =>
        counter < 100
          ? counter + 1
          : (clearInterval(count), setCounter(100), reveal())
      )
    }, 25)
  }, [])

  const reveal = () => {
    const t1 = gsap.timeline({
      onComplete: () => {
        handleLoadingComplete()
      }
    })

    t1.to(".follow", {
      width: "100%",
      ease: Expo.easeInOut,
      duration: 1.2,
      delay: 0.5
    })
      .to(".hide", { opacity: 0, duration: 0.3 })
      .to(".hide", { display: "none", duration: 0.3 })
      .to(".follow", {
        height: "100%",
        ease: Expo.easeInOut,
        duration: 0.7,
        delay: 0.5
      })
      .to(".content", {
        width: "100%",
        ease: Expo.easeInOut,
        duration: 0.5
      })
      .to(".Content", {
        width: "100%",
        ease: Expo.easeOut,
        duration: 0.5
      })
      .to(".Follow", {
        width: "100%",
        ease: Expo.easeInOut,
        duration: 0.7
      })
      .to(".title-lines", { display: "block", duration: 0.1 })
      .to(".title-lines", {
        opacity: 1,
        stagger: 0.15,
        ease: Expo.easeInOut,
        duration: 0.5
      })
      .to(".guildLogoLoader", { display: "block", duration: 0.1 })
      .to(".guildLogoLoader", {
        opacity: 1,
        stagger: 0.1,
        ease: Expo.easeInOut,
        duration: 0.5
      })
  }

  return (
    <div className={`AppContainer ${loadingComplete ? "hidden" : ""}`}>
      <div className="Loading">
        <div className="Follow follow"></div>
        <div
          className="ProgressBar hide"
          id="progress-bar"
          style={{ width: counter + "%" }}
        ></div>
        <div className="Count hide">{counter}%</div>
      </div>

      <div className="Content content">
        <p className="title-lines">Welcome to</p>
        <img className="guildLogoLoader" src={iconGuildHeader} />
      </div>
    </div>
  )
}

export default Loader
