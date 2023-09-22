const models = require("../models")

const browse = (req, res) => {
  models.posts

    .findAll()

    .then(([rows]) => {
      res.send(rows)
    })

    .catch((err) => {
      console.error(err)

      res.sendStatus(500)
    })
}

const getPostsByTopicsId = (req, res) => {
  models.posts

    .getPostsById(req.params.id)

    .then(([rows]) => {
      res.send(rows)
    })

    .catch((err) => {
      console.error(err)

      res.sendStatus(500)
    })
}

const read = (req, res) => {
  models.posts

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
  const posts = req.body // TODO validations (length, format...)

  posts.id = parseInt(req.params.id, 10)

  models.posts

    .update(posts)

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
  const posts = req.body // TODO validations (length, format...)

  models.posts

    .insert(posts)

    .then(([result]) => {
      res.location(`/topics/${result.insertId}`).sendStatus(201)
    })

    .catch((err) => {
      console.error(err)

      res.sendStatus(500)
    })
}

const destroy = (req, res) => {
  models.posts

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

module.exports = {
  browse,

  read,

  edit,

  add,

  destroy,

  getPostsByTopicsId,
}
