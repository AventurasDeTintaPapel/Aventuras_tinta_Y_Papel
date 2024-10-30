import React, { useState } from 'react';
import { deleteProduct, updateProduct } from '../../services/productService.jsx';

const ProductItem = ({ product, onProductDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    title: product.title,
    description: product.description,
    price: product.price,
    phone: product.phone,
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

  // Activa el modo de edición
  const handleEditClick = () => {
    setIsEditing(true);
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
    <div className="product-card bg-white p-6 rounded-lg shadow-md">
      {isEditing ? (
        <div>
          {/* Modo de edición */}
          <input
            type="text"
            name="title"
            value={editedProduct.title}
            onChange={handleChange}
            className="border p-2 w-full mb-2 rounded"
            placeholder="Nombre del producto"
          />
          <input
            type="text"
            name="description"
            value={editedProduct.description}
            onChange={handleChange}
            className="border p-2 w-full mb-2 rounded"
            placeholder="Descripción"
          />
          <input
            type="number"
            name="price"
            value={editedProduct.price}
            onChange={handleChange}
            className="border p-2 w-full mb-2 rounded"
            placeholder="Precio"
          />
          <input
            type="text"
            name="imagen"
            value={editedProduct.imagen}
            onChange={handleChange}
            className="border p-2 w-full mb-2 rounded"
            placeholder="URL de la imagen"
          />
          <button
            onClick={handleSaveClick}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
          >
            Guardar
          </button>
        </div>
      ) : (
        <div>
          {/* Modo de visualización */}
          <img src={product.imagen} alt={product.title} className="product-image w-full h-48 object-cover rounded-md mb-4" />
          <h2 className="text-xl font-bold mb-2">{product.title}</h2>
          <p className="text-gray-700 mb-2">{product.description}</p>
          <span className="text-purple-500 font-semibold text-lg">${product.price}</span>
          <div className="flex space-x-2 mt-4">
            <button
              onClick={handleEditClick}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
              Editar
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductItem;
