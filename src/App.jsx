import { useState, useEffect } from 'react'
import './App.css'

import Inicio from './components/Inicio'
import Peliculas from './components/Peliculas'
import Generos from './components/Generos'
import Contacto from './components/Contacto'

function App() {
  const [generoSeleccionado, setGeneroSeleccionado] = useState(null)

  useEffect(() => {
    if (generoSeleccionado) {
      document
        .getElementById('peliculas')
        ?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [generoSeleccionado])

  return (
    <div>
      <header>
        <h1>CineVerse</h1>

        <nav>
          <a href="#inicio">Inicio</a>
          <a href="#peliculas">Películas</a>
          <a href="#generos">Géneros</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </header>

      <main>
        <Inicio />

        <Peliculas generoSeleccionado={generoSeleccionado} />

        <Generos seleccionarGenero={setGeneroSeleccionado} />

        <Contacto />
      </main>
    </div>
  )
}

export default App