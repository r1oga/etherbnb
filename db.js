const Sequelize = require('sequelize')

const sequelize = new Sequelize('rbnb', 'r1oga', 'r1oga', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
})

module.exports = sequelize
