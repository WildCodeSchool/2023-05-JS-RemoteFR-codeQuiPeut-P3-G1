import { useEffect, useState } from "react"
import LoupeLogo from "../../assets/privateMessages/loupe.png"
import axios from "axios"
import Cookies from "js-cookie"
import Conversation from "./Conversation"
import NewConversationPopup from "./NewConversation"

export default function PrivateMessages() {
  const tokenFromCookie = Cookies.get("authToken")
  const idUser = Cookies.get("idUser")
  const headers = {
    Authorization: `Bearer ${tokenFromCookie}`
  }

  const [messagePreview, setMessagePreview] = useState([])
  const [selectedUser, setSelectUser] = useState(null)
  const [searchUser, setSearchUser] = useState("")
  const [isPopupVisible, setPopupVisibility] = useState(false)

  const showPopup = () => {
    setPopupVisibility(true)
  }

  const closePopup = () => {
    setPopupVisibility(false)
  }

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
            <input
              type="text"
              placeholder="Search A Conversation"
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
            />
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
                <p>date/h dernière màj Conversation</p>
              </div>
            </div>
          ))}
          <div className="newConversation" onClick={showPopup}>
            <div className="svgContainerConv">
              <svg
                width="36"
                height="35"
                viewBox="0 0 36 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 0C8.05645 0 0 7.70612 0 17.2173C0 26.7284 8.05645 34.4346 18 34.4346C27.9435 34.4346 36 26.7284 36 17.2173C36 7.70612 27.9435 0 18 0ZM28.4516 19.1612C28.4516 19.6194 28.0597 19.9943 27.5806 19.9943H20.9032V26.3813C20.9032 26.8395 20.5113 27.2144 20.0323 27.2144H15.9677C15.4887 27.2144 15.0968 26.8395 15.0968 26.3813V19.9943H8.41935C7.94032 19.9943 7.54839 19.6194 7.54839 19.1612V15.2734C7.54839 14.8152 7.94032 14.4403 8.41935 14.4403H15.0968V8.05324C15.0968 7.59504 15.4887 7.22015 15.9677 7.22015H20.0323C20.5113 7.22015 20.9032 7.59504 20.9032 8.05324V14.4403H27.5806C28.0597 14.4403 28.4516 14.8152 28.4516 15.2734V19.1612Z"
                  fill="#A4945E"
                />
              </svg>
            </div>
            <p>New Conversation</p>
          </div>
        </div>
      </div>
      <div className="conversation">
        <Conversation
          senderId={selectedUser?.user_id}
          senderName={selectedUser?.username}
          senderProfilPicture={selectedUser?.profil_picture}
        />
      </div>
      <div className="popupConv"></div>
      {isPopupVisible && <NewConversationPopup onClose={closePopup} />}
    </div>
  )
}
