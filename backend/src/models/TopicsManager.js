const AbstractManager = require("./AbstractManager")

class TopicsManager extends AbstractManager {
  constructor() {
    super({ table: "topics" })
  }

  insert(topics) {
    return this.database.query(
      `insert into ${this.table} (title, categories_id, users_id, creation_date, subscription_count ) values (?, ?, ?, NOW(), ?)`,
      [
        topics.title,
        topics.categories_id,
        topics.users_id,
        topics.creation_date,
        topics.subscription_count,
      ]
    )
  }

  update(topics) {
    return this.database.query(
      `update ${this.table} set title = ?, categories_id = ?, users_id = ? creation_date = ?, subscription_count = ? WHERE id = ? `,
      [
        topics.title,
        topics.categories_id,
        topics.users_id,
        topics.creation_date,
        topics.subscription_count,
      ]
    )
  }
}

module.exports = TopicsManager
