const AbstractManager = require("./AbstractManager")

class TopicsSubscriptionManager extends AbstractManager {
  constructor() {
    super({ table: "topics_subscription" })
  }

  insert(topicsSubscription) {
    return this.database.query(
      `insert into ${this.table} (users_id, topics_id) values ("?", "?")`,
      [topicsSubscription.title, topicsSubscription.categories_id]
    )
  }

  update(topicsSubscription) {
    return this.database.query(
      `update ${this.table} users_id = ?, topics_id = ? WHERE id = ? `,
      [topicsSubscription.title, topicsSubscription.categories_id]
    )
  }
}

module.exports = TopicsSubscriptionManager
