const AbstractManager = require("./AbstractManager")

class PrivateMessagesManager extends AbstractManager {
  constructor() {
    super({ table: "private_messages" })
  }

  insert(privateMessages) {
    return this.database.query(
      `INSERT INTO ${this.table} (users_id_sender, users_id_recipient, content, date, seen) VALUES (?, ?, ?, NOW(), 0)`,
      [
        privateMessages.users_id_sender,
        privateMessages.users_id_recipient,
        privateMessages.content,
        privateMessages.date,
        privateMessages.read,
      ]
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
}

module.exports = PrivateMessagesManager
