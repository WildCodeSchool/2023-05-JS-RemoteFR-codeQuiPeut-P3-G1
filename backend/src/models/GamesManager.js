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
      `INSERT INTO ${this.table} (role_playing_game_id, gm_username, schedule, city, max_players_capacity, description, type, guild_name, guild_name,  is_remote, is_campaign) VALUES (?, ?, DATE_FORMAT(?, '%Y-%m-%d %H:%i'), ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        games.role_playing_games_id,
        games.gm_username,
        games.schedule,
        games.city,
        games.max_players_capacity,
        games.description,
        games.guild_name,
        games.type,
        games.gm_id,
        games.is_remote,
        games.is_campaign,
      ]
    )
  }

  update(games) {
    return this.database.query(
      `UPDATE ${this.table} SET role_playing_game_id = ?, gm_username = ?, schedule = DATE_FORMAT(?, '%Y-%m-%d %H:%i'), city = ?, max_players_capacity = ?, description = ? guild_name = ? type = ? gm_id = ? is_remote = ? is_campaign = ? WHERE id = ?`,
      [
        games.role_playing_games_id,
        games.gm_username,
        games.schedule,
        games.city,
        games.max_players_capacity,
        games.description,
        games.guild_name,
        games.type,
        games.gm_id,
        games.is_remote,
        games.is_campaign,
      ]
    )
  }
}

module.exports = GamesManager
