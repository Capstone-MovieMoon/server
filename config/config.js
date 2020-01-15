const dotenv = require('dotenv');

dotenv.config();


module.exports = {
  "development": {
    "username": "root",
    "password": "111111",
    "database": "test1",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "test": {
    "username": "root",
    "password": "111111",
    "database": "test1",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": "root",
    "password": "111111",
    "database": "test1",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  }
};