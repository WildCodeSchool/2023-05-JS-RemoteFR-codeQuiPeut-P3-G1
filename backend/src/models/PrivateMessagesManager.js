const AbstractManager = require("./AbstractManager")

class PrivateMessagesManager extends AbstractManager {
  constructor() {
    super({ table: "private_messages" })
  }

  insert(privateMessages) {
    return this.database.query(
      `INSERT INTO ${this.table} (users_id_sender, users_id_recipient, content, date, seen) VALUES (?, ?, ?, NOW(), 0)`,
      [privateMessages.from, privateMessages.to, privateMessages.content]
    )
  }

  update(privateMessages) {
    return this.database.query(
      `update ${this.table} set content = ?, users_id_sender = ?, users_id_recipient = ? WHERE id = ?`,
      [
        privateMessages.content,
        privateMessages.users_id_sender,
        privateMessages.users_id_recipient,
      ]
    )
  }

  getMessagesPreview(id) {
    return this.database.query(
      `SELECT DISTINCT u.profil_picture, u.username, pm.users_id_sender
      FROM ${this.table} AS pm
      JOIN users u ON pm.users_id_sender = u.id
      WHERE pm.users_id_recipient = ?`,
      [id]
    )
  }

  getMessagesFromUsers(userConnectedId, senderId) {
    return this.database.query(
      `SELECT * FROM ${this.table} 
      WHERE users_id_recipient = ? AND users_id_sender = ? OR users_id_sender = ? AND users_id_recipient = ?
      ORDER BY date ASC`,
      [userConnectedId, senderId, userConnectedId, senderId]
    )
  }
}

module.exports = PrivateMessagesManager
