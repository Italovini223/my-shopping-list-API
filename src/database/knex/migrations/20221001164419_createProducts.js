
exports.up = knex => knex.schema.createTable("products", table => {
  table.increments("id");

  table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
  table.integer("list_id").references("id").inTable("list").onDelete("CASCADE");

  table.text("name");

})

exports.down = knex => knex.schema.dropTable("products");
