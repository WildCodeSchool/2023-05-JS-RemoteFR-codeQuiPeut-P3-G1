const models = require("../models")

const browse = (req, res) => {
  models.gameRegistrationsManager
    .findAll()
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const read = (req, res) => {
  models.gameRegistrationsManager
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404)
      } else {
        res.send(rows[0])
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const futureGamesGMUsername = (req, res) => {
  models.gameRegistrationsManager
    .getGameRegistrationsWithDetails(req.params.id)
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const allPlayersForThisGame = (req, res) => {
  models.gameRegistrationsManager
    .getAllPlayersForThisGame(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404)
      } else {
        res.send(rows)
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const edit = (req, res) => {
  const gameRegistrations = req.body
  gameRegistrations.id = parseInt(req.params.id, 10)
  models.gameRegistrationsManager
    .update(gameRegistrations)
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

const joiningRequestsRejected = (req, res) => {
  models.gameRegistrationsManager
    .joiningRequestsRejected(req.params.requesterId, req.params.gameId)
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

const joiningRequestsAccepted = (req, res) => {
  models.gameRegistrationsManager
    .joiningRequestsAccepted(req.params.requesterId, req.params.gameId)
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

const add = (req, res) => {
  const gameRegistrations = req.body

  models.gameRegistrationsManager
    .insert(gameRegistrations)
    .then(([result]) => {
      res.location(`/game_registrations/${result.insertId}`).sendStatus(201)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const destroy = (req, res) => {
  models.gameRegistrationsManager
    .delete(req.params.id)
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

const deleteAllGameRegistrationsByGameId = (req, res) => {
  models.gameRegistrationsManager
    .deleteGameRegistrationsByGameId(req.params.id)
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

const joiningRequests = (req, res) => {
  models.gameRegistrationsManager
    .gameJoiningRequests(req.params.id)
    .then(([rows]) => {
      if (rows == null) {
        res.sendStatus(404)
      } else {
        res.send(rows)
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}
const validateRequests = (req, res) => {
  models.gameRegistrationsManager
    .gameValidateRequests(req.params.id)
    .then(([rows]) => {
      if (rows == null) {
        res.sendStatus(404)
      } else {
        res.send(rows)
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const pendingRequests = (req, res) => {
  models.gameRegistrationsManager
    .gamePendingRequests(req.params.id)
    .then(([rows]) => {
      if (rows == null) {
        res.sendStatus(404)
      } else {
        res.send(rows)
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const gameHistoryPlayer = (req, res) => {
  models.gameRegistrationsManager
    .gameHistoryPlayer(req.params.id)
    .then(([rows]) => {
      if (rows == null) {
        res.sendStatus(404)
      } else {
        res.send(rows)
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  deleteAllGameRegistrationsByGameId,
  futureGamesGMUsername,
  allPlayersForThisGame,
  joiningRequests,
  joiningRequestsRejected,
  joiningRequestsAccepted,
  pendingRequests,
  validateRequests,
  gameHistoryPlayer,
}
