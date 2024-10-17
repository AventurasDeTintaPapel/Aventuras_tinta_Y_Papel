import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../services/productService.jsx';
import ProductItem from './productItem.jsx';

const ProductList = () => {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const getProducts = async () => {
        // Obtén el token del almacenamiento local
        const token = localStorage.getItem('token'); // Cambia esto si usas otro método para almacenar el token
        
        try {
          // Llama a fetchProducts y pasa el token
          const result = await fetchProducts(token); // Modifica fetchProducts para aceptar el token
          setProducts(result.products);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
      getProducts();
    }, []);
  
    return (
      <div>
        {products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    );
  };
  
  export default ProductList;
