const { default: knex } = require("knex");

exports.up = knex => knex.schema.createTable("list", table => {
    table.increments("id");

    table.text("title");
    table.text("description");

    table.integer("user_id").references("id").inTable("user");
    


});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = knex => knex.schema.dropTable("list");