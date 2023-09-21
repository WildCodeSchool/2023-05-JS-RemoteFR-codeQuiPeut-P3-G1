/* import React, { useState, useEffect } from "react"
import axios from "axios"

export default function PostCards({ isOpen, onClose, postData, headers }) {
  const [allPosts, setAllPosts] = useState([])

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/posts/topics/${postData.id}`, {
        headers
      })
      .then((res) => setAllPosts(res.data))
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des sujets.",
          error
        )
        // Gérez l'erreur ici (peut-être un message à l'utilisateur)
      })
  }, [postData])

  console.info("PostCard PostData", postData)

  return (
    <div className={`post-cards ${isOpen ? "open" : "closed"}`}>
      <div className="topics-container">
        <button className="close-button" onClick={onClose}>
          Fermer
        </button>

        {allPosts.map((post) => (
          <div className="post-card" key={post.id}>
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${post.profil_picture}`}
              alt="photo de profil de l'utilisateur"
            />
            <div className="post-details">
              <div className="username">{post.username}</div>
              <div className="content">{post.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} */

import React, { useState, useEffect } from "react"
import Cookies from "js-cookie"
import axios from "axios"

export default function PostCards({ isOpen, onClose, postData, headers }) {
  const [allPosts, setAllPosts] = useState([])
  const [newComment, setNewComment] = useState("") // État pour suivre le nouveau commentaire saisi

  const idUser = Cookies.get("idUser")

  console.info("headers", headers)

  const handleCommentChange = (event) => {
    setNewComment(event.target.value)
  }
  console.info("PC postData", postData)
  const handleSubmitComment = () => {
    // Envoyez le nouveau commentaire au serveur ici en utilisant une requête axios POST
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/posts`, // Assurez-vous d'avoir une route appropriée pour la création de commentaires
        {
          content: newComment,
          topicId: postData.id,
          users_id: idUser
        },
        { headers }
      )
      .then((res) => {
        // Mettez à jour la liste des commentaires après la création réussie
        setAllPosts([...allPosts, res.data])
        // Effacez le contenu du champ de commentaire après la création
        setNewComment("")
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la création du commentaire.",
          error
        )
        // Gérez l'erreur ici (peut-être un message à l'utilisateur)
      })
  }

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/posts/topics/${postData.id}`, {
        headers
      })
      .then((res) => setAllPosts(res.data))
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des sujets.",
          error
        )
        // Gérez l'erreur ici (peut-être un message à l'utilisateur)
      })
  }, [postData])

  console.info("PostCard PostData", postData)

  return (
    <div className={`post-cards ${isOpen ? "open" : "closed"}`}>
      <div className="topics-container">
        <button className="close-button" onClick={onClose}>
          Fermer
        </button>

        {allPosts.map((post) => (
          <div className="post-card" key={post.id}>
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${post.profil_picture}`}
              alt="photo de profil de l'utilisateur"
            />
            <div className="post-details">
              <div className="username">{post.username}</div>
              <div className="content">{post.content}</div>
            </div>
          </div>
        ))}

        {/* Formulaire pour saisir un nouveau commentaire */}
        <div className="new-comment-form">
          <textarea
            rows="4"
            placeholder="Saisissez votre commentaire"
            value={newComment}
            onChange={handleCommentChange}
          ></textarea>
          <button onClick={handleSubmitComment}>Poster le commentaire</button>
        </div>
      </div>
    </div>
  )
}
