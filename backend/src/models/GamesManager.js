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
      `INSERT INTO ${this.table} (role_playing_game_id, gm_username, schedule, max_players_capacity, description, type, guild_name, city, is_remote, is_campaign, gm_id) VALUES (?, ?, DATE_FORMAT(?, '%Y-%m-%d %H:%i'), ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        games.role_playing_game_id,
        games.gm_username,
        games.schedule,
        games.max_players_capacity,
        games.description,
        games.type,
        games.guild_name,
        games.city,
        games.is_remote,
        games.is_campaign,
        games.gm_id,
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
        games.guild_name,
        games.type,
      ]
    )
  }

  getGamesByGameMasterUsername(username) {
    return this.database.query(
      `SELECT g.id, g.guild_name, u.profil_picture, g.type, g.is_campaign, g.is_remote, g.max_players_capacity, g.description, g.city, g.schedule, g.gm_username, rpg.name as rpg_name, rpg.rpg_icon as rpg_icon
    FROM ${this.table} as g
    inner join users as u
    on u.username = g.gm_username
    inner join role_playing_games as rpg
    on rpg.id = g.role_playing_game_id
    where g.gm_username = ?
    order by g.id desc`,
      [username]
    )
  }
}

module.exports = GamesManager
