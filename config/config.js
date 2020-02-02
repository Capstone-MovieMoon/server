const dotenv=require('dotenv')

dotenv.config()
//index에서 config[env]이런식으로 env정보를 보내줘야한다.
module.exports={
  development: {
  username: "root",
    password:process.env.DB_PASSWORD, //process.env 를 쓰기위해 dotenv 미들웨어사용
    database: 'test1',
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: false
  },
  test: {
    username: "root",
    password:process.env.DB_PASSWORD,
    database: "test1",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: false
  },
  production: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "\test1",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: false
  }
}
