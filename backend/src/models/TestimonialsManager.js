const AbstractManager = require("./AbstractManager")

class TestimonialsManager extends AbstractManager {
  constructor() {
    super({ table: "testimonials" })
  }

  insert(testimonials) {
    return this.database.query(
      `insert into ${this.table} (title, content, date, users_id) values (?, ?, NOW(), ?)`,
      [testimonials.title, testimonials.content, testimonials.users_id]
    )
  }

  update(testimonials) {
    return this.database.query(
      `update ${this.table} set title = ?, content = ?, users_id = ? WHERE id = ?`,
      [
        testimonials.title,
        testimonials.content,
        testimonials.users_id,
        testimonials.id,
      ]
    )
  }

  testimonialsCarrousel() {
    return this.database.query(
      `SELECT u.id, u.username, t.content, u.profil_picture FROM ${this.table} AS t JOIN users AS u ON t.users_id = u.id`
    )
  }
}

module.exports = TestimonialsManager
