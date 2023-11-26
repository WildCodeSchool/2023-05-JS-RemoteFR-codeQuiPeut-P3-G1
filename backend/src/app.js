// import some node modules for later

const fs = require("node:fs")
const path = require("node:path")
const messageController = require("./controllers/PrivateMessagesControllers")
const { isValidMessageData } = require("./validators")

const jwt = require("jsonwebtoken")

// create express app

const express = require("express")

const app = express()

const cors = require("cors")
const http = require("http")

const server = http.createServer(app)

app.use(express.json())

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
)
// Socket.io

const { Server } = require("socket.io")

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-type", "Authorization"],
    credentials: true,
  },
})
// use some application-level middlewares

io.on("connection", (socket) => {
  try {
    const token = socket.handshake.auth.token

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    socket.user = decodedToken

    console.info("Client connected with valid token from App")
    socket.on("send_message", (messageData, callback) => {
      if (!isValidMessageData(messageData)) {
        callback({ status: "Error", error: "Invalid message data" })
        return
      }

      messageController
        .insertPrivateMessage(messageData)
        .then((savedMessageId) => {
          const savedMessage = {
            ...messageData,
            id: savedMessageId,
          }

          io.to(messageData.to).emit("message_saved", savedMessage)
          callback({ status: "Success", savedMessage })
        })
        .catch((err) => {
          console.info("Error saving message", err)
          callback({ status: "Error", error: err.message })
        })
    })
  } catch (err) {
    console.info("Auth error", err)
    callback({ status: "Error", error: err.message })
    socket.disconnect()
  }
})

const router = require("./router")

app.use(router)

// serve the `backend/public` folder for public resources

app.use(express.static(path.join(__dirname, "../public")))

// serve REACT APP

const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html"
)

if (fs.existsSync(reactIndexFile)) {
  // serve REACT resources

  app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")))

  // redirect all requests to the REACT index file

  app.get("*", (req, res) => {
    console.info(req.path)
    if (req.path.includes("public")) {
      res.sendFile(path.join(__dirname, "..", "..", req.path))
    } else {
      res.sendFile(reactIndexFile)
    }
  })
}

module.exports = { app, server }
