const AbstractManager = require("./AbstractManager")

class RolePlayingGamesManager extends AbstractManager {
  constructor() {
    super({ table: "role_playing_games" })
  }

  insert(rolePlayingGames) {
    return this.database.query(
      `insert into ${this.table} (name, description, gm_profiles_id) values ("?", "?", "?")`,
      [
        rolePlayingGames.name,
        rolePlayingGames.description,
        rolePlayingGames.gm_profiles_id,
      ]
    )
  }

  update(rolePlayingGames) {
    return this.database.query(
      `update ${this.table} set name = ?, description = ?, gm_profiles_id = ? WHERE id = ? `,
      [
        rolePlayingGames.name,
        rolePlayingGames.description,
        rolePlayingGames.gm_profiles_id,
      ]
    )
  }
}

module.exports = RolePlayingGamesManager
