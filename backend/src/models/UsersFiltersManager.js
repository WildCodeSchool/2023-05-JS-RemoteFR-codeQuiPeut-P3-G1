const AbstractManager = require("./AbstractManager")

class UsersFiltersManager extends AbstractManager {
  constructor() {
    super({ table: "users_filters" })
  }

  insert(usersFilters) {
    return this.database.query(
      `insert into ${this.table} (value, filters_id, users_id) values ("?", "?", "?", "?")`,
      [usersFilters.value, usersFilters.filters_id, usersFilters.users_id]
    )
  }

  update(usersFilters) {
    return this.database.query(
      `update ${this.table} set value = ?, filters_id = ?, users_id = ? WHERE id = ?`,
      [usersFilters.value, usersFilters.filters_id, usersFilters.users_id]
    )
  }
}

module.exports = UsersFiltersManager
