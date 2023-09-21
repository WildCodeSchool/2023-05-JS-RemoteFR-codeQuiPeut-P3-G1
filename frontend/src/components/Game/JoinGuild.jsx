import axios from "axios"
import scroll from "../../assets/upcomingTable-assets/scroll.svg"
import Cookies from "js-cookie"

export default function JoinGuild({
  closeJoinGuild,
  gameData,
  setJoinGuildValidation,
  setJoinGuild
}) {
  const tokenFromCookie = Cookies.get("authToken")
  const idUser = Cookies.get("idUser")

  const headers = {
    Authorization: `Bearer ${tokenFromCookie}`
  }

  const handleRegisterGame = () => {
    // e.preventDefault()
    axios
      .post(
        "http://localhost:4242/gamesRegistrations",
        {
          games_id: gameData.id,
          status: "pending",
          requester_id: idUser
        },
        { headers }
      )
      .then((res) => {
        if (res.status === 201) {
          console.info("Enregistrement créé avec succès !")
          setJoinGuild(false)
          setJoinGuildValidation(true)
        }
      })
      .catch((error) => {
        console.error("Erreur lors de l'enregistrement dans la partie :", error)
      })
  }

  return (
    <div id="joinGuildGlobal">
      <img src={scroll} />
      <p>Are you sure to join this table and this guild ?</p>
      <button id="joinGuildNow" onClick={() => handleRegisterGame()}>
        JOIN THE GUILD
      </button>
      <button id="joinGuildNotNow" onClick={closeJoinGuild}>
        NOT NOW
      </button>
    </div>
  )
}
