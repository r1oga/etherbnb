const Sequelize = require('sequelize')
const sequelize = require('../db')

class Flat extends Sequelize.Model {}

Flat.init(
  {
    id: { type: Sequelize.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    host: { type: Sequelize.DataTypes.INTEGER, allowNull: false },
    picture: { type: Sequelize.DataTypes.STRING, allowNull: false },
    type: { type: Sequelize.DataTypes.STRING, allowNull: false },
    town: { type: Sequelize.DataTypes.STRING, allowNull: false },
    title: { type: Sequelize.DataTypes.STRING, allowNull: false },
    nightPrice: { type: Sequelize.DataTypes.INTEGER, allowNull: false },
    superhost: { type: Sequelize.DataTypes.BOOLEAN, allowNull: false },
    description: { type: Sequelize.DataTypes.TEXT },
    guests: { type: Sequelize.DataTypes.INTEGER, allowNull: false },
    bedrooms: { type: Sequelize.DataTypes.INTEGER, allowNull: false },
    beds: { type: Sequelize.DataTypes.INTEGER, allowNull: false },
    bathrooms: { type: Sequelize.DataTypes.INTEGER, allowNull: false },
    entirePlace: { type: Sequelize.DataTypes.BOOLEAN, allowNull: false },
    // amenities
    wifi: { type: Sequelize.DataTypes.BOOLEAN, allowNull: false },
    kitchen: { type: Sequelize.DataTypes.BOOLEAN, allowNull: false },
    airConditioning: { type: Sequelize.DataTypes.BOOLEAN, allowNull: false },
    freeParking: { type: Sequelize.DataTypes.BOOLEAN, allowNull: false },
    superhost: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  },
  {
    sequelize,
    modelName: 'flat',
    timestamps: false
  }
)

module.exports = Flat
