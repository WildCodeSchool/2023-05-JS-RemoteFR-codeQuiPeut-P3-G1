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
    // Executes a SQL query to select user information (profile picture, username, and user ID)
    // for users involved in message exchanges with the specified user ID.

    return this.database.query(
      `SELECT u.profil_picture, u.username, u.id AS user_id
       FROM (
         SELECT DISTINCT users_id_sender AS user_id
         FROM ${this.table}
         WHERE users_id_recipient = ?
         UNION
         SELECT DISTINCT users_id_recipient
         FROM ${this.table}
         WHERE users_id_sender = ?
       ) AS distinctUsers
       JOIN users u ON distinctUsers.user_id = u.id`,
      [id, id]
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
