const AbstractManager = require("./AbstractManager")

class GameRegistrationsManager extends AbstractManager {
  constructor() {
    super({ table: "game_registrations" })
  }

  insert(gameregistrations) {
    return this.database.query(
      `INSERT INTO ${this.table} (games_id, status, users_id) VALUES (?, ?, ?)`,
      [
        gameregistrations.games_id,
        gameregistrations.status,
        gameregistrations.users_id,
      ]
    )
  }

  update(gameregistrations) {
    return this.database.query(
      `UPDATE ${this.table} SET games_id = ?, status = ?,users_id = ? WHERE id = ?`,
      [
        gameregistrations.games_id,
        gameregistrations.status,
        gameregistrations.users_id,
      ]
    )
  }
}

module.exports = GameRegistrationsManager
