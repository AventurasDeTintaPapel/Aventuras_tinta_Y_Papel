import React, { useState, useEffect } from 'react';
import { updateProduct, fetchProducts } from '../../services/productService.jsx';

const EditProduct = ({ productId, onProductUpdated }) => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
  });

  useEffect(() => {
    // Cargar el producto actual para editar
    const loadProduct = async () => {
      try {
        const result = await fetchProducts(); // Asumiendo que fetchProducts devuelve todos los productos
        const productToEdit = result.products.find(p => p._id === productId);
        setProduct(productToEdit);
      } catch (error) {
        console.error('Error al cargar el producto:', error);
      }
    };
    loadProduct();
  }, [productId]);

  const handleInputChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(productId, product);
      onProductUpdated(); // Callback para actualizar la lista en el componente padre
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={product.title}
        onChange={handleInputChange}
        placeholder="Nombre del producto"
      />
      <textarea
        name="description"
        value={product.description}
        onChange={handleInputChange}
        placeholder="Descripción del producto"
      />
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleInputChange}
        placeholder="Precio"
      />
      <button type="submit">Actualizar producto</button>
    </form>
  );
};

export default EditProduct;
