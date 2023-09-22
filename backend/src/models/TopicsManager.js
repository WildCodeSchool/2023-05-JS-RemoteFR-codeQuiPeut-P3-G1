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
        topic.users_id, // topic.subscription_count,
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
    t.id AS topic_id,
    DATE_FORMAT(p.date, '%Y-%m-%d %H:%i:%s') AS date,
    (
      SELECT posts.content
      FROM posts
      WHERE posts.topics_id = t.id
      ORDER BY posts.date ASC
      LIMIT 1
    ) AS first_content
  FROM topics t
  JOIN (
    SELECT
      topics_id,
      MAX(date) AS max_date
    FROM posts
    GROUP BY topics_id
  ) latest_posts ON t.id = latest_posts.topics_id
  JOIN posts p ON latest_posts.topics_id = p.topics_id AND latest_posts.max_date = p.date
  JOIN users u ON p.users_id = u.id
  ORDER BY latest_posts.max_date DESC;
  
`)
  }
}

module.exports = TopicsManager
