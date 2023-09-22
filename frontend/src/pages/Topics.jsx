import React, { useState, useEffect } from "react"
import axios from "axios"
import NewTopic from "../components/NewTopic/NewTopic"
import Cookies from "js-cookie"
import PostCards from "../components/Topics/PostCards"

export default function Topics() {
  const tokenFromCookie = Cookies.get("authToken")
  const [topics, setTopics] = useState([])
  const [isNewTopicOpen, setIsNewTopicOpen] = useState(false)
  const [usernameFilter, setUsernameFilter] = useState("")
  const [sujetFilter, setSujetFilter] = useState("")
  const [dateFilter, setDateFilter] = useState("all")
  const [postData, setPostData] = useState(null)
  const [isPostCardsOpen, setIsPostCardsOpen] = useState(false)
  const [shouldRefreshTable, setShouldRefreshTable] = useState(false)
  const [isBoxTopicsVisible, setIsBoxTopicsVisible] = useState(true)

  const headers = {
    Authorization: `Bearer ${tokenFromCookie}`
  }

  const fetchTopics = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/topicsAndUsers`, { headers })
      .then((res) => setTopics(res.data))
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des sujets.",

          error
        )
      })
  }

  useEffect(() => {
    fetchTopics()
  }, [])

  useEffect(() => {
    if (shouldRefreshTable) {
      fetchTopics()

      setShouldRefreshTable(false)
    }
  }, [shouldRefreshTable])

  const openNewTopicModal = (value) => {
    setIsNewTopicOpen(value)
  }

  const closeNewTopicModal = () => {
    setIsNewTopicOpen(false)
  }

  const handleUsernameFilterChange = (event) => {
    setUsernameFilter(event.target.value)
  }

  const handleSujetFilterChange = (event) => {
    setSujetFilter(event.target.value)
  }

  const handleDateFilterChange = (event) => {
    setDateFilter(event.target.value)
  }

  const formatDateDistance = (dateString) => {
    const currentDate = new Date()
    const targetDate = new Date(dateString)
    const difference = currentDate - targetDate
    const daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24))

    let result = ""

    if (daysDifference === 0) {
      result = "aujourd'hui"
    } else if (daysDifference === 1) {
      result = "hier"
    } else {
      result = `il y a ${daysDifference} jours`
    }

    return result
  }
  console.info("topics", topics)
  const handlePostClick = (allPostData) => {
    setIsPostCardsOpen(true)

    setPostData(allPostData)

    setIsBoxTopicsVisible(false) // Masquer la section principale
  }

  const updateShouldRefreshTable = (value) => {
    setShouldRefreshTable(value)
  }

  return (
    <>
      <div className="containeurTopicsAll">
        {/* <div className="titleTopics">
          <h1>Topics</h1>
        </div> */}
        <div className="globalDivTopics">
          {isBoxTopicsVisible && (
            <div className="divTopicsAndFilter">
              <div className="divTopics">
                <h2 className="titleFilterTopic"> Recherches </h2>
                <div className="boxFilterTopics">
                  <input
                    className="writingWindow"
                    type="text"
                    placeholder="Filtrer par nom d'utilisateur"
                    value={usernameFilter}
                    onChange={handleUsernameFilterChange}
                  />
                  <input
                    className="writingWindow"
                    type="text"
                    placeholder="Filtrer par mot clé"
                    value={sujetFilter}
                    onChange={handleSujetFilterChange}
                  />
                  <select
                    className="writingWindow"
                    value={dateFilter}
                    onChange={handleDateFilterChange}
                  >
                    <option value="all">Toutes les dates</option>
                    <option value="lastWeek">Il y a moins d'une semaine</option>
                    <option value="lastMonth">Il y a plus d'un mois</option>
                  </select>
                  <div className="boxNewTopics">
                    <button onClick={openNewTopicModal}>Nouveau Topic</button>
                  </div>
                </div>
              </div>
              <div className="BoxTopicsAndNewTopics">
                <div>
                  <h2 className="titleBoxTopics"> Recent post</h2>
                </div>
                {!isPostCardsOpen && (
                  <div className="globalTopicsBox">
                    {topics

                      .filter((topic) =>
                        topic.username
                          .toLowerCase()
                          .includes(usernameFilter.toLowerCase())
                      )

                      .filter((topic) =>
                        topic.title
                          .toLowerCase()
                          .includes(sujetFilter.toLowerCase())
                      )

                      .filter((topic) => {
                        if (dateFilter === "lastWeek") {
                          const targetDate = new Date(topic.date)
                          const currentDate = new Date()
                          const oneWeekAgo = new Date(
                            currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
                          )

                          return targetDate > oneWeekAgo
                        } else if (dateFilter === "lastMonth") {
                          const targetDate = new Date(topic.date)
                          const currentDate = new Date()
                          const oneMonthAgo = new Date(
                            currentDate.getFullYear(),
                            currentDate.getMonth() - 1,
                            currentDate.getDate()
                          )

                          return targetDate > oneMonthAgo
                        } else {
                          return true
                        }
                      })

                      .map((topic) => (
                        <div key={topic.id}>
                          <div className="topicboxId">
                            <div className="headerCardTopic">
                              <div className="photoAndName">
                                <img
                                  src={`${import.meta.env.VITE_BACKEND_URL}/${
                                    topic.profil_picture
                                  }`}
                                  alt="photo de profil de l'utilisateur"
                                  className="photoUserTopic"
                                />
                                <div>{topic.username}</div>
                              </div>
                              <div className="dateTopics">
                                {formatDateDistance(topic.date)}
                              </div>
                            </div>
                            <h3>Sujet :</h3>
                            <div className="topicTitleInCard">
                              {topic.title}
                            </div>
                            <div>{topic.categories_id}</div>
                            <h3>Message:</h3>
                            <div className="firstContentInCard">
                              <p>{topic.first_content}</p>
                            </div>
                            <div className="buttonInCard">
                              <button onClick={() => handlePostClick(topic)}>
                                reply to the guilder
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}
          {isNewTopicOpen && (
            <div className="modal">
              <div className="modal-content">
                <NewTopic
                  onClose={closeNewTopicModal}
                  updateShouldRefreshTable={updateShouldRefreshTable}
                />
              </div>
            </div>
          )}
          {isPostCardsOpen && (
            <PostCards
              isOpen={isPostCardsOpen}
              onClose={() => {
                setIsPostCardsOpen(false)

                setIsBoxTopicsVisible(true)
              }}
              postData={postData}
              headers={headers}
            />
          )}
        </div>
      </div>
    </>
  )
}
