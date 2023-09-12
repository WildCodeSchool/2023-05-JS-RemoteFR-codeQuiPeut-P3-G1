import React, { useState, useEffect } from "react"
import axios from "axios"
import NewTopic from "../components/NewTopic/NewTopic"
import Cookies from "js-cookie"

export default function Topics() {
  const tokenFromCookie = Cookies.get("authToken")
  const [topics, setTopics] = useState([])
  const [isNewTopicOpen, setIsNewTopicOpen] = useState(false) // État pour gérer l'ouverture de la fenêtre modale
  const headers = {
    Authorization: `Bearer ${tokenFromCookie}`
  }

  useEffect(() => {
    axios
      .get("http://localhost:4242/topics", { headers })
      .then((res) => setTopics(res.data))
  }, [])
  console.info("ICI", topics)

  const openNewTopicModal = () => {
    setIsNewTopicOpen(true)
  }

  const closeNewTopicModal = () => {
    setIsNewTopicOpen(false)
  }

  return (
    <div className="globalDivTopics">
      <div className="BoxTopicsAndNewTopics">
        <div className="glaobalTopicsBox">
          {topics.map((topic) => (
            <div key={topic.id}>
              <ul className="topicbox">
                <li>{topic.title}</li>
                <li>{topic.categories_id}</li>
                <li>{topic.users_id}</li>
                <li>{topic.creation_date}</li>
                <li>{topic.subscription_count}</li>
              </ul>
            </div>
          ))}
        </div>
        <div className="boxNewTopics">
          <button onClick={openNewTopicModal}>Nouveau Topic</button>
        </div>
      </div>

      {/* Afficher la fenêtre modale si isNewTopicOpen est vrai */}
      {isNewTopicOpen && (
        <div className="modal">
          <div className="modal-content">
            <NewTopic onClose={closeNewTopicModal} />
          </div>
        </div>
      )}
    </div>
  )
}
