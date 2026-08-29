import { useEffect, useState } from 'react'

function Peliculas({ generoSeleccionado }) {
  const [peliculas, setPeliculas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const obtenerPeliculas = async () => {
      setCargando(true)
      setError('')

      try {
        let url

        if (generoSeleccionado) {
          url = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=es-MX&with_genres=${generoSeleccionado.id}&sort_by=popularity.desc&page=1`
        } else {
          url = `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=es-MX&page=1`
        }

        const respuesta = await fetch(url)

        if (!respuesta.ok) {
          throw new Error('No se pudieron obtener las películas')
        }

        const datos = await respuesta.json()

        setPeliculas(datos.results)
      } catch (error) {
        setError('No se pudieron cargar las películas.')
        console.error(error)
      } finally {
        setCargando(false)
      }
    }

    obtenerPeliculas()
  }, [generoSeleccionado])

  return (
    <section id="peliculas">
      <h2>
        {generoSeleccionado
          ? `Películas de ${generoSeleccionado.nombre}`
          : 'Películas populares'}
      </h2>

      {cargando && <p>Cargando películas...</p>}

      {error && <p>{error}</p>}

      {!cargando && !error && (
        <div className="peliculas-grid">
          {peliculas.map((pelicula) => (
            <article className="pelicula" key={pelicula.id}>
              <img
                src={
                  pelicula.poster_path
                    ? `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`
                    : 'https://via.placeholder.com/500x750?text=Sin+imagen'
                }
                alt={pelicula.title}
              />

              <div className="pelicula-info">
                <h3>{pelicula.title}</h3>

                <p>
                  Estreno:{' '}
                  {pelicula.release_date || 'Fecha no disponible'}
                </p>

                <p>
                  Calificación: ⭐ {pelicula.vote_average.toFixed(1)}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Peliculas