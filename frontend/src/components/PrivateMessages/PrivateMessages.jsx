// import "./PrivateMessages.scss"
// import { useState, useEffect } from "react"
// import axios from "axios"

// export default function PrivateMessages() {
//   const [messages, setMessages] = useState([])

//   useEffect(() => {
//     axios
//       .get("http://localhost:4242/messages")
//       .then((res) => {
//         setMessages(res.data)
//       })
//       .catch((error) => {
//         console.log("Erreur lors du chagement des messages :", error)
//       })
//   }, [])

//   return <p>je suis dans private message</p>
// }
