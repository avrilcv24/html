const express = require('express')
const Usuario = require('../models/Usuario')
const verificarToken = require('../middleware/auth')

const router = express.Router()

// GET - obtener todos los usuarios
router.get('/', verificarToken, async (req, res) => {
  try {
    const usuarios = await Usuario.findAll()

    res.json(usuarios)
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener los usuarios',
      error: error.message,
    })
  }
})

// POST - crear un usuario
router.post('/', verificarToken, async (req, res) => {
  try {
    const { nombre, email, password } = req.body

    const usuario = await Usuario.create({
      nombre,
      email,
      password,
    })

    res.status(201).json(usuario)
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al crear el usuario',
      error: error.message,
    })
  }
})

// PUT - actualizar un usuario
router.put('/:id', verificarToken, async (req, res) => {
  try {
    const { id } = req.params
    const { nombre, email, password } = req.body

    const usuario = await Usuario.findByPk(id)

    if (!usuario) {
      return res.status(404).json({
        mensaje: 'Usuario no encontrado',
      })
    }

    await usuario.update({
      nombre,
      email,
      password,
    })

    res.json(usuario)
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al actualizar el usuario',
      error: error.message,
    })
  }
})

// DELETE - eliminar un usuario
router.delete('/:id', verificarToken, async (req, res) => {
  try {
    const { id } = req.params

    const usuario = await Usuario.findByPk(id)

    if (!usuario) {
      return res.status(404).json({
        mensaje: 'Usuario no encontrado',
      })
    }

    await usuario.destroy()

    res.json({
      mensaje: 'Usuario eliminado correctamente',
    })
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al eliminar el usuario',
      error: error.message,
    })
  }
})

module.exports = router