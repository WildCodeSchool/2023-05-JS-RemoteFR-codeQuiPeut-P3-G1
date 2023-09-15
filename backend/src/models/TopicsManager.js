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
  t.id AS topics_id,
  (
    SELECT p1.content
    FROM posts p1
    WHERE p1.topics_id = t.id
    ORDER BY p1.date ASC
    LIMIT 1
  ) AS first_content
FROM
  topics t
JOIN
  posts p ON t.id = p.topics_id
JOIN
  users u ON p.users_id = u.id
ORDER BY p.date DESC; -- Tri des sujets par date décroissante

  `)
  }
}

module.exports = TopicsManager
