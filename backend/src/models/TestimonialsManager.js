const AbstractManager = require("./AbstractManager")

class TestimonialsManager extends AbstractManager {
  constructor() {
    super({ table: "testimonials" })
  }

  insert(testimonials) {
    return this.database.query(
      `insert into ${this.table} (title, content, date, users_id) values ("?", "?", NOW(), "?")`,
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
}

module.exports = TestimonialsManager
