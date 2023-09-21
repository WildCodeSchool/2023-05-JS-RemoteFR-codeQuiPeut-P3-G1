const AbstractManager = require("./AbstractManager")

class GameRegistrationsAsPlayerManager extends AbstractManager {
  constructor() {
    super({ table: "game_registrations_as_player" })
  }

  getAllInvitationsOfGm(id) {
    return this.database.query(
      `SELECT grap.*,  games.*, users.profil_picture, users.profil_picture as gm_profil_picture, role_playing_games.rpg_icon
      FROM game_registrations_as_player as grap
      JOIN games ON games.id = grap.games_id
      JOIN role_playing_games on role_playing_games.id = games.role_playing_game_id
      JOIN users ON games.gm_username = users.username
      WHERE player_id = ?`,
      [id]
    )
  }

  insert(gameRegistrationsAsPlayer) {
    return this.database.query(
      `INSERT INTO ${this.table} (player_id, games_id, status) VALUES (?, ?, ?)`,
      [
        gameRegistrationsAsPlayer.player_id,
        gameRegistrationsAsPlayer.games_id,
        gameRegistrationsAsPlayer.status,
      ]
    )
  }

  joiningRequestsRejectedNotification(playerId, GamesId) {
    return this.database.query(
      `UPDATE ${this.table} SET status = "rejected" WHERE player_id = ? AND games_id = ?`,
      [playerId, GamesId]
    )
  }

  joiningRequestsAcceptedNotification(playerId, GamesId) {
    return this.database.query(
      `UPDATE ${this.table} SET status = "accepted" WHERE player_id = ? AND games_id = ?`,
      [playerId, GamesId]
    )
  }
}

module.exports = GameRegistrationsAsPlayerManager
