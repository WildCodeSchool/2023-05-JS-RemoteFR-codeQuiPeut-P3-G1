const models = require("../models")

const browse = (req, res) => {
  models.GameRegistrationsAsPlayer.findAll()
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const AllInvitationsOfGm = (req, res) => {
  models.GameRegistrationsAsPlayer.getAllInvitationsOfGm(req.params.id)
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const add = (req, res) => {
  models.GameRegistrationsAsPlayer.insert(req.body)
    .then(() => {
      res.status(201).send("Invitation sent with success !")
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const joiningRequestsRejectedNotification = (req, res) => {
  models.GameRegistrationsAsPlayer.joiningRequestsRejectedNotification(
    req.params.playerId,
    req.params.gameId
  )
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

const joiningRequestsAcceptedNotification = (req, res) => {
  models.GameRegistrationsAsPlayer.joiningRequestsAcceptedNotification(
    req.params.playerId,
    req.params.gameId
  )
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
  add,
  browse,
  AllInvitationsOfGm,
  joiningRequestsRejectedNotification,
  joiningRequestsAcceptedNotification,
}
