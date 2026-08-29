const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/Usuario')

const router = express.Router()

// POST - iniciar sesión
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body

    const usuario = await Usuario.findOne({
      where: { email }
    })

    if (!usuario) {
      return res.status(401).json({
        mensaje: 'Correo o contraseña incorrectos'
      })
    }

    const passwordCorrecta = await bcrypt.compare(
      password,
      usuario.password
    )

    if (!passwordCorrecta) {
      return res.status(401).json({
        mensaje: 'Correo o contraseña incorrectos'
      })
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h'
      }
    )

    res.json({
      mensaje: 'Login exitoso',
      token
    })

  } catch (error) {
    res.status(500).json({
      mensaje: 'Error en el login',
      error: error.message
    })
  }
})

module.exports = router