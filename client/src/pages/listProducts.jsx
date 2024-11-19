'use client'

import React, { useEffect, useState } from "react"
import axios from "axios"

export default function ProductList() {
  const [publications, setPublications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    axios
      .get("http://localhost:3400/api/publics/getPublication", {
        headers: { token: token },
      })
      .then((response) => {
        console.log('Respuesta de la API:', response); // Verifica la respuesta completa
        setPublications(response.data.getPublics)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching publications:", error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="h-64 bg-gray-300" />
            <div className="p-6">
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-4" />
              <div className="h-8 bg-gray-300 rounded w-1/2 mb-4" />
              <div className="h-4 bg-gray-300 rounded w-full mb-4" />
              <div className="h-4 bg-gray-300 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (publications.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-xl text-gray-500">No hay publicaciones disponibles en este momento</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4 justify-items-center gap-0">
      {publications.map((publication) => {
        console.log('Teléfono:', publication.phone);
        // Verifica si publication.phone existe antes de intentar usar .replace()
        let phone = publication.phone; // Limpiar cualquier carácter no numérico
        console.log('Phone:', phone); // Verifica el valor de `phone` recibido

        // Si phone tiene 10 o más dígitos, entonces es un número válido, en caso contrario se muestra "No disponible"
        const whatsappLink =  `https://wa.me/549${phone}`; // Si no es un número válido, no se crea el enlace
        console.log('Enlace de WhatsApp:', whatsappLink);

        return (
          <div
          key={publication._id}
          className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg flex flex-col w-64 h-[35rem] m-2"
        >
          <img
            src={publication.imagen}
            alt={publication.title}
            className="w-full h-4/5 object-cover"
          />
          <div className="p-4 flex-grow flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2 truncate">
                Titulo: {publication.title}
              </h3>
              <p className="text-lg font-semibold mb-2 truncate">
                Precio: ${publication.price}
              </p>
            </div>
            <div>
              <div className="flex items-center mb-2 text-sm text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a href={whatsappLink} target="_blank" className="text-blue-500">
                  Contacto: <span>{phone}</span>
                </a>
              </div>
              <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 inline mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                {publication.type}
              </div>
            </div>
          </div>
        </div>
        
        );
            
      })}
    </div>
  )
}
