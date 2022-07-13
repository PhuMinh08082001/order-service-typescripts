// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export let config = {
    development: {
      client: "pg",
      connection: {
        host: "localhost",
        database: "orderdb",
        user: "postgres",
        password: '123456',
      },
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        tableName: "knex_migrations",
        directory: `${__dirname}/db/migrations`,
      },
      seeds: {
        directory: `${__dirname}/db/seeds`,
      },
    },
  };
  