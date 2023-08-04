import React, { useState } from "react"
import axios from "axios"

export default function NewTopic() {
  const [nouveauSujet, setNouveauSujet] = useState({
    Nom: "",
    categorie: "",
  })

  const handleInputChange = (e) => {
    setNouveauSujet({
      ...nouveauSujet,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    axios
      .post("http://localhost:4242/topics", nouveauSujet)
      .then((res) => {
        console.info("Nouveau sujet ajouté :", res.data)

        setNouveauSujet({
          Nom: "",
          categorie: "",
        })
      })
      .catch((error) =>
        console.error("Erreur lors de l'ajout du nouveau sujet :", error)
      )
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* <label>Nom :</label> */}
      <input
        type="text"
        name="Nom"
        value={nouveauSujet.Nom}
        onChange={handleInputChange}
      />
      {/* <label>Catégorie :</label> */}
      <input
        type="text"
        name="categorie"
        value={nouveauSujet.categorie}
        onChange={handleInputChange}
      />
      <button type="submit">Ajouter</button>
    </form>
  )
}
