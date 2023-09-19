import { useState, useEffect } from "react"
import axios from "axios"

export default function Topics({ postData, headers }) {
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

  return (
    <div className="topics-container">
      {" "}
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
  )
}
