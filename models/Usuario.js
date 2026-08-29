const { DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')

const sequelize = require('../database')

const Usuario = sequelize.define('Usuario', {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

})

// Encriptar contraseña antes de crear un usuario
Usuario.beforeCreate(async (usuario) => {
  usuario.password = await bcrypt.hash(usuario.password, 10)
})

module.exports = Usuario