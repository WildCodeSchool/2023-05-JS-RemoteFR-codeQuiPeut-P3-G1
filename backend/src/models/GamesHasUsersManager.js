const AbstractManager = require("./AbstractManager")

class GamesHasUsersManager extends AbstractManager {
  constructor() {
    super({ table: "games_has_users" })
  }

  insert(requesterId, gameId) {
    return this.database.query(
      `INSERT INTO ${this.table} (games_id, users_id) VALUES (?, ?)`,
      [gameId, requesterId]
    )
  }

  getUsersHistory(id) {
    return this.database.query(
      `SELECT u2.id, u2.username, u2.profil_picture, u2.description_as_gm, MIN(ga.city) city, MIN(ga.guild_name) guild_name, MIN(ga.is_remote) is_remote
      FROM ${this.table} gu1
      JOIN ${this.table} gu2 ON gu1.games_id = gu2.games_id
      JOIN users u2 ON gu2.users_id = u2.id
      JOIN games ga ON gu2.games_id = ga.id
      WHERE gu1.users_id = ? AND gu2.users_id != ?
      GROUP BY u2.id, u2.username, u2.profil_picture`,
      [id, id]
    )
  }

  allPlayersByGameId(id) {
    // Executes a SQL query to select usernames and profile pictures of players
    // who are associated with the specified game ID.
    return this.database.query(
      `SELECT users.username, users.profil_picture
       FROM ${this.table} AS ghu
       JOIN games ON ghu.games_id = games.id
       JOIN users ON ghu.users_id = users.id
       WHERE games_id = ?`,
      [id]
    )
  }

  deleteGamesHasUsersByGameId(id) {
    return this.database.query(
      `DELETE ghu.* FROM ${this.table} as ghu
      JOIN games ON games.id = ghu.games_id
      WHERE ghu.games_id = ?`,
      [id]
    )
  }
}

module.exports = GamesHasUsersManager
