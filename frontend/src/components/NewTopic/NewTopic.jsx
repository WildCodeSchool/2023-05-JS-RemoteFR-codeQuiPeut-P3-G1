import React, { useState } from "react"
// import axios from "axios"

export default function NewTopic() {
  const [texte, setTexte] = useState("")

  const handleChange = (e) => {
    setTexte(e.target.value)
  }

  return (
    <div>
      <p>nom</p>
      <input
        type="text"
        value={texte}
        onChange={handleChange}
        placeholder="Saisissez du texte ici"
      />

      {/* <button onClick={handleSubmit}>Créer ma partie</button> */}
    </div>
  )
}
