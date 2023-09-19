import React, { useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"

export default function NewTopic({ onClose }) {
  const tokenFromCookie = Cookies.get("authToken")
  const idUser = Cookies.get("idUser")

  const headers = {
    Authorization: `Bearer ${tokenFromCookie}`
  }

  const [message, setMessage] = useState("")
  const [nom, setNom] = useState("")
  const [categorie, setCategorie] = useState("") // État pour la catégorie sélectionnée

  // Liste des choix pour la liste déroulante
  const choices = [
    { id: 1, name: "Fantasy" },
    { id: 2, name: "Science Fiction" },
    { id: 3, name: "Horror" },
    { id: 4, name: "Mystery" },
    { id: 5, name: "Adventure" }
  ]

  const handleCreateTopic = () => {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/topics`,
        {
          title: nom,
          categories_id: categorie, // Utilisez la valeur sélectionnée
          content: message,
          users_id: idUser
        },
        { headers }
      )
      .then((res) => {
        if (res.status === 200) {
          console.info("NewTopic créée avec succès !")
          onClose() // Ferme la fenêtre modale après la création
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la création du Topic :", error)
      })
  }
  console.info("message", message)
  return (
    <div className="modalNewTopics">
      <div className="modal-content">
        <input
          className="nomTopic"
          type="text"
          placeholder="Nom du Topic"
          onChange={(e) => setNom(e.target.value)}
        />

        <label htmlFor="Catégorie-select">
          Catégorie du Topic:
          <select
            id="catégorieSelect"
            value={categorie} // Utilisez la valeur d'état pour la sélection
            onChange={(e) => setCategorie(e.target.value)} // Mettez à jour l'état lors de la sélection
          >
            <option value="">---</option>
            {choices.map((choice) => (
              <option key={choice.id} value={choice.id}>
                {choice.name}
              </option>
            ))}
          </select>
        </label>
        <input
          className="messageTopic"
          type="text"
          placeholder="Description du topic"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="buttonCreateTopic"
          type="reset"
          onClick={handleCreateTopic}
        >
          Créer mon Topic
        </button>
        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  )
}
