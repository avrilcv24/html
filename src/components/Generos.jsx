function Generos({ seleccionarGenero }) {
  const generos = [
    { id: 28, nombre: 'Acción' },
    { id: 12, nombre: 'Aventura' },
    { id: 35, nombre: 'Comedia' },
    { id: 27, nombre: 'Terror' },
    { id: 878, nombre: 'Ciencia ficción' },
    { id: 18, nombre: 'Drama' },
  ]

  return (
    <section id="generos">
      <h2>Explora por género</h2>

      <div className="generos">
        {generos.map((genero) => (
          <button
            type="button"
            key={genero.id}
            onClick={() => seleccionarGenero(genero)}
          >
            {genero.nombre}
          </button>
        ))}
      </div>
    </section>
  )
}

export default Generos