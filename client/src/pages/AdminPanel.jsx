import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit2, Trash2 } from 'lucide-react';
import AdminProductForm from './AdminProductForm';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const IMAGE_BASE_URL = "http://localhost:3400"; // Cambiar esta URL si es necesario

  // Fetch products from the server
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3400/api/productos');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Delete a product
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3400/api/productos/eliminar/${id}`, {
        method: 'DELETE',
      });
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Set product for editing
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditing(true);
  };

  // Open the form to add a new product
  const handleAdd = () => {
    setSelectedProduct(null);
    setIsEditing(true);
  };

  // Save new or edited product
  const handleSave = async (product) => {
    const formData = new FormData();
    Object.keys(product).forEach((key) => {
      if (key === 'imagen') {
        formData.append(key, product.imagen);
      } else {
        formData.append(key, product[key]);
      }
    });

    try {
      if (selectedProduct) {
        // Update the selected product
        await fetch(`http://localhost:3400/api/productos/editar/${selectedProduct._id}`, {
          method: 'PUT',
          body: formData,
        });
      } else {
        // Create a new product
        await fetch('http://localhost:3400/api/productos/cargar', {
          method: 'POST',
          body: formData,
        });
      }
      setIsEditing(false); // Close the form
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex flex-col items-center justify-start py-4 px-2">
      <div className="w-full max-w-full px-2">
        <h1 className="text-4xl font-extrabold text-indigo-800 mb-4 text-center">Panel de Administrador</h1>
        <button 
          onClick={handleAdd}
          className="mb-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center justify-center w-full sm:w-auto"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Agregar un nuevo producto
        </button>
        {isEditing ? (
          <div className="bg-white rounded-lg shadow-xl p-6 mb-6 w-full">
            <AdminProductForm
              onSave={handleSave}
              onCancel={() => setIsEditing(false)}
              initialData={selectedProduct}
            />
          </div>
        ) : (
          <div className="bg-white shadow-xl rounded-lg overflow-hidden w-full">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-indigo-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Imagen</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Titulo</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Autor</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Tipo</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Precio</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-indigo-50 transition duration-150 ease-in-out">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <img
                          className="w-16 h-16 object-cover"
                          src={product.imagen ? `${IMAGE_BASE_URL}${product.imagen}` : "/placeholder.svg?height=300&width=300"}
                          
                          alt={product.titulo}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.titulo}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.autor}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.tipo}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.precio}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => handleEdit(product)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4 transition duration-150 ease-in-out"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(product._id)}
                          className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
