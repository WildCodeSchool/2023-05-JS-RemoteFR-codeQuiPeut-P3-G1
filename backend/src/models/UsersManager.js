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

  updateProfilPicture(users) {
    return this.database.query(
      `update ${this.table} set profil_picture = ? where id = ?`,
      [users.profil_picture, users.id]
    )
  }

  // get(users) {
  //   return this.database.query(
  //   `select * from ${this.table} where username = ?`
  //   [users.username]
  //   )
  // }
}

module.exports = UsersManager
