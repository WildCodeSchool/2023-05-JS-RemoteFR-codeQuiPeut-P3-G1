import React, { useState, useEffect } from "react"
import Cookies from "js-cookie"
import axios from "axios"

export default function PostCards({ isOpen, onClose, postData }) {
  const [allPosts, setAllPosts] = useState([])
  const [newComment, setNewComment] = useState("")

  const idUser = Cookies.get("idUser")
  const tokenFromCookie = Cookies.get("authToken")

  const headers = {
    Authorization: `Bearer ${tokenFromCookie}`
  }

  const handleCommentChange = (event) => {
    setNewComment(event.target.value)
  }

  const fetchComments = () => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/posts/topics/${postData.topic_id}`,
        {
          headers
        }
      )
      .then(
        (res) => setAllPosts(res.data),
        console.info("allPosts: ", allPosts)
      )
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des sujets.",
          error
        )
        // Gérez l'erreur ici (peut-être un message à l'utilisateur)
      })
  }

  const handleSubmitComment = () => {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/posts`,
        {
          content: newComment,
          topics_id: postData.topic_id,
          users_id: idUser
        },
        { headers }
      )
      .then(() => {
        // Effacez le contenu du champ de commentaire après la création
        setNewComment("")
        // Appelez la fonction pour récupérer les commentaires mis à jour
        fetchComments()
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
    // Appelez la fonction pour récupérer les commentaires au chargement initial du composant
    fetchComments()
  }, [newComment])

  console.info("postData: ", postData)

  return (
    <div className={`post-cards ${isOpen ? "open" : "closed"}`}>
      <div className="topics-container">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <div className="titreDeLaPostCard">
          <u>{postData.title}</u>
        </div>
        <div id="allPostContent">
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
                  <p>
                    {new Date(post.date).toLocaleString("en-EN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </p>
                </div>
              </div>
              <div className="contentPostCard">
                <p>{post.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Formulaire pour saisir un nouveau commentaire */}
        <div className="new-comment-form">
          <div className="underlineTopicsTextArea"></div>
          <textarea
            className="textareaPostCArd"
            rows="4"
            placeholder="Enter your answer"
            value={newComment}
            onChange={handleCommentChange}
          ></textarea>
          <button onClick={handleSubmitComment}>SEND MY MESSAGE</button>
        </div>
      </div>
    </div>
  )
}
