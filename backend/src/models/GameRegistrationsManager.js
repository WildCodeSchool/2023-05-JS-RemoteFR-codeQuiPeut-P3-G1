const AbstractManager = require("./AbstractManager")

class GameRegistrationsManager extends AbstractManager {
  constructor() {
    super({ table: "game_registrations" })
  }

  insert(gameRegistrations) {
    return this.database.query(
      `INSERT INTO ${this.table} (games_id, status, users_id) VALUES (?, ?, ?)`,
      [
        gameRegistrations.games_id,
        gameRegistrations.status,
        gameRegistrations.users_id,
      ]
    )
  }

  update(gameRegistrations) {
    return this.database.query(
      `UPDATE ${this.table} SET games_id = ?, status = ?,users_id = ? WHERE id = ?`,
      [
        gameRegistrations.games_id,
        gameRegistrations.status,
        gameRegistrations.users_id,
      ]
    )
  }

  // Cette requete affiche les tables ou l'user est inscrit
  getGameRegistrationsWithDetails(id) {
    return this.database.query(
      `
      SELECT g.*
      FROM games g
      JOIN games_has_users gu ON g.id = gu.games_id
      WHERE gu.users_id = ?;
    `,
      [id]
    )
  }

  getAllPlayersForThisGame(id) {
    return this.database.query(
      `
      SELECT game_registrations.*, users.*
      FROM game_registrations
      INNER JOIN users ON game_registrations.users_id = users.id
      WHERE game_registrations.games_id = ?;
    `,
      [id]
    )
  }
}

module.exports = GameRegistrationsManager
