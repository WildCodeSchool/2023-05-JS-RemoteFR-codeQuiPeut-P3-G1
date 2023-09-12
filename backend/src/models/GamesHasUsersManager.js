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
}

module.exports = GamesHasUsersManager
