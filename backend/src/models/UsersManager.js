const AbstractManager = require("./AbstractManager")

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: "users" })
  }

  insert(users) {
    return this.database.query(
      `insert into ${this.table} (username, email_adress, location, hashedPassword, registration_date) values (?, ?, ?, ?, NOW())`,
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

  rpgDisplay(id) {
    return this.database.query(
      `select r.rpg_icon, r.id
      FROM role_playing_games AS r
      INNER JOIN users_has_role_playing_games AS uhr ON r.id = uhr.role_playing_games_id
      WHERE uhr.users_id = ?`,
      [id]
    )
  }

  rpgAdder(usersId, rolePlayingGamesId) {
    return this.database.query(
      "INSERT INTO users_has_role_playing_games (users_id, role_playing_games_id) VALUES (? ,?)",
      [usersId, rolePlayingGamesId]
    )
  }

  rpgLesser(usersId, rolePlayingGamesId) {
    return this.database.query(
      "DELETE FROM users_has_role_playing_games WHERE users_id = ? AND role_playing_games_id = ?",
      [usersId, rolePlayingGamesId]
    )
  }

  update(users) {
    return this.database.query(
      `update ${this.table} set username = ?, email_adress = ?, hashedPassword = ?, other_information = ?, description_as_player = ?, location = ?, profil_picture = ?, description_as_gm = ?, country = ?, where id = ?`,
      [
        users.username,
        users.email_adress,
        users.hashedPassword,
        users.other_information,
        users.descriptions_as_player,
        users.location,
        users.profil_picture,
        users.description_as_gm,
        users.country,
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

  updateProfilUser(users) {
    return this.database.query(
      `UPDATE ${this.table} SET username = ?, location = ?, email_adress = ?, description_as_player = ?, country = ? WHERE id = ?`,
      [
        users.username,
        users.city,
        users.email,
        users.description_as_player,
        users.country,
        users.idUser,
      ]
    )
  }
}

module.exports = UsersManager
