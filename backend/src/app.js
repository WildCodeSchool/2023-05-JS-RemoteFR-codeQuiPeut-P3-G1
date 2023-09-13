// import some node modules for later

const fs = require("node:fs")
const path = require("node:path")

// create express app

const express = require("express")

const app = express()

const cors = require("cors")
// const http = require("http");

// const server = http.createServer(app)

// Socket.io
// const { Server } = require("socket.io");

// const io = new Server(server, {
//   cors: {
//     origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
//     methods: ["GET", "POST"],
//   }
// })
// // use some application-level middlewares

// io.on("connection", (socket) => {
//   socket.on("send_message", (data) => {
//     socket.broadcast.emit("receive_message", data)
//   })
// })

app.use(express.json())

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
)

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

// ready to export

module.exports = app
