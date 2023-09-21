const models = require("../models")

const browse = (req, res) => {
  models.games
    .findAll()
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const browsewithrpgname = (req, res) => {
  models.games
    .getGamesWithRpgName()
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const browsewithrpgnamebyID = (req, res) => {
  models.games
    .getGamesWithRpgNameByUserID(req.params.id)
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const read = (req, res) => {
  models.games
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

const edit = (req, res) => {
  const games = req.body

  // TODO validations (length, format...)

  games.id = parseInt(req.params.id, 10)

  models.games
    .update(games)
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
  const games = req.body

  models.games
    .insert(games)
    .then(([result]) => {
      res.location(`/games/${result.insertId}`).sendStatus(201)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const destroy = (req, res) => {
  models.games
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

const upcommingGameGM = (req, res) => {
  models.games
    .upcommingGameGM(req.params.id)
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
const historyGameGM = (req, res) => {
  models.games
    .historyGameGM(req.params.id)
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

const selectGamesByGameMasterUsername = (req, res) => {
  models.games
    .getGamesByGameMasterUsername(req.params.username)
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const selectGamesByGameMasterId = (req, res) => {
  models.games
    .getNextGamesByGamemasterId(req.params.id)
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

module.exports = {
  browse,
  browsewithrpgname,
  read,
  edit,
  add,
  destroy,
  upcommingGameGM,
  historyGameGM,
  selectGamesByGameMasterUsername,
  selectGamesByGameMasterId,
  browsewithrpgnamebyID,
}
