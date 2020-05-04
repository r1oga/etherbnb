const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true,
    rejectUnauthorized: false
  }
})

module.exports = sequelize
