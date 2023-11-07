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
  const [socket, setSocket] = useState(null)

  const idUser = Cookies.get("idUser")
  const tokenFromCookie = Cookies.get("authToken")
  const headers = {
    Authorization: `Bearer ${tokenFromCookie}`
  }

  useEffect(() => {
    const newSocket = io.connect(`${import.meta.env.VITE_BACKEND_URL}`, {
      auth: {
        token: tokenFromCookie
      }
    })

    newSocket.on("connect_error", (error) => {
      console.error("Connection error:", error)
    })

    setSocket(newSocket)

    return () => newSocket.disconnect()
  }, [])

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
        console.info("Error while retreiving the messages data", err)
      })
  }, [senderId])

  const sendMessage = () => {
    const messageData = {
      from: idUser,
      to: senderId,
      content: messageContent,
      time: getCurrentTime()
    }

    socket.emit("send_message", messageData, (response) => {
      if (response.error) {
        console.error("Error saving message:", response.error)
      } else {
        setMessageHistory((prevMessages) => [...prevMessages, messageData])
      }
    })

    setMessageContent("")
  }

  // useEffect(() => {
  //   if (socket) {
  //     const receiveMessageHandler = (data) => {
  //       setMessageHistory((prevMessages) => [...prevMessages, data])
  //       console.log("ca recoit")
  //     }

  //     socket.on("receive_message", receiveMessageHandler)

  //     return () => {
  //       socket.off("receive_message", receiveMessageHandler)
  //     }
  //   }
  // }, [socket])

  useEffect(() => {
    if (messageHistoryRef.current) {
      messageHistoryRef.current.scrollTop =
        messageHistoryRef.current.scrollHeight
    }
  }, [messageHistory])

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
        {messageHistory.map((message, id) => (
          <div
            className={
              Number(message.users_id_recipient) !== Number(idUser)
                ? "wrapMessageRight"
                : "wrapMessageLeft"
            }
            key={id}
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
