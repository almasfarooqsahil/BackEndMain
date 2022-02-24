// Update with your config settings.
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "StudentBooks",
      user: "postgres",
      password: "DBSQL",
    },
    pool: {
      min: 2,
      max: 10,
      afterCreate: (conn, done) => {
        conn.query('SET timezone="UTC";', (err) => {
          if (err) {
            console.log(err);
          }
          done(err, conn);
        });
      },
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
