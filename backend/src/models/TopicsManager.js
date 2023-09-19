const AbstractManager = require("./AbstractManager")

class TopicsManager extends AbstractManager {
  constructor() {
    super({ table: "topics" })
  }

  insert(topic) {
    return this.database.query(
      `INSERT INTO ${this.table} (title, categories_id, users_id, creation_date, subscription_count) VALUES (?, ?, ?, NOW(), 0)`,
      [
        topic.title,
        topic.categories_id,
        topic.users_id,
        // topic.subscription_count,
      ]
    )
  }

  update(topic) {
    return this.database.query(
      `UPDATE ${this.table} SET title = ?, categories_id = ?, users_id = ?, creation_date = ?, subscription_count = ? WHERE id = ?`,
      [
        topic.title,
        topic.categories_id,
        topic.users_id,
        topic.creation_date,
        topic.subscription_count,
        topic.id, // Ajout de l'ID pour la clause WHERE
      ]
    )
  }

  getTopicsAndUsers() {
    return this.database.query(`
    SELECT
      u.profil_picture,
      u.username,
      t.title,
      t.id,
      DATE_FORMAT(p.date, '%Y-%m-%d %H:%i:%s') AS date,
      t.id AS topics_id
    FROM
      posts p
    JOIN
      topics t ON p.topics_id = t.id
    JOIN
      users u ON p.users_id = u.id;
  `)
  }
}

module.exports = TopicsManager
