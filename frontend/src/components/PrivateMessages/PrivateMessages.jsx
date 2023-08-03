import "./PrivateMessages.scss"
import { useState, useEffect } from "react"
import axios from "axios"

export default function PrivateMessages() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:4242/messages")
      .then((res) => {
        setMessages(res.data)
      })
      .catch((error) => {
        console.error("Erreur lors du chagement des messages :", error)
      })
  }, [])

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>
          <ul>
            <li>{message.users_id_sender}</li>
            <li>{message.users_id_recipient}</li>
            <li>{message.content}</li>
            <li>{message.date}</li>
            <li>{message.read}</li>
          </ul>
        </div>
      ))}
    </div>
  )
}
