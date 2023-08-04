// import React, { useState } from "react"
// import axios from "axios"

// export default function NewTopic() {
//   const [texte, setTexte] = useState("")

//   const handleChange = (e) => {
//     setTexte(e.target.value)
//   }

//   return (
//     <div>
//       <p>nom</p>
//       <input
//         type="text"
//         value={texte}
//         onChange={handleChange}
//         placeholder="Saisissez du texte ici"
//       />

//       <button onClick={handleSubmit}>Créer ma partie</button>
//     </div>
//   )
// }

import "./NewTopic.scss"
import axios from "axios"
import React, { useState } from "react"

export default function NewTopic() {
  // const [newTopic, setNewTopic] = useState([])
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:4242/topics")
  //     .then((res) => setNewTopic(res.data))
  // }, [])

  const handleCreateTopic = () => {
    axios
      .post("http://localhost:4242/topics", {
        title: nom,
        categories_id: categorie,
        // role_playing_game_id: rpgID,
        //   gm_profiles_id: gm,
        //   schedule: date,
        //   location: place,
        //   max_players_capacity: playersCapacity,
        //   description: desc,
        //   filters_id: filterID,
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
      <button type="reset" onClick={handleCreateTopic}>
        Créer mon Topic
      </button>
    </>
  )
}
