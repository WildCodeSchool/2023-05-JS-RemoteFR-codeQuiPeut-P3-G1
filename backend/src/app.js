// import some node modules for later

const fs = require("node:fs")
const path = require("node:path")

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
  console.info("Client connected")
  const token = socket.handshake.headers.authorization
  console.info("===============================", token)

  // if (!isValidToken(token)) {
  //   console.info("Invalid token, disconnecting client")
  //   socket.disconnect();
  // }

  socket.on("send_message", (data) => {
    console.info("************** poulet ***********", data)
    socket.broadcast.emit("receive_message", data)
  })
})

// server.listen(4221, () => console.log("je suis un poulet");)
// import and mount the API routes

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
