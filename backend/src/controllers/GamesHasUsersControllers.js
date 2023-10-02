const models = require("../models")

const browse = (req, res) => {
  models.gamesHasUsersManager
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

const getUsersHistory = (req, res) => {
  models.gamesHasUsersManager
    .getUsersHistory(req.params.id)
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const getPlayersByGameId = (req, res) => {
  models.gamesHasUsersManager
    .allPlayersByGameId(req.params.id)
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const deleteAllGamesHasUsersByGameId = (req, res) => {
  models.gamesHasUsersManager
    .deleteGamesHasUsersByGameId(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404)
      } else {
        res.sendStatus(204)
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

module.exports = {
  browse,
  add,
  getUsersHistory,
  getPlayersByGameId,
  deleteAllGamesHasUsersByGameId,
}
