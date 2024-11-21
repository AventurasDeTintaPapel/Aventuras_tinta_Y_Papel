import React, { useState } from 'react'

function LabelInput({ nombreCampo, relacionId, type = 'text', onChange }) {
  return (
    <div className="relative mb-4">
      <input
        type={type}
        id={relacionId}
        onChange={onChange}
        required
        className="peer w-full rounded-md border-b-2 border-violet-900 bg-white bg-opacity-70 p-2 text-purple-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-violet-600"
        placeholder={nombreCampo}
      />
      <label
        htmlFor={relacionId}
        className="absolute left-0 -top-5 text-sm text-purple-900 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-purple-900"
      >
        {nombreCampo}
      </label>
    </div>
  )
}

function P_infocontactos({ textSpan, textInfo }) {
  return (
    <p className="mb-2 list-item text-sm text-purple-900">
      <span className="font-bold">{textSpan}</span> {textInfo}
    </p>
  )
}

export default function Contactos() {
  const [formData, setFormData] = useState({
    email: '',
    body: '',
    asunto: '',
  })

  const [showAlert, setShowAlert] = useState(false); // Estado para mostrar la alerta

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Formulario enviado:', formData);

    try {
      const response = await fetch('http://localhost:3400/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          body: formData.body,
          asunto: formData.asunto,
        }),
        credentials: 'include',
      })

      const data = await response.json()

      if (response.ok) {
        // Si el correo se envió correctamente, mostrar la alerta
        setShowAlert(true);
      } else {
        alert('Hubo un error al enviar el correo');
      }
    } catch (error) {
      alert('Hubo un error al procesar tu solicitud');
    }
  };

  return (

    <main className="min-h-screen bg-gradient-to-br from-purple-100 to-violet-200 py-8 flex items-center justify-center">
      <div className="container mx-auto grid gap-8 px-4 md:grid-cols-2">
        
        <div className="space-y-6">
          <div>
            <h1 className="mb-4 text-3xl font-bold text-purple-900">Contáctanos</h1>
            <p className="text-base text-purple-800">
              <span className="font-semibold">Si necesitas información</span> sobre cualquiera de nuestros productos o
              si estás teniendo algún inconveniente con la compra o con la página, rellena nuestro formulario y nos
              pondremos en contacto lo antes posible.
            </p>
            <p className="mt-2 text-base font-semibold text-purple-800">¡Muchas Gracias!</p>
          </div>

          <div className="rounded-lg bg-white bg-opacity-50 p-4 shadow-md">
            <h2 className="mb-3 text-xl font-bold text-purple-900">Datos de Contacto:</h2>
            <ul className="list-inside list-disc space-y-1">
              <P_infocontactos textSpan="Sede central:" textInfo="Av. 25 de mayo 385 - Argentina-Formosa" />
              <P_infocontactos textSpan="Teléfono:" textInfo="+54 370 4568974" />
              <P_infocontactos textSpan="Email:" textInfo="info@aventuras.com.ar" />
            </ul>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-lg bg-white bg-opacity-70 p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-purple-900">INGRESE SU DUDA, QUEJA O SUGERENCIA:</h2>

          
          <LabelInput nombreCampo="Correo Electrónico:" relacionId="email" type="email" onChange={handleChange} />
          <div className="relative mb-4">
  <label
    htmlFor="asunto"
    className="absolute left-0 -top-5 text-sm text-purple-900 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-purple-900"
  >
    Asunto:
  </label>
  <select
    id="asunto"
    onChange={handleChange}
    required
    className="peer w-full rounded-md border-b-2 border-violet-900 bg-white bg-opacity-70 p-2 text-purple-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-violet-600"
  >
    <option value="" disabled selected>Seleccione una opción</option>
    <option value="duda">Duda</option>
    <option value="queja">Queja</option>
    <option value="sugerencia">Sugerencia</option>
  </select>
</div>

          <div className="mb-4">
            <label htmlFor="body" className="mb-2 block text-sm font-medium text-purple-900">
              Mensaje:
            </label>
            <textarea
              id="body"
              rows={4}
              required
              onChange={handleChange}
              className="w-full rounded-md border-2 border-violet-900 bg-white bg-opacity-70 p-2 text-purple-900 placeholder-gray-500 focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600"
              placeholder="Ingresa lo que nos quiera transmitir"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-violet-600 py-2 px-4 text-white transition duration-300 ease-in-out hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
          >
            Enviar
          </button>
        </form>
      </div>
          {/* Alerta personalizada */}
      {showAlert && (
        <div
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 max-w-md p-4 bg-purple-600 text-white rounded-lg shadow-lg flex items-center justify-between"
        >
          <p className="text-sm">
            Correo enviado con éxito, nos pondremos en contacto lo antes posible.
          </p>
          <button
            onClick={() => {
              setShowAlert(false); // Cerrar la alerta
              window.location.reload(); // Recargar la página
            }}
            className="ml-4 bg-violet-700 text-white rounded-md px-4 py-2 hover:bg-violet-800 focus:outline-none"
          >
            Aceptar
          </button>
        </div>
      )}
    </main>
  )
}
