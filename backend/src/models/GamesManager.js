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
      `INSERT INTO ${this.table} (role_playing_game_id, gm_username, schedule, max_players_capacity, description, type, name, city, is_remote, is_campaign) VALUES (?, ?, DATE_FORMAT(?, '%Y-%m-%d %H:%i'), ?, ?, ?, ?, ?, ?, ?)`,
      [
        games.role_playing_game_id,
        games.gm_username,
        games.schedule,
        games.max_players_capacity,
        games.description,
        games.type,
        games.name,
        games.city,
        games.is_remote,
        games.is_campaign,
      ]
    )
  }

  update(games) {
    return this.database.query(
      `UPDATE ${this.table} SET role_playing_game_id = ?, gm_username = ?, schedule = DATE_FORMAT(?, '%Y-%m-%d %H:%i'), city = ?, max_players_capacity = ?, description = ? WHERE id = ?`,
      [
        games.role_playing_games_id,
        games.gm_username,
        games.schedule,
        games.city,
        games.max_players_capacity,
        games.description,
      ]
    )
  }
}

module.exports = GamesManager
