import "./PrivateMessages.scss"
import { useState, useEffect } from "react"
import axios from "axios"

export default function PrivateMessages() {
  const [importMessages, setImportMessages] = useState([])
  const [sender, setSender] = useState("")
  const [recipient, setRecipient] = useState("")
  const [content, setContent] = useState("")

  useEffect(() => {
    axios
      .get("http://localhost:4242/PrivateMessages")
      .then((res) => {
        setImportMessages(res.data)
      })
      .catch((error) => {
        console.error("Erreur lors du chagement des messages :", error)
      })
  }, [])

  const handleClickSubmit = () => {
    const messageData = {
      users_id_sender: sender,
      users_id_recipient: recipient,
      content,
      seen: 0,
    }

    axios
      .post("http://localhost:4242/PrivateMessages", messageData)
      .then((response) => {
        console.info(response)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const handleSender = (e) => {
    setSender(e.target.value)
  }

  const handleRecipient = (e) => {
    setRecipient(e.target.value)
  }

  const handleContent = (e) => {
    setContent(e.target.value)
  }

  return (
    <div>
      <div>
        <input
          type="text"
          value={sender}
          placeholder="Sender"
          onChange={handleSender}
        />
        <input
          type="text"
          value={recipient}
          placeholder="Recipient"
          onChange={handleRecipient}
        />
        <input
          type="text"
          value={content}
          placeholder="Contenu"
          onChange={handleContent}
        />
        <input
          type="button"
          placeholder="Valider"
          onClick={handleClickSubmit}
        />
      </div>
      <div>
        {importMessages.map((message) => (
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
    </div>
  )
}
