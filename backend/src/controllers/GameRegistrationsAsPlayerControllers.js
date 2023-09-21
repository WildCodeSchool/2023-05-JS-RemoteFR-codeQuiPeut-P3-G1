const models = require("../models")

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
  AllInvitationsOfGm,
  joiningRequestsRejectedNotification,
  joiningRequestsAcceptedNotification,
}
