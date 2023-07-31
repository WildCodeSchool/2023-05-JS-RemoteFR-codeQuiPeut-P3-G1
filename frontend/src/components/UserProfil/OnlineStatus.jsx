import { useState, useEffect } from "react"
import "./OnlineStatus.scss"

const OnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  const handleOnlineStatusChange = () => {
    setIsOnline(navigator.onLine)
  }

  useEffect(() => {
    window.addEventListener("online", handleOnlineStatusChange)
    window.addEventListener("offline", handleOnlineStatusChange)

    const handleWindowBlur = () => {
      setIsOnline(false)
    }

    const handleWindowFocus = () => {
      setIsOnline(navigator.onLine)
    }

    window.addEventListener("blur", handleWindowBlur)
    window.addEventListener("focus", handleWindowFocus)

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange)
      window.removeEventListener("offline", handleOnlineStatusChange)
      window.removeEventListener("blur", handleWindowBlur)
      window.removeEventListener("focus", handleWindowFocus)
    }
  }, [])

  return (
    <div className={isOnline ? "online-status" : "offline-status"}>
      {isOnline ? "Online" : "Offline"}
    </div>
  )
}

export default OnlineStatus
