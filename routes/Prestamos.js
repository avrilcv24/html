const express = require('express')
const Prestamo = require('../models/Prestamo')
const verificarToken = require('../middleware/auth')

const router = express.Router()

// GET - obtener todos los prestamos
router.get('/', verificarToken, async (req, res) => {
  try {
    const prestamos = await Prestamo.findAll()

    res.json(prestamos)
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener los prestamos',
      error: error.message,
    })
  }
})

// POST - crear un prestamo
router.post('/', verificarToken, async (req, res) => {
  try {
    const { usuarioId, libroId, fechaPrestamo, fechaDevolucion } = req.body

    const prestamo = await Prestamo.create({
      usuarioId,
      libroId,
      fechaPrestamo,
      fechaDevolucion,
    })

    res.status(201).json(prestamo)
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al crear el prestamo',
      error: error.message,
    })
  }
})

// PUT - actualizar un prestamo
router.put('/:id', verificarToken, async (req, res) => {
  try {
    const { id } = req.params
    const { usuarioId, libroId, fechaPrestamo, fechaDevolucion } = req.body

    const prestamo = await Prestamo.findByPk(id)

    if (!prestamo) {
      return res.status(404).json({
        mensaje: 'Prestamo no encontrado',
      })
    }

    await prestamo.update({
      usuarioId,
      libroId,
      fechaPrestamo,
      fechaDevolucion,
    })

    res.json(prestamo)
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al actualizar el prestamo',
      error: error.message,
    })
  }
})

// DELETE - eliminar un prestamo
router.delete('/:id', verificarToken, async (req, res) => {
  try {
    const { id } = req.params

    const prestamo = await Prestamo.findByPk(id)

    if (!prestamo) {
      return res.status(404).json({
        mensaje: 'Prestamo no encontrado',
      })
    }

    await prestamo.destroy()

    res.json({
      mensaje: 'Prestamo eliminado correctamente',
    })
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al eliminar el prestamo',
      error: error.message,
    })
  }
})

module.exports = router