const models = require("../models")

const browse = (req, res) => {
  models.gamesHasUsers
    .findAll()
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}
const add = (req, res) => {
  models.gamesHasUsersManager
    .insert(req.params.requesterId, req.params.gameId)
    .then(() => {
      res.status(201).send("Successfully inserted")
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}
module.exports = {
  browse,
  add,
}
