require("dotenv").config()

const { server } = require("./src/app")

const port = parseInt(process.env.APP_PORT ?? "4242", 10)

server.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened")
  } else {
    // eslint-disable-next-line no-restricted-syntax
    console.log(`Server is listening on ${port}`)
  }
})
