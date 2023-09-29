const AbstractManager = require("./AbstractManager")

class GameRegistrationsManager extends AbstractManager {
  constructor() {
    super({ table: "game_registrations" })
  }

  insert(gameRegistrations) {
    return this.database.query(
      `INSERT INTO ${this.table} (games_id, status, requester_id) VALUES (?, ?, ?)`,
      [
        gameRegistrations.games_id,
        gameRegistrations.status,
        gameRegistrations.requester_id,
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
      SELECT *
      from games
      JOIN games_has_users AS ghu
      ON ghu.games_id = games.id
      JOIN users
      ON games.gm_id = users.id
      WHERE ghu.users_id = ?;
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
      `SELECT g.*, gr.games_id, gr.requester_id, gr.status, u.profil_picture AS gm_profil_picture, rpg.rpg_icon FROM guilden.game_registrations AS gr
      JOIN games g ON gr.games_id = g.id
      JOIN users u ON g.gm_id = u.id
      JOIN role_playing_games rpg ON rpg.id = g.role_playing_game_id
      WHERE gr.requester_id = ? AND gr.status = "accepted" AND schedule > NOW()`,
      [id]
    )
  }

  gamePendingRequests(id) {
    return this.database.query(
      `SELECT g.*, gr.games_id, gr.requester_id, gr.status, u.profil_picture AS gm_profil_picture, rpg.rpg_icon FROM guilden.game_registrations AS gr
      JOIN games g ON gr.games_id = g.id
      JOIN users u ON g.gm_id = u.id
      JOIN role_playing_games rpg ON rpg.id = g.role_playing_game_id
      WHERE gr.requester_id = ? AND gr.status = "pending" AND schedule > NOW()`,
      [id]
    )
  }

  gameHistoryPlayer(id) {
    return this.database.query(
      ` SELECT g.*, gr.games_id, gr.requester_id, gr.status, u.profil_picture AS gm_profil_picture, rpg.rpg_icon FROM guilden.game_registrations AS gr
      JOIN games g ON gr.games_id = g.id
      JOIN users u ON g.gm_id = u.id
      JOIN role_playing_games rpg ON rpg.id = g.role_playing_game_id
      WHERE gr.requester_id = ?  AND schedule < NOW()`,
      [id]
    )
  }
}

module.exports = GameRegistrationsManager
