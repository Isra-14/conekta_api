const config = require("../config/db.config.js")

const Sequelize = require("sequelize")
if (process.env.NODE_ENV === "test") 
  config.DATABASE = config.TEST_DATABASE

const sequelize = new Sequelize(config.DATABASE, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  logging:
    process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test"
      ? false
      : console.log,
  operatorsAliases: 0,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

module.exports = db
