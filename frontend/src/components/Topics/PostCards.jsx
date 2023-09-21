import React, { useState, useEffect } from "react"
import Cookies from "js-cookie"
import axios from "axios"
import moment from "moment"

export default function PostCards({ isOpen, onClose, postData }) {
  const [allPosts, setAllPosts] = useState([])
  const [newComment, setNewComment] = useState("") // Etat pour suivre le nouveau commentaire saisi

  const idUser = Cookies.get("idUser")
  const tokenFromCookie = Cookies.get("authToken")

  const headers = {
    Authorization: `Bearer ${tokenFromCookie}`
  }

  console.info("postData", postData)

  const handleCommentChange = (event) => {
    setNewComment(event.target.value)
  }
  const handleSubmitComment = () => {
    // Envoyez le nouveau commentaire au serveur ici en utilisant une requête axios POST
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/posts`, // Assurez-vous d'avoir une route appropriée pour la création de commentaires
        {
          content: newComment,
          topics_id: postData.id,
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
  }, [newComment])

  return (
    <div className={`post-cards ${isOpen ? "open" : "closed"}`}>
      <div className="topics-container">
        <button className="close-button" onClick={onClose}>
          Fermer
        </button>

        {allPosts.map((post) => (
          <div className="post-card" key={post.id}>
            <div className="post-details">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${
                  post.profil_picture
                }`}
                alt="photo de profil de l'utilisateur"
              />
              <div className="usernamePostCard">
                <p>{post.username}</p>
              </div>
              <div className="postForumDate">
                <p>{moment(post.date).format("HH:mm DD/MM/YY")}</p>
              </div>
            </div>
            <div className="contentPostCard">
              <p>{post.content}</p>
            </div>
          </div>
        ))}
        {/* Formulaire pour saisir un nouveau commentaire */}
        <div className="new-comment-form">
          <textarea
            className="textareaPostCArd"
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
