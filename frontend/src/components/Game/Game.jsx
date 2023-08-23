import React from "react"

import "./Game.scss"

export default function Game({ location }) {
  return (
    <>
      <div className="gameLocationUpcoming">{location}</div>
    </>
  )
}
