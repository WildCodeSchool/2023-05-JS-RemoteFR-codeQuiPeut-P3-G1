import "./NewTopic.scss"
import axios from "axios"
import React, { useState } from "react"

export default function NewTopic() {
  const handleCreateTopic = () => {
    axios
      .post("http://localhost:4242/topics", {
        title: nom,
        categories_id: categorie,
        users_id: user,
      })
      .then((res) => {
        if (res.status === 200) {
          console.info("NewTopic créée avec succès !")
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la création du Topic :", error)
      })
  }

  const [nom, setNom] = useState("")
  const [categorie, setCategorie] = useState("")
  const [user, setUser] = useState("")

  return (
    <>
      <input
        type="text"
        placeholder="Nom du Topic"
        onChange={(e) => setNom(e.target.value)}
      />
      <input
        type="text"
        placeholder="Catégorie du Topic"
        onChange={(e) => setCategorie(e.target.value)}
      />

      <input
        type="text"
        placeholder="users_id"
        onChange={(e) => setUser(e.target.value)}
      />
      <button type="reset" onClick={handleCreateTopic}>
        Créer mon Topic
      </button>
    </>
  )
}
