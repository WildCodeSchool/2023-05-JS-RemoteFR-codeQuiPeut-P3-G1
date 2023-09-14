import { useEffect, useState, useRef } from "react"
import ParametersLogo from "../../assets/privateMessages/boutonsParametres.svg"
import { io } from "socket.io-client"
import Cookies from "js-cookie"
import SendArrow from "../../../src/assets/privateMessages/send-4008.svg"
import { getCurrentTime } from "./utils"

export default function Conversation(props) {
  const { senderName, senderProfilPicture } = props
  // senderId,
  const messageHistoryRef = useRef(null)
  const [messageContent, setMessageContent] = useState(null)
  const [setTmpMessage] = useState("")
  // tmpMessage,
  const [messageHistory, setMessageHistory] = useState([])
  const [setTime] = useState(null)
  // time,
  // const idUser = Cookies.get("idUser")

  const tokenFromCookie = Cookies.get("authToken")
  const headers = {
    Authorization: `Bearer ${tokenFromCookie}`,
    "Content-Type": "application/json"
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

  console.info(headers, "headers")

  const sendMessage = () => {
    socket.emit("send_message", { message: messageContent })
    setMessageHistory([
      ...messageHistory,
      { text: messageContent, type: "send" }
    ])
    setMessageContent("")
  }

  useEffect(() => {
    if (messageHistoryRef.current) {
      messageHistoryRef.current.scrollTop =
        messageHistoryRef.current.scrollHeight
    }
    if (messageHistory) {
      setTime(getCurrentTime)
    }
  }, [messageHistory])

  useEffect(() => {
    const receiveMessageHandler = (data) => {
      setTmpMessage(data)
    }

    socket.on("receive_message", receiveMessageHandler)

    // Nettoyez l'écouteur lorsque le composant est démonté
    // return () => {
    //   socket.off("receive_message", receiveMessageHandler)
    // }
  }, [socket])

  // console.info(messageContent)

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
        {/* {JSON.stringify(tmpMessage)} */}
        {messageHistory.map((message, index) => (
          <div key={index} className="wrapMessage">
            {message.text}
            <div className="messageTime">{message.time}</div>
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
          tabIndex="enter"
          onClick={sendMessage}
        />
      </div>
    </div>
  )
}
