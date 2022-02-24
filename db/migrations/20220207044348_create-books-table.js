// book name, author, borrowed by (student name) or empty, date of borrow, expected date of return
exports.up = function (knex) {
    return knex.schema.createTable("book", (table) => {
      table.increments();
      table.string("book_name").notNullable();
      table.string("author_name").notNullable();
      table.integer('borrowed_by').references("id").inTable('student').onDelete('cascade').nullable();
      table.string("date_borrowed").nullable();
      table.string("date_return").nullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("book");
  };