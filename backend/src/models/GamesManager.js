const AbstractManager = require("./AbstractManager")

class GamesManager extends AbstractManager {
  constructor() {
    super({ table: "games" })
  }

  async insert(games) {
    // const scheduleDate = new Date(games.schedule)
    // const formattedScheduleDate = scheduleDate
    //   .toISOString()
    //   .slice(0, 19)
    //   .replace("T", " ")
    return this.database.query(
      `INSERT INTO ${this.table} (role_playing_game_id, gm_profiles_id, schedule, location, max_players_capacity, description) VALUES (?, ?, DATE_FORMAT(?, '%Y-%m-%d %H:%i'), ?, ?, ?)`,
      [
        games.role_playing_game_id,
        games.gm_profiles_id,
        // formattedScheduleDate,
        games.schedule,
        games.location,
        games.max_players_capacity,
        games.description,
      ]
    )
  }

  update(games) {
    return this.database.query(
      `UPDATE ${this.table} SET role_playing_game_id = ?, gm_profiles_id = ?, schedule = DATE_FORMAT(?, '%Y-%m-%d %H:%i'), location = ?, max_players_capacity = ?, description = ? WHERE id = ?`,
      [
        games.role_playing_games_id,
        games.gm_profiles_id,
        games.schedule,
        games.location,
        games.max_players_capacity,
        games.description,
      ]
    )
  }
}

module.exports = GamesManager
