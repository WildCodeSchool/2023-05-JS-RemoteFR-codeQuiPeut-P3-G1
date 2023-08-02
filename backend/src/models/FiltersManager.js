const AbstractManager = require("./AbstractManager")

class FiltersManager extends AbstractManager {
  constructor() {
    super({ table: "filters" })
  }

  insert(filters) {
    return this.database.query(
      `insert into ${this.table} (name, description, type) values ("?", "?", "?")`,
      [filters.name, filters.description, filters.type]
    )
  }

  update(filters) {
    return this.database.query(
      `update ${this.table} set name = ?, description = ?, type = ? WHERE id = ? `,
      [filters.name, filters.description, filters.type]
    )
  }
}

module.exports = FiltersManager
