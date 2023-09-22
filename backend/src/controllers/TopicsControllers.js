const models = require("../models")

const browse = (req, res) => {
  models.topics
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
  models.topics
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
  const topics = req.body // TODO validations (length, format...)
  topics.id = parseInt(req.params.id, 10)
  models.topics
    .update(topics)
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
  const infos = req.body // TODO validations (length, format...)

  models.topics
    .insert(infos)
    .then(([result]) => {
      infos.topics_id = result.insertId
      models.posts
        .insert(infos)
        .then(([result]) => {
          res.location(`/topics/${result.insertId}`).sendStatus(201)
        })
        .catch((err) => {
          console.error(err)
          res.sendStatus(500)
        })
    })

    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const destroy = (req, res) => {
  models.topics

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

const topicsAndUsers = (req, res) => {
  models.topics

    .getTopicsAndUsers()
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
  read,
  edit,
  add,
  destroy,
  topicsAndUsers,
}
