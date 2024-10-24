import React, { useState } from 'react';
import { deleteProduct, updateProduct } from '../../services/productService.jsx';

const ProductItem = ({ product, onProductDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    title: product.title,
    description: product.description,
    price: product.price,
    imagen: product.imagen,
  });

  // Maneja la eliminación de un producto
  const handleDelete = async () => {
    try {
      await deleteProduct(product._id);
      onProductDeleted(); // Llamamos a la función para actualizar la lista
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  // Maneja el modo de edición
  const handleEditClick = () => {
    setIsEditing(true); // Activa el modo de edición
  };

  // Guarda los cambios al editar
  const handleSaveClick = async () => {
    try {
      await updateProduct(product._id, editedProduct); // Llamada al servicio para actualizar
      setIsEditing(false); // Desactiva el modo de edición
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };

  // Maneja el cambio de valores en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value,
    });
  };

  return (
    <div className="product-card">
      {isEditing ? (
        <div>
          {/* Modo de edición */}
          <input
            type="text"
            name="title"
            value={editedProduct.title}
            onChange={handleChange}
            placeholder="Nombre del producto"
          />
          <input
            type="text"
            name="description"
            value={editedProduct.description}
            onChange={handleChange}
            placeholder="Descripción"
          />
          <input
            type="number"
            name="price"
            value={editedProduct.price}
            onChange={handleChange}
            placeholder="Precio"
          />
          <input
            type="text"
            name="imagen"
            value={editedProduct.imagen}
            onChange={handleChange}
            placeholder="URL de la imagen"
          />
          {/* Botón para guardar los cambios */}
          <button onClick={handleSaveClick}>Guardar</button>
        </div>
      ) : (
        <div>
          {/* Modo de visualización */}
          <img src={product.imagen} alt={product.title} className="product-image" />
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <span>${product.price}</span>
          <button onClick={handleEditClick}>Editar</button>
          <button onClick={handleDelete}>Eliminar</button>
        </div>
      )}
    </div>
  );
};

export default ProductItem;
