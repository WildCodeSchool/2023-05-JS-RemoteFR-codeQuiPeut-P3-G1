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
      select *
      from games
      join games_has_users as ghu
      on ghu.games_id = games.id
      join users
      on ghu.users_id = users.id
      where users.id = ?;
    `,
      [id]
    )
  }

  getAllPlayersForThisGame(id) {
    return this.database.query(
      `SELECT gr.id, u.profil_picture, u.username, ga.guild_name, gr.status, ga.gm_id, gr.games_id, gr.requester_id 
      FROM ${this.table} AS gr
      JOIN users AS u ON gr.requester_id = u.id
      JOIN games AS ga ON gr.games_id = ga.id 
      WHERE gm_id = ? AND status = "accepted";`,
      [id]
    )
  }

  gameJoiningRequests(id) {
    return this.database.query(
      `select users.username, users.profil_picture, games.guild_name
      from users
      join game_registrations as gr
      on gr.requester_id = users.id
      join games
      on gr.games_id = games.id
      where gm_username = ? and status = "pending"`,
      [id]
    )
  }
}

module.exports = GameRegistrationsManager
