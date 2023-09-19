import { useState } from "react"

function FAQ() {
  const faqs = [
    {
      title: "Is there a minimum age to register ?",
      content: <p>Réponse à la question 1</p>
    },
    {
      title: "Is GUILD free to access ?",
      content: <p>Réponse à la question 2</p>
    },
    {
      title: "Can write feedback and rating after session ?",
      content: <p>Réponse à la question 3</p>
    },
    {
      title: "Can I create a table to play with my friends",
      content: (
        <p>
          YES ! Every registered member can create a table with his own rules,
          share the link to his friends and play with them as GM or Player.
        </p>
      )
    }
  ]

  const [expandedIndex, setExpandedIndex] = useState(-1)

  const toggleExpand = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index))
  }

  return (
    <div className="container-FAQ">
      <div className="title-FAQ">
        <span>FAQ</span>
      </div>
      <div className="line-FAQ"></div>
      <div className="card-Container">
        <div>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`card-FAQ ${
                expandedIndex === index ? "expanded" : ""
              }`}
              onClick={() => toggleExpand(index)}
            >
              <div className="card-header">
                <div className="h2-card-header">
                  <h2>{faq.title}</h2>
                </div>
                <div className="svg-card-header">
                  <svg
                    className={
                      expandedIndex === index ? "rotate-180" : "default-rotate"
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    width="39"
                    height="18"
                    viewBox="0 0 39 18"
                    fill="none"
                  >
                    <path
                      d="M0 2.06557L4.90566 0L19.3774 10.623L34.8302 0L39 2.06557L28.4528 10.623L19.3774 18L11.0377 10.623L0 2.06557Z"
                      fill="#E2D07C"
                    />
                  </svg>
                </div>
              </div>
              {expandedIndex === index && (
                <div
                  className={`card-content ${
                    expandedIndex === index ? "expanded" : ""
                  }`}
                >
                  {faq.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FAQ
