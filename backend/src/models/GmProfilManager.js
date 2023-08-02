const AbstractManager = require("./AbstractManager")

class gmProfilesManager extends AbstractManager {
  constructor() {
    super({ table: "gm_profiles" })
  }

  insert(gmProfiles) {
    return this.database.query(
      `insert into ${this.table} (description, availability_schedule, users_filters_id, users_id) values ("?", "?", "?", "?")`,
      [
        gmProfiles.description,
        gmProfiles.availability_schedule,
        gmProfiles.users_filters_id,
        gmProfiles.users_id,
      ]
    )
  }

  update(gmProfiles) {
    return this.database.query(
      `update ${this.table} set description = ?, availability_schedule = ?, users_filters_id = ?, users_id = ? WHERE id = ?`,
      [gmProfiles.description, gmProfiles.location, gmProfiles.users_filters]
    )
  }
}

module.exports = gmProfilesManager
