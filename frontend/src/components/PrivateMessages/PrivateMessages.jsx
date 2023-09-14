import { useEffect, useState } from "react"
import LoupeLogo from "../../assets/privateMessages/loupe.png"
import axios from "axios"
import Cookies from "js-cookie"
import Conversation from "./Conversation"

export default function PrivateMessages() {
  const tokenFromCookie = Cookies.get("authToken")
  const idUser = Cookies.get("idUser")
  const headers = {
    Authorization: `Bearer ${tokenFromCookie}`
  }

  const [messagePreview, setMessagePreview] = useState([])
  const [selectedUser, setSelectUser] = useState(null)

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/messagePreview/${idUser}`, {
        headers
      })
      .then((res) => {
        setMessagePreview(res.data)
      })
      .catch((err) => {
        console.info("Erreur récuperation Messages Preview", err)
      })
  }, [])

  const handleSelectedUser = (message) => {
    setSelectUser(message)
  }

  return (
    <div className="privateMessagesBackground">
      <div className="selectConversation">
        <div className="titreSearch">
          <h2>MESSAGES</h2>
          <div className="searchConversation">
            <input type="text" placeholder="Search A Conversation" />
            <img src={LoupeLogo} alt="loupe" />
          </div>
        </div>
        <div className="displayMessages">
          {messagePreview.map((message) => (
            <div
              className="messageContent"
              key={message.date}
              onClick={() => handleSelectedUser(message)}
            >
              <div className="msgProfilPicture">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${
                    message.profil_picture
                  }`}
                  alt="profilPicture"
                />
              </div>
              <div className="msgName">
                <p>{message.username}</p>
              </div>
              <div className="msgdate">
                <p> date/h derniere màj Conversation</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="conversation">
        <Conversation
          senderId={selectedUser?.users_id_sender}
          senderName={selectedUser?.username}
          senderProfilPicture={selectedUser?.profil_picture}
        />
      </div>
    </div>
  )
}
