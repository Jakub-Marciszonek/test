require('dotenv').config(); // Optional, if you use .env files

//example:
// gitbash:
// set NODE_ENV=test npx sequelize-cli db:migrate

module.exports = {
  development: {
    username: process.env.DBUSER || 'your_dev_user',
    password: process.env.DBPASSWORD || 'your_dev_password',
    database: process.env.DBNAME || 'your_dev_db',
    host: process.env.DBHOST || '127.0.0.1',
    port: process.env.DBPORT || '3306',
    dialect: 'mysql'
  },
  test: {
    username: process.env.DBUSER || 'your_test_user',
    password: process.env.DBPASSWORD || 'your_test_password',
    database: process.env.DBNAME || 'your_test_db',
    host: process.env.DBHOST || '127.0.0.1',
    port: process.env.DBPORT || '3306',
    dialect: 'mysql'
  },
  production: {
    username: process.env.DBUSER || 'your_prod_user',
    password: process.env.DBPASSWORD || 'your_prod_password',
    database: process.env.DBNAME || 'your_prod_db',
    host: process.env.DBHOST || '127.0.0.1',
    port: process.env.DBPORT || '3306',
    dialect: 'mysql'
  }
};
