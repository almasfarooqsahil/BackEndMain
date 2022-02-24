exports.up = function (knex) {
    return knex.schema.createTable("student", (table) => {
      table.increments();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("student");
  };
