// Update with your config settings.
const Dotenv = require('dotenv');
Dotenv.config({ path: `${__dirname}/.env` });

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: process.env.DB_name,
      user: process.env.DB_username,
      password: process.env.DB_password
    },
    pool: {
      min: 2,
      max: 5
    },
    migrations: {
      tableName: "knex_migration",
      directory: './migrations',
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
