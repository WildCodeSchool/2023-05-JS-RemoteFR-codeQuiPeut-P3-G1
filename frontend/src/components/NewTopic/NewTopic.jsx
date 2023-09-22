import React, { useState } from "react"

import axios from "axios"

import Cookies from "js-cookie"

export default function NewTopic({ onClose, updateShouldRefreshTable }) {
  const tokenFromCookie = Cookies.get("authToken")

  const idUser = Cookies.get("idUser")

  const headers = {
    Authorization: `Bearer ${tokenFromCookie}`
  }

  const [message, setMessage] = useState("")
  const [nom, setNom] = useState("")
  const [categorie, setCategorie] = useState("")

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
          categories_id: categorie,
          content: message,
          users_id: idUser
        },

        { headers }
      )

      .then((res) => {
        console.info("NewTopic créée avec succès !", res.status)

        if (res.status === 200 || res.status === 201) {
          onClose(true) // Ferme la fenêtre modale après la création
          updateShouldRefreshTable(true) // Indique que la table doit être rafraîchie
        }
      })

      .catch((error) => {
        console.error("Erreur lors de la création du Topic :", error)
      })
  }

  return (
    <div className="modalNewTopic">
      {" "}
      <div className="modalContent">
        <h2 className="titleNewTopic">New subject</h2> <p>Title</p>{" "}
        <input
          className="nomTopic"
          type="text"
          placeholder="Topic Name"
          onChange={(e) => setNom(e.target.value)}
        />{" "}
        <label className="modalContent" htmlFor="Catégorie-select">
          <p>Topic's category</p>
          <select
            id="categorieSelect"
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
          >
            <option value="">---</option>{" "}
            {choices.map((choice) => (
              <option key={choice.id} value={choice.id}>
                {choice.name}{" "}
              </option>
            ))}{" "}
          </select>{" "}
        </label>
        <p>Description</p>
        <input
          className="messageTopic"
          type="text"
          placeholder="Topic description"
          onChange={(e) => setMessage(e.target.value)}
        />{" "}
        <button
          className="buttonCreateTopic"
          type="reset"
          onClick={() => {
            handleCreateTopic()

            onClose(true) // Ferme la fenêtre modale après la création // updateShouldRefreshTable(true)
          }}
        >
          Create{" "}
        </button>
        <button onClick={() => onClose(false)} id="buttonCloseNewTopic">
          Close
        </button>{" "}
      </div>{" "}
    </div>
  )
}
