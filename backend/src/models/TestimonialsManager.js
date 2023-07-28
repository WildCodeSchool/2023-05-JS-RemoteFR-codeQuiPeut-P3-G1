const AbstractManager = require("./AbstractManager")

class TestimonialsManager extends AbstractManager {
  constructor() {
    super({ table: "testimonials" })
  }

  insert(testimonials) {
    return this.database.query(
      `insert into ${this.table} (title, content, date) values ("?", "?", NOW())`,
      [testimonials.title, testimonials.content, testimonials.date]
    )
  }

  update(testimonials) {
    return this.database.query(
      `update ${this.table} set username = ? where id = ?`,
      [testimonials.title, testimonials.id]
    )
  }
}

module.exports = TestimonialsManager
