const models = require("../models")

const browse = (req, res) => {
  models.private_messages
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
  models.private_messages
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
  const privateMessages = req.body

  // TODO validations (length, format...)

  privateMessages.id = parseInt(req.params.id, 10)

  models.private_messages
    .update(privateMessages)
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
  const privateMessages = req.body

  models.private_messages
    .insert(privateMessages)
    .then(([result]) => {
      res.location(`/private_messages/${result.insertId}`).sendStatus(201)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const insertPrivateMessage = (messageData) => {
  return new Promise((resolve, reject) => {
    models.private_messages
      .insert(messageData)
      .then(([result]) => {
        resolve(result.insertId)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const destroy = (req, res) => {
  models.private_messages
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

const messagesPreview = (req, res) => {
  // console.log("pouelt oooooooerzioerj");
  models.private_messages
    .getMessagesPreview(req.params.idReceiver)
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const getMessagesFromUsers = (req, res) => {
  models.private_messages
    .getMessagesFromUsers(req.params.userConnectedId, req.params.senderId)
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const deleteConversation = (req, res) => {
  const userId = req.body.idUser
  const receiverId = req.body.receiver

  models.private_messages
    .deleteConversation(userId, receiverId)
    .then(() => {
      res.sendStatus(200)
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
  messagesPreview,
  getMessagesFromUsers,
  insertPrivateMessage,
  deleteConversation,
}
