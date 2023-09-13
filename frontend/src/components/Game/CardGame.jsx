import React from "react"

export default function CardGame({ onClose }) {
  return (
    <div>
      <button className="buttonClose" onClick={onClose}>
        X
      </button>
    </div>
  )
}
