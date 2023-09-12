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
      `UPDATE ${this.table} SET games_id = ?, status = ?,requester_id = ? WHERE id = ?`,
      [
        gameRegistrations.games_id,
        gameRegistrations.status,
        gameRegistrations.requester_id,
      ]
    )
  }

  joiningRequestsRejected(requesterId, GamesId) {
    return this.database.query(
      `UPDATE ${this.table} SET status = "rejected" WHERE requester_id = ? AND games_id = ?`,
      [requesterId, GamesId]
    )
  }

  joiningRequestsAccepted(requesterId, GamesId) {
    return this.database.query(
      `UPDATE ${this.table} SET status = "accepted" WHERE requester_id = ? AND games_id = ?`,
      [requesterId, GamesId]
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
      SELECT game_registrations.*, users.id, users.username, users.description_as_player, users.profil_picture
      FROM game_registrations
      INNER JOIN users ON game_registrations.users_id = users.id
      WHERE game_registrations.games_id = ?;
    `,
      [id]
    )
  }

  gameJoiningRequests(id) {
    return this.database.query(
      `SELECT gr.id, u.profil_picture, u.username, ga.guild_name, gr.status, ga.gm_id, gr.games_id, gr.requester_id 
      FROM ${this.table} AS gr
      JOIN users AS u ON gr.requester_id = u.id
      JOIN games AS ga ON gr.games_id = ga.id 
      WHERE gm_id = ? AND status = "pending";`,
      [id]
    )
  }
}

module.exports = GameRegistrationsManager
