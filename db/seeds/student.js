exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('student').del()
    .then(function () {
      // Inserts seed entries
      return knex('student').insert([
        {id: 1, first_name: 'Almas', last_name:'farooq'},
        {id: 2, first_name: 'mujtaba', last_name:'sahil'},
        {id: 3, first_name: 'Murtaza', last_name:'Ali'},
        {id: 4, first_name: 'Ruby', last_name:'Miller'},
        {id: 5, first_name: 'John', last_name:'Smith'},
        {id: 6, first_name: 'Miss', last_name:'sidra'},
      ]);
    });
};
