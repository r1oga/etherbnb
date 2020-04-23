import { Sequelize, Model, DataTypes } from 'sequelize'
import { user, password, host, database } from './db'

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: 'postgres',
  logging: false
})

export class User extends Model {}

User.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { sequelize, modelName: 'user', timestamps: false })
