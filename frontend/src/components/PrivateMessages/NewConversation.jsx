import axios from "axios"
import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import moment from "moment"

import Cross from "../../assets/icon-dashboard/crossWithBg.svg"

export default function NewConversation({
  onClose,
  onNewMessageSent,
  usersWithConv
}) {
  const tokenFromCookie = Cookies.get("authToken")
  const idUser = Cookies.get("idUser")
  const headers = {
    Authorization: `Bearer ${tokenFromCookie}`
  }

  //   const [userNewMsg, setUserNewMsg] = useState(null)
  const [newMsgContent, setNewMesgContent] = useState("")
  const [inputUser, setInputUser] = useState("")
  const [inputUserId, setInputUserId] = useState("")
  const [existingUsers, setExistingUsers] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)

  const submitNewConv = () => {
    if (inputUser === idUser) {
      return
    }

    if (typeof newMsgContent != "string" && content.trim().length === 0) {
      return
    }

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/PrivateMessages`,
        {
          from: idUser,
          to: inputUserId,
          content: newMsgContent,
          time: moment().format("YYYY-MM-DD HH:mm:ss")
        },
        { headers }
      )
      .then(() => {
        onClose()
        onNewMessageSent()
      })
      .catch((err) => {
        console.info("Error while posting new conv", err)
      })
  }

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users`, { headers })
      .then((res) => {
        setExistingUsers(res.data)
      })
      .catch((err) => {
        console.info("Cannot get existing users", err)
      })
  }, [])

  useEffect(() => {
    if (inputUser.length >= 3) {
      setShowDropdown(true)
    } else {
      setShowDropdown(false)
    }
  }, [inputUser])

  const filteredUsers = existingUsers.filter(
    (user) =>
      user.username.includes(inputUser) &&
      !usersWithConv.some((conv) => conv.username === user.username)
  )

  return (
    <div className="newConvBackground">
      <div className="newConvContainer">
        <div id="closingButton">
          <button id="closeNewConv" onClick={onClose}>
            <img src={Cross} alt="" />
          </button>
        </div>
        <h2>
          Are you searching <br></br>for someone ?
        </h2>
        <div className="newConvUser">
          <input
            type="text"
            value={inputUser}
            id="search"
            placeholder="Search for a player"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck="false"
            onChange={(e) => setInputUser(e.target.value)}
          />
          {showDropdown && (
            <ul className="dropdownMenu">
              {filteredUsers.map((user) => (
                <li
                  key={user.id}
                  onClick={() => {
                    setInputUser(user.username)
                    setInputUserId(user.id)
                    setShowDropdown(false)
                  }}
                >
                  {user.username}
                </li>
              ))}
              <li id="endUsersList">No users</li>
            </ul>
          )}
        </div>
        <textarea
          type="text"
          id="message"
          value={newMsgContent}
          placeholder="Your message"
          onChange={(e) => setNewMesgContent(e.target.value)}
        />
        <button onClick={submitNewConv} id="buttonNewConv">
          Let's talk !
        </button>
      </div>
    </div>
  )
}
