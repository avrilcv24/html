const { DataTypes } = require('sequelize')
const sequelize = require('../database')

const Prestamo = sequelize.define('Prestamo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  libroId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  fechaPrestamo: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },

  fechaDevolucion: {
    type: DataTypes.DATE,
    allowNull: true,
  },
})

module.exports = Prestamo