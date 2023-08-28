const AbstractManager = require("./AbstractManager")

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: "users" })
  }

  insert(users) {
    return this.database.query(
      `insert into ${this.table} (username, email_adress, hashedPassword, other_information, is_gamemaster, availability_schedule, description_as_player, registration_date, location, profil_picture, description_as_gm) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        users.username,
        users.email_adress,
        users.hashedPassword,
        users.other_information,
        users.is_gamemaster,
        users.availability_schedule,
        users.descriptions_as_player,
        users.registration_date,
        users.location,
        users.profil_picture,
        users.description_as_gm,
      ]
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

  getUserByUsernameWithPassword(username) {
    return this.database.query(
      `select username, hashedPassword from ${this.table} where username = ?`,
      [username]
    )
  }
}

module.exports = UsersManager
