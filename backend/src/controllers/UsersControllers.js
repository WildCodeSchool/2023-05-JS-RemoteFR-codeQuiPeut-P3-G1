const models = require("../models")
const fs = require("fs")

const browse = (req, res) => {
  models.users
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
  models.users
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
  const users = req.body

  // TODO validations (length, format...)

  users.id = parseInt(req.params.id, 10)

  models.users
    .update(users)
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
  const users = req.body

  // TODO validations (length, format...)

  models.users
    .insert(users)
    .then(([result]) => {
      res.location(`/users/${result.insertId}`).sendStatus(201)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const destroy = (req, res) => {
  models.users
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

const uploadProfilPicture = (req, res) => {
  const users = req.body

  console.info(req.file)
  console.info(req.body)

  // TODO validations (length, format...)

  users.id = parseInt(req.params.id, 10)

  models.users
    .updateProfilPicture(
      users,
      `assets/images/profilPictures/${req.file.originalname}`
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404)
      } else {
        // Déplacez la photo après avoir effectué l'opération de mise à jour
        fs.rename(
          req.file.path,
          `public/assets/images/profilPictures/${req.file.originalname}`,
          (err) => {
            if (err) {
              console.error(err)
              res.status(500).send("Error while moving the uploaded file")
            } else {
              res.sendStatus(204)
            }
          }
        )
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
  uploadProfilPicture,
}
