const AbstractManager = require("./AbstractManager")

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: "users" })
  }

  insert(users) {
    return this.database.query(
      `insert into ${this.table} (username, email_adress, password) values ("?", "?", "?")`,
      [users.username, users.email_adress, users.password]
    )
  }

  update(users) {
    return this.database.query(
      `update ${this.table} set username = ? where id = ?`,
      [users.username, users.id]
    )
  }
}

module.exports = UsersManager
