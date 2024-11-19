'use client'

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
    nombre: '',
    email: '',
    mensaje: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Formulario enviado:', formData)
    // Aquí normalmente enviarías los datos al servidor
  }

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
          <h2 className="mb-4 text-2xl font-bold text-purple-900">INGRESE SU DUDA O QUEJA:</h2>

          <LabelInput nombreCampo="Nombre y apellido:" relacionId="nombre" onChange={handleChange} />
          <LabelInput nombreCampo="Correo Electrónico:" relacionId="email" type="email" onChange={handleChange} />

          <div className="mb-4">
            <label htmlFor="mensaje" className="mb-2 block text-sm font-medium text-purple-900">
              Mensaje:
            </label>
            <textarea
              id="mensaje"
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
    </main>
  )
}