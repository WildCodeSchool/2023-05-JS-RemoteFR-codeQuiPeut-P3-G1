import { useState, useEffect, useContext } from "react"
import axios from "axios"
import FlecheRetour from "../../assets/logo/Arrow 4.svg"
import AuthContext from "../AuthContext/AuthContext"
import Cookies from "js-cookie"

export default function PrivateMessages() {
  const [importMessages, setImportMessages] = useState([])
  const [sender, setSender] = useState("")
  const [recipient, setRecipient] = useState("")
  const [content, setContent] = useState("")
  const { user } = useContext(AuthContext)

  const tokenFromCookie = Cookies.get("authToken")

  const headers = {
    Authorization: `Bearer ${tokenFromCookie}`,
  }

  const privateMessagesDiv = document.getElementById("messageBulleDiv")

  const scrollMessages = () => {
    // privateMessagesDiv.scrollTop = privateMessagesDiv.scrollHeight
    privateMessagesDiv.scrollTo({
      Bottom: 0,
      behavior: "smooth",
    })
  }
  // Gestion messages API PrivateMessages

  const handleClickSubmit = (event) => {
    event.preventDefault()
    const messageData = {
      users_id_sender: sender,
      users_id_recipient: recipient,
      content,
      seen: 0,
    }

    axios
      .post("http://localhost:4242/PrivateMessages", messageData, { headers })
      .then((response) => {
        console.info("axiospost", response)
        axios
          .get("http://localhost:4242/PrivateMessages", { headers })
          .then((res) => {
            console.info("axiosget", res)
            setImportMessages(res.data)
          })
          .catch((error) => {
            console.error("Erreur lors du chargement des messages :", error)
          })
        scrollMessages()
      })
      .catch((err) => {
        console.error(err)
      })

    setSender("")
    setRecipient("")
    setContent("")
  }

  useEffect(() => {
    axios
      .get("http://localhost:4242/PrivateMessages", { headers })
      .then((res) => {
        console.info("axiosget", res)
        setImportMessages(res.data)
      })
      .catch((error) => {
        console.error("Erreur lors du chagement des messages :", error)
      })
  }, []) // j'ai enlevé handleClickSubmit du tableau (désormais vide) car le UseEffect se jouait sans cesse

  const handleSender = (e) => {
    setSender(e.target.value)
  }

  const handleRecipient = (e) => {
    setRecipient(e.target.value)
  }

  const handleContent = (e) => {
    setContent(e.target.value)
  }

  // useEffect(() => {
  //   console.info("user", user)
  // }, [])

  // ID du recipient du message

  //   axios.get("http://localhost:4242/PrivateMessages").then((res) => {
  //     setRecipientInfo(res.data)
  //   }).catch((error) => {
  //     console.error("Erreur lors du chagement des messages :", error)
  //   })
  // }, [recipient])

  return (
    <div className="privateMessagesBackground">
      <div className="headerMessage">
        <img
          className="backArrow"
          src={FlecheRetour}
          type="button"
          alt="backArrow"
        />
        <img
          className="profilPictureMessages"
          src="https://this-person-does-not-exist.com/img/avatar-gen11178be98f2b2c21b16328dba21251b1.jpg"
        />
        <div className="messageReceiverName">
          <h2>{user.username}</h2>
          <h3>GAMEMASTER</h3>
        </div>
      </div>
      <div className="messageBulle" id="messageBulleDiv">
        {importMessages.map((message) => (
          <div
            id={
              message.users_id_sender === message.users_id_recipient
                ? "contentConnected"
                : "contentDisconnected"
            }
            key={message.id}
          >
            <div className="divBulles">
              <ul>
                {/* <li>{message.users_id_sender}</li>
                <li>{message.users_id_recipient}</li> */}
                <p>{message.content}</p>
                {/* <li>{message.date}</li>
                <li>{message.seen}</li> */}
              </ul>
            </div>
            <img src="https://this-person-does-not-exist.com/img/avatar-gen11178be98f2b2c21b16328dba21251b1.jpg" />
          </div>
        ))}
      </div>
      <div className="inputMessages">
        <div className="toDelete">
          <input
            className="sender"
            type="text"
            value={sender}
            placeholder="Sender"
            onChange={handleSender}
          />
          <input
            className="recipient"
            type="text"
            value={recipient}
            placeholder="Recipient"
            onChange={handleRecipient}
          />
        </div>
        <input
          className="contenu"
          type="text"
          value={content}
          placeholder="Envoyer un message"
          onChange={handleContent}
        />
        <svg
          className="validateButton"
          type="button"
          id="sendMessageButton"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleClickSubmit}
        >
          <path
            d="M729.173333 469.333333L157.845333 226.496 243.52 469.333333h485.674667z m0 85.333334H243.541333L157.824 797.504 729.173333 554.666667zM45.12 163.541333c-12.352-34.986667 22.762667-67.989333 56.917333-53.482666l853.333334 362.666666c34.645333 14.72 34.645333 63.829333 0 78.549334l-853.333334 362.666666c-34.133333 14.506667-69.269333-18.474667-56.917333-53.482666L168.085333 512 45.098667 163.541333z"
            fill=""
          ></path>
        </svg>
      </div>
    </div>
  )
}
