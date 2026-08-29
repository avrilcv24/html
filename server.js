const express = require('express')
const sequelize = require('./database')

const Usuario = require('./models/Usuario')
const Libro = require('./models/Libro')
const Prestamo = require('./models/Prestamo')

const usuariosRoutes = require('./routes/usuarios')
const librosRoutes = require('./routes/libros')
const prestamosRoutes = require('./routes/prestamos')
const loginRoutes = require('./routes/login')

const app = express()

app.use(express.json())

// Rutas
app.use('/api/usuarios', usuariosRoutes)
app.use('/api/libros', librosRoutes)
app.use('/api/prestamos', prestamosRoutes)
app.use('/api/login', loginRoutes)

app.get('/', (req, res) => {
  res.json({
    mensaje: 'API Biblioteca funcionando correctamente'
  })
})

const PORT = 3000

async function iniciarServidor() {
  try {
    await sequelize.authenticate()
    console.log('Conexión con PostgreSQL exitosa')

    await sequelize.sync()
    console.log('Tablas sincronizadas correctamente')

    app.listen(PORT, () => {
      console.log(`Servidor funcionando en http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Error al iniciar el servidor:')
    console.error(error)
  }
}

iniciarServidor()