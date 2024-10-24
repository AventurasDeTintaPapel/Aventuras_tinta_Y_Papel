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
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.title}</div>
                <p className="text-gray-700 text-base">{product.description}</p>
              </div>
              <div className="px-6 pt-4 pb-2 flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">${product.price?.toFixed(2)}</span>
                {product.rating && (
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-gray-600">{product.rating.toFixed(1)}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
