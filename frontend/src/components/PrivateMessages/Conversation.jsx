import { useState } from "react"
import ParametersLogo from "../../assets/privateMessages/boutonsParametres.svg"
// import io from "socket.io-client"
// import Cookies from "js-cookie"
import SendArrow from "../../../src/assets/privateMessages/send-4008.svg"

// const socket = io.connect(import.meta.env.VITE_BACKEND_URL, {
//   extraHeaders: {
//     Authorization: `Bearer ${tokenFromCookie}`
//   }
// })

export default function Conversation(props) {
  const { senderName, senderProfilPicture } = props
  // senderId,

  const [messageContent, setMessageContent] = useState(null)

  // const tokenFromCookie = Cookies.get("authToken")
  // const idUser = Cookies.get("idUser")
  // const headers = {
  //   Authorization: `Bearer ${tokenFromCookie}`
  // }

  // const sendMessage = () => {
  //   socket.emit("send_message", { message: "Hello" })
  // }

  // useEffect(() => {
  //   socket.on("receive_message", (data) => {
  //     alert(data.message)
  //   })
  // }, [socket])

  console.info(messageContent)

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
      <div className="convContents"></div>
      <div className="convInput">
        <input
          type="text"
          placeholder="Message"
          onChange={(e) => setMessageContent(e.target.value)}
        />
        <img src={SendArrow} alt="sending arrow" id="sendingArrow" />
      </div>
    </div>
  )
}
