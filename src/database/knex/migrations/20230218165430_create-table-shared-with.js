
exports.up = knex => knex.schema.createTable("list-shared-with", table => {
  table.integer("list_id").references("id").inTable("list").onDelete("CASCADE")
  table.integer("user_id").references("id").inTable("users").onDelete("CASCADE")
})

exports.down = knex => knex.schema.dropTable("list-shared-with")
