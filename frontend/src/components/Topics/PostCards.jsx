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

  console.info("postcards", postData)

  return (
    <>
      {allPosts.map((post) => (
        <div key={post.id}>
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/${post.profil_picture}`}
            alt="photo de profils de l'utilisateur"
          />
          <div>{post.username}</div>
          <div>{post.content}</div>
        </div>
      ))}
    </>
  )
}
