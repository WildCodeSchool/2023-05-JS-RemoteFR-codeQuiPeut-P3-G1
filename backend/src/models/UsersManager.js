const AbstractManager = require("./AbstractManager")

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: "users" })
  }

  insert(users) {
    return this.database.query(
      `insert into ${this.table} (username, email_adress, location, hashedPassword, is_gamemaster, registration_date) values (?, ?, ?, ?, "playerOnly", NOW())`,
      [
        users.username,
        users.email_adress,
        users.location,
        users.hashedPassword,
        users.is_gamemaster,
        users.registration_date,
      ]
    )
  }

  update(users) {
    return this.database.query(
      `update ${this.table} set username = ?, email_adress = ?, hashedPassword = ?, other_information = ?, is_gamemaster = ?, availability_schedule = ?, description_as_player = ?, location = ?, profil_picture = ?, description_as_gm = ? where id = ?`,
      [
        users.username,
        users.email_adress,
        users.hashedPassword,
        users.other_information,
        users.is_gamemaster,
        users.availability_schedule,
        users.descriptions_as_player,
        users.location,
        users.profil_picture,
        users.description_as_gm,
        users.id,
      ]
    )
  }

  updateProfilPicture(users, profilpicturePath) {
    return this.database.query(
      `UPDATE ${this.table} SET profil_picture = ? WHERE id = ?`,
      [profilpicturePath, users.id]
    )
  }

  getUserByUsernameWithPassword(username) {
    return this.database.query(
      `select id, username, hashedPassword from ${this.table} where username = ?`,
      [username]
    )
  }
}

module.exports = UsersManager
