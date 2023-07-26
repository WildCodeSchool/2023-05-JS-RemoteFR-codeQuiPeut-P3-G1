const AbstractManager = require("./AbstractManager")

class CharacterManager extends AbstractManager {
  constructor() {
    super({ table: "characters" })
  }

  insert(characters) {
    return this.database.query(
      `insert into ${this.table} (firstname,lastname, imgUrl, houses_id) values (?,?,?,?)`,
      [
        characters.firstname,
        characters.lastname,
        characters.imgUrl,
        characters.houses_id,
      ]
    )
  }

  update(characters) {
    return this.database.query(
      `UPDATE ${this.table} SET firstname = ?, lastname = ?, imgUrl = ?, houses_id = ? WHERE (id = ?)`,
      [
        characters.firstname,
        characters.lastname,
        characters.imgUrl,
        characters.houses_id,
        characters.id,
      ]
    )
  }
}

module.exports = CharacterManager
