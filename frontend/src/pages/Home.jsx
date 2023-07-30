import { useState } from "react"
import axios from "axios"

export default function Home() {
  const [usernameDb, setUsernameDb] = useState("")
  const [passwordDb, setPasswordDb] = useState("")

  const handleCreateUser = () => {
    axios
      .post("http://localhost:4242/users", {
        username: usernameDb,
        password: passwordDb,
      })
      .then((res) => {
        if (res.status === 200) {
          console.info("Utilisateur créé avec succès !")
          // Faire d'autres traitements si nécessaire
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la création de l'utilisateur :", error)
        // Gérer l'erreur et donner un retour à l'utilisateur si nécessaire
      })
    console.info(usernameDb + passwordDb)
  }

  const handleUser = (e) => {
    setUsernameDb(e.target.value)
  }
  const handlePass = (e) => {
    setPasswordDb(e.target.value)
  }
  return (
    <header className="App-header">
      <p>coucou</p>
      <input
        type="text"
        value={usernameDb}
        onChange={handleUser}
        placeholder="username"
      />
      <input
        type="text"
        value={passwordDb}
        onChange={handlePass}
        placeholder="pass"
      />
      <button onClick={handleCreateUser}>Créer un utilisateur</button>
    </header>
  )
}
