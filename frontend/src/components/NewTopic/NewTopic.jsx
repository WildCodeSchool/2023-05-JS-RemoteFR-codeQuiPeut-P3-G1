import React, { useState } from "react"

import axios from "axios"

import Cookies from "js-cookie"
import { toast } from "react-toastify"

export default function NewTopic({
  setIsNewTopicOpen,
  updateShouldRefreshTable
}) {
  const tokenFromCookie = Cookies.get("authToken")

  const idUser = Cookies.get("idUser")

  const headers = {
    Authorization: `Bearer ${tokenFromCookie}`
  }

  const [message, setMessage] = useState("")
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")

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
          title: name,
          categories_id: category,
          content: message,
          users_id: idUser
        },
        { headers }
      )
      .then((res) => {
        console.info("Topic créé avec succès !", res.status)
        if (res.status === 200 || res.status === 201) {
          setIsNewTopicOpen(false) // Ferme la fenêtre modale après la création
          updateShouldRefreshTable(true) // Indique que la table doit être rafraîchie
          toast.success("Topic create with success !", {
            position: toast.POSITION.TOP_RIGHT
          })
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la création du Topic :", error)
        toast.error("Erreur when creating the topic", {
          position: toast.POSITION.TOP_RIGHT
        })
      })
  }

  return (
    <div className="modalNewTopic">
      <div className="modalContent">
        <div className="inputNewTopic">
          <h2 id="titleNewTopic">NEW SUBJECT</h2>
          <label htmlFor="newTopicTitle">
            <p>Title</p>
            <input
              className="newTopicInput"
              name="newTopicTitle"
              type="text"
              placeholder="Topic Name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label htmlFor="newTopicCategory">
            <p>Topic's category</p>
            <div className="newTopicCategory">
              <select
                className="newTopicInput"
                name="newTopicCategory"
                id="categorieSelect"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select your category</option>
                {choices.map((choice) => (
                  <option key={choice.id} value={choice.id}>
                    {choice.name}
                  </option>
                ))}
              </select>
            </div>
          </label>
          <label htmlFor="newTopicFirstMessage">
            <p>First message</p>
            <textarea
              className="newTopicInput"
              id="newTopicFirstMessage"
              type="text"
              placeholder="Enter the first message of your topic here"
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
        </div>

        <div className="buttonNewTopic">
          <button
            id="buttonCreateTopic"
            type="reset"
            onClick={() => {
              if (category !== "" && message !== "" && name !== "") {
                handleCreateTopic()
              }
            }}
          >
            CREATE
          </button>

          <button
            onClick={() => setIsNewTopicOpen(false)}
            id="buttonCloseNewTopic"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  )
}
