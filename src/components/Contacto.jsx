function Contacto() {
  return (
    <section id="contacto">
      <h2>Contacto</h2>

      <form>
        <input type="text" placeholder="Nombre" />

        <input
          type="email"
          placeholder="Correo electrónico"
        />

        <textarea placeholder="Escribe tu mensaje"></textarea>

        <button type="submit">Enviar mensaje</button>
      </form>
    </section>
  )
}

export default Contacto