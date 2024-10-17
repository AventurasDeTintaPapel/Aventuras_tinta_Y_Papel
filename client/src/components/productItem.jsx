import React from 'react';
import { updateProduct, deleteProduct } from '../../services/productService';

const ProductItem = ({ product }) => {
  const handleEdit = async () => {
    const updatedData = { ...product, title: 'Nuevo Título' };
    const result = await updateProduct(product._id, updatedData);
    if (result.success) {
      // Producto actualizado exitosamente
    } else {
      // Manejar error
    }
  };

  const handleDelete = async () => {
    const result = await deleteProduct(product._id);
    if (result.success) {
      // Producto eliminado exitosamente
    } else {
      // Manejar error
    }
  };

  return (
    <div>
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>Precio: ${product.price}</p>
      <p>Tipo: {product.type}</p>
      {product.image && (
        <img src={product.image} alt={product.title} style={{ width: '200px' }} />
      )}
      <button onClick={handleEdit}>Editar</button>
      <button onClick={handleDelete}>Eliminar</button>
    </div>
  );
};

export default ProductItem;
