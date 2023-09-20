import { useEffect, useState, useRef } from "react"
import ParametersLogo from "../../assets/privateMessages/boutonsParametres.svg"
import { io } from "socket.io-client"
import Cookies from "js-cookie"
import SendArrow from "../../../src/assets/privateMessages/send-4008.svg"
import { getCurrentTime } from "./utils"
import axios from "axios"
import moment from "moment"

export default function Conversation(props) {
  const { senderId, senderName, senderProfilPicture } = props

  const messageHistoryRef = useRef(null)
  const [messageContent, setMessageContent] = useState("")
  const [messageHistory, setMessageHistory] = useState([])
  const [animateSend, setAnimateSend] = useState(false)

  const idUser = Cookies.get("idUser")
  const tokenFromCookie = Cookies.get("authToken")
  const headers = {
    Authorization: `Bearer ${tokenFromCookie}`
  }

  const socket = io.connect("http://localhost:4242", {
    transportOptions: {
      polling: {
        extraHeaders: {
          Authorization: `Bearer ${tokenFromCookie}`
        }
      }
    }
  })

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/getMessagesFromUsers/${idUser}/${senderId}`,
        { headers }
      )
      .then((res) => {
        setMessageHistory(res.data)
        console.info(res.data)
      })
      .catch((err) => {
        console.info("ca marche pas", err)
      })
  }, [senderId])

  const sendMessage = () => {
    const messageData = {
      from: idUser,
      to: senderId,
      content: messageContent,
      time: getCurrentTime()
    }

    socket.emit("send_message", messageData)

    setMessageHistory((prevMessages) => [...prevMessages, messageData])
    setMessageContent("") // Réinitialise le contenu de l'input

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/PrivateMessages`,
        messageData,
        { headers }
      )
      .catch((err) => {
        console.info("Erreur Post dans Private Messages", err)
      })
  }

  useEffect(() => {
    if (messageHistoryRef.current) {
      messageHistoryRef.current.scrollTop =
        messageHistoryRef.current.scrollHeight
    }

    const receiveMessageHandler = (data) => {
      setMessageHistory((prevMessages) => [...prevMessages, data])
    }

    socket.on("receive_message", receiveMessageHandler)

    // Nettoyez l'écouteur lorsque le composant est démonté
    return () => {
      socket.off("receive_message", receiveMessageHandler)
    }
  }, [messageHistory, socket])

  return (
    <div className="divConversation">
      <div className="conversationHeader">
        <div className="convReceiverInfos">
          <div className="convReceiverPicture">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${senderProfilPicture}`}
              alt="receiver_profil_picture"
            />
          </div>
          <p>{senderName}</p>
        </div>
        <div className="convParameters">
          <img src={ParametersLogo} alt="Parameters" />
        </div>
      </div>
      <div className="convContents" ref={messageHistoryRef}>
        {messageHistory.map((message) => (
          <div
            className={
              message.users_id_recipient !== idUser
                ? "wrapMessageRight"
                : "wrapMessageLeft"
            }
            key={message.date}
          >
            <div className="msgBackground">
              <p>{message.content}</p>
            </div>
            <div className="messageTime">
              {moment(message.date).format("HH:mm")}
            </div>
          </div>
        ))}
      </div>
      <div className="convInput">
        <input
          type="text"
          value={messageContent}
          placeholder="Message"
          onChange={(e) => setMessageContent(e.target.value)}
        />
        <img
          src={SendArrow}
          alt="sending arrow"
          id="sendingArrow"
          className={animateSend ? "animate" : ""}
          tabIndex="enter"
          onClick={() => {
            setAnimateSend(true)
            sendMessage()
          }}
          onAnimationEnd={() => setAnimateSend(false)}
        />
      </div>
    </div>
  )
}
