const express = require('express')
const Libro = require('../models/Libro')
const verificarToken = require('../middleware/auth')

const router = express.Router()

// GET - obtener todos los libros
router.get('/', verificarToken, async (req, res) => {
  try {
    const libros = await Libro.findAll()

    res.json(libros)
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener los libros',
      error: error.message,
    })
  }
})

// POST - crear un libro
router.post('/', verificarToken, async (req, res) => {
  try {
    const { titulo, autor, anio, disponible } = req.body

    const libro = await Libro.create({
      titulo,
      autor,
      anio,
      disponible,
    })

    res.status(201).json(libro)
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al crear el libro',
      error: error.message,
    })
  }
})

// PUT - actualizar un libro
router.put('/:id', verificarToken, async (req, res) => {
  try {
    const { id } = req.params
    const { titulo, autor, anio, disponible } = req.body

    const libro = await Libro.findByPk(id)

    if (!libro) {
      return res.status(404).json({
        mensaje: 'Libro no encontrado',
      })
    }

    await libro.update({
      titulo,
      autor,
      anio,
      disponible,
    })

    res.json(libro)
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al actualizar el libro',
      error: error.message,
    })
  }
})

// DELETE - eliminar un libro
router.delete('/:id', verificarToken, async (req, res) => {
  try {
    const { id } = req.params

    const libro = await Libro.findByPk(id)

    if (!libro) {
      return res.status(404).json({
        mensaje: 'Libro no encontrado',
      })
    }

    await libro.destroy()

    res.json({
      mensaje: 'Libro eliminado correctamente',
    })
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al eliminar el libro',
      error: error.message,
    })
  }
})

module.exports = router