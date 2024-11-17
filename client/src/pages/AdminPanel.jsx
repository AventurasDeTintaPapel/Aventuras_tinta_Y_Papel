import React, { useState, useEffect } from "react";
import { PlusCircle, Edit2, Trash2 } from "lucide-react";
import AdminProductForm from "../components/AdminProductForm";

const AdminPanel = () => {
  const [productos, setProductos] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    // Cargar lista de productos al montar el componente
    fetch("http://localhost:3400/api/productos", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleDelete = (id) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este producto?")
    ) {
      fetch(`http://localhost:3400/api/productos/eliminar/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.msg);
          setProductos(productos.filter((producto) => producto._id !== id));
        })
        .catch((error) => console.error("Error deleting product:", error));
    }
  };

  const handleEdit = (id) => {
    setSelectedProductId(id);
    setIsFormVisible(true);
  };

  const handleAddProduct = () => {
    setSelectedProductId(null);
    setIsFormVisible(true);
  };

  const handleFormSubmit = () => {
    // Vuelve a cargar los productos después de agregar/editar
    fetch("http://localhost:3400/api/productos", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error fetching products:", error));
    setIsFormVisible(false);
    setSelectedProductId(null); // Limpiar el id seleccionado
  };

  const handleCancel = () => {
    setIsFormVisible(false); // Oculta el formulario sin realizar cambios
    setSelectedProductId(null); // Limpiar el id seleccionado
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
            Panel de Administrador
          </h1>
          <button
            onClick={handleAddProduct}
            className="mb-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300 ease-in-out flex items-center"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Agregar un nuevo producto
          </button>

          {isFormVisible && (
            <div className="mb-8 p-6 bg-gray-50 rounded-lg shadow-inner">
              <AdminProductForm
                productId={selectedProductId}
                onFormSubmit={handleFormSubmit}
                onCancel={handleCancel} // Pasa la función handleCancel aquí
              />
            </div>
          )}

          <h2 className="text-2xl font-bold mb-6 text-gray-700">Productos</h2>
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Imagen
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Título
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {productos.map((producto) => (
                  <tr
                    key={producto._id}
                    className="hover:bg-gray-50 transition duration-150 ease-in-out"
                  >
                    {producto.imagen && (
                      <img
                        src={producto.imagen}
                        alt={producto.titulo}
                        className="w-36 h-36 object-cover  mr-4"
                      />
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {producto.titulo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {producto.tipo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${producto.precio.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {producto.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(producto._id)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4 transition duration-150 ease-in-out"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(producto._id)}
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
      </div>
    </div>
  );
};

export default AdminPanel;
