import "./Topics.scss"
import React, { useState, useEffect } from "react"
import axios from "axios"
import NewTopic from "../components/NewTopic/NewTopic"

export default function Topics() {
  const [topics, setTopics] = useState([])
  useEffect(() => {
    axios
      .post("http://localhost:4242/topics")
      .then((res) => setTopics(res.data))
    console.info(topics)
  }, [])

  return (
    <div>
      {" "}
      {topics.map((topic) => (
        <div key={topic.id}>
          <ul>
            <li>{topic.title}</li>
            <li>{topic.categories_id}</li>
            <li>{topic.users_id}</li>
            <li>{topic.creation_date}</li>
            <li>{topic.subscription_count}</li>
          </ul>
        </div>
      ))}
      <NewTopic />
    </div>
  )
}
