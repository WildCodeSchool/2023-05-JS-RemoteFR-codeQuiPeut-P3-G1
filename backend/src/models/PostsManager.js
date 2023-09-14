const AbstractManager = require("./AbstractManager")

class PostsManager extends AbstractManager {
  constructor() {
    super({ table: "posts" })
  }

  insert(posts) {
    return this.database.query(
      `insert into ${this.table} (topics_id, users_id, content, date) values (?, ?, ?, NOW())`,
      [posts.topics_id, posts.users_id, posts.content]
    )
  }

  update(posts) {
    return this.database.query(
      `update ${this.table} set topics_id = ?, users_id = ?, content = ? WHERE id = ? `,
      [posts.topics_id, posts.users_id, posts.content]
    )
  }
}

module.exports = PostsManager
