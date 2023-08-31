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
  getGameRegistrationsWithDetails(userRegistrationId) {
    return this.database.query(
      `
      
      SELECT G.*, U.username AS gm_username
      FROM games G
      INNER JOIN game_registrations GR ON G.id = GR.games_id
      INNER JOIN gm_profiles GM ON G.gm_profiles_id = GM.id
      INNER JOIN users U ON GM.users_id = U.id
      WHERE GR.users_id = "1";
    `,
      [userRegistrationId]
    )
  }
}

module.exports = GameRegistrationsManager
