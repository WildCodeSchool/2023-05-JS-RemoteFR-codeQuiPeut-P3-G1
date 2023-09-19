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
      `SELECT gr.id, u.profil_picture, u.description_as_player, u.username, ga.guild_name, gr.status, ga.gm_id, gr.games_id, gr.requester_id 
      FROM ${this.table} AS gr
      JOIN users AS u ON gr.requester_id = u.id
      JOIN games AS ga ON gr.games_id = ga.id 
      WHERE gm_id = ? AND status = "accepted";`,
      [id]
    )
  }

  gameJoiningRequests(id) {
    return this.database.query(
      `SELECT gr.id, u.profil_picture, u.username, ga.guild_name, ga.schedule, ga.is_campaign, gr.status, ga.gm_id, gr.games_id, gr.requester_id 
      FROM ${this.table} AS gr
      JOIN users AS u ON gr.requester_id = u.id
      JOIN games AS ga ON gr.games_id = ga.id 
      WHERE gm_id = ? AND status = "pending"`,
      [id]
    )
  }

  gameValidateRequests(id) {
    return this.database.query(
      `SELECT g.schedule, g.guild_name, g.is_campaign, gr.games_id, gr.requester_id, gr.status FROM ${this.table} AS gr
      JOIN games g ON gr.games_id = g.id
      WHERE gr.requester_id = ? AND gr.status = "accepted" AND g.schedule > NOW();`,
      [id]
    )
  }

  gamePendingRequests(id) {
    return this.database.query(
      `SELECT g.schedule, g.guild_name, g.is_campaign, gr.games_id, gr.requester_id, gr.status FROM ${this.table} AS gr
      JOIN games g ON gr.games_id = g.id
      WHERE gr.requester_id = ? AND gr.status = "pending";`,
      [id]
    )
  }

  gameHistoryPlayer(id) {
    return this.database.query(
      `SELECT g.schedule, g.guild_name, g.is_campaign, gr.games_id, gr.requester_id, gr.status FROM ${this.table} AS gr
      JOIN games g ON gr.games_id = g.id
      WHERE gr.requester_id = ? AND g.schedule < NOW();`,
      [id]
    )
  }
}

module.exports = GameRegistrationsManager
