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
      `UPDATE ${this.table} SET guild_name = ?, type = ?, role_playing_game_id = ?, is_campaign = ?, max_players_capacity = ?, description = ?, is_remote = ?, city = ?, schedule = DATE_FORMAT(?, '%Y-%m-%d %H:%i') WHERE id = ?`,
      [
        games.guild_name,
        games.type,
        games.role_playing_game_id,
        games.is_campaign,
        games.max_players_capacity,
        games.description,
        games.is_remote,
        games.city,
        games.schedule,
        games.id,
      ]
    )
  }

  getGamesByGameMasterUsername(username) {
    return this.database.query(
      `SELECT g.id, g.guild_name, u.profil_picture, g.type, g.is_campaign, g.is_remote, g.max_players_capacity, g.description, g.city, g.schedule, g.gm_username, rpg.name as rpg_name, rpg.id as rpg_id, rpg.rpg_icon as rpg_icon
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

  getGamesWithRpgName() {
    return this.database.query(
      `SELECT games.*, rpg.name AS rpg_name, users.profil_picture as gm_profil_picture, rpg.rpg_icon AS rpg_icon
      FROM games
      JOIN role_playing_games AS rpg ON rpg.id = games.role_playing_game_id
      JOIN users ON users.id = games.gm_id
      WHERE games.schedule > NOW()`,
      []
    )
  }

  upcommingGameGM(id) {
    return this.database.query(
      `select * from  ${this.table} where gm_id = ? AND schedule > NOW()`,
      [id]
    )
  }

  historyGameGM(id) {
    return this.database.query(
      `select * from  ${this.table} where gm_id = ? AND schedule < NOW()`,
      [id]
    )
  }

  getNextGamesByGamemasterId(id) {
    return this.database.query(
      `SELECT games.*
      FROM ${this.table}
      JOIN role_playing_games AS rpg ON rpg.id = games.role_playing_game_id
      JOIN users ON users.id = games.gm_id
      WHERE games.schedule > NOW() and gm_id = ?`,
      [id]
    )
  }
}

module.exports = GamesManager
