'use client'

import React, { useEffect, useState } from 'react'
import { fetchProducts } from '../../services/productService.jsx'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)
  const [isHovered, setIsHovered] = useState(null)

  // Constante para la URL de las imágenes
  const IMAGE_BASE_URL = "http://localhost:3400";

  useEffect(() => {
    const getProducts = async () => {
      try {
        const result = await fetchProducts()
        if (result) {
          console.log('Fetched products:', result)
          setProducts(result.getPublics)
        } else {
          setError('No token found. Please login.')
        }
      } catch (error) {
        setError('Error fetching products')
        console.error('Error fetching products:', error)
      }
    }
    getProducts()
  }, [])

  if (error) {
    return <p className="text-center text-red-500 text-xl mt-10">{error}</p>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Productos para intercambiar</h1>
      {products.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">No hay productos disponibles o necesitas iniciar sesión.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            
            <div 
              key={product._id}
              className="max-w-sm rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform hover:scale-105"
              onMouseEnter={() => setIsHovered(product._id)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <div className="relative">
                <img 
                  className="w-full h-64 object-cover" 
                  src={product.imagen ? `${IMAGE_BASE_URL}${product.imagen}` : "/placeholder.svg?height=300&width=300"} 
                  
                  alt={product.title} 
                />
                
              </div>
              <div className="px-6 py-4 space-y-3">
                <p className="font-bold text-xl mb-2">{product.title}</p>
                <p className="text-gray-700 text-base">{product.description}</p>
                <p className="text-gray-700 text-base">Contacto: {product.phone}</p>
              </div>
              <div className="px-6 pt-4 pb-2 flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">${product.price?.toFixed(2)}</span>
                
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
