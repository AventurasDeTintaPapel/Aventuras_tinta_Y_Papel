import React, { useState, useEffect } from "react";   
import { Save, X } from 'lucide-react';

const AdminProductForm = ({ productId, onFormSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    descripcion: "",
    numeroEdicion: "",
    tipo: "",
    idioma: "",
    precio: "",
    stock: "",
    categoria: "",
    imagen: null, 
  });

  useEffect(() => {
    if (productId) {
      fetch(`http://localhost:3400/api/productos/${productId}`, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((product) => {
          setFormData({
            titulo: product.titulo,
            autor: product.autor,
            descripcion: product.descripcion,
            numeroEdicion: product.numeroEdicion,
            tipo: product.tipo,
            idioma: product.idioma,
            precio: product.precio,
            stock: product.stock,
            categoria: product.categoria,
            imagen: product.imagen,
          });
        })
        .catch((error) => console.error("Error fetching product:", error));
    }
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      imagen: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      dataToSend.append(key, formData[key]);
    });

    const url = productId ? `http://localhost:3400/api/productos/editar/${productId}` : "http://localhost:3400/api/productos/cargar";
    const method = productId ? "PUT" : "POST";

    fetch(url, {
      method,
      body: dataToSend,
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        alert(productId ? "Producto actualizado correctamente" : "Producto cargado correctamente");
        onFormSubmit(); // Llamar función para actualizar lista de productos
      })
      .catch((error) => console.error("Error submitting product:", error));
  };

  const handleCancel = () => {
    setFormData({
      titulo: "",
      autor: "",
      descripcion: "",
      numeroEdicion: "",
      tipo: "",
      idioma: "",
      precio: "",
      stock: "",
      categoria: "",
      imagen: null,
    });

    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-purple-800 mb-6">
        {productId ? 'Editar Producto' : 'Agregar Producto'}
      </h2>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">Titulo</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label htmlFor="autor" className="block text-sm font-medium text-gray-700">Autor</label>
          <input
            type="text"
            id="autor"
            name="autor"
            value={formData.autor}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripcion</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label htmlFor="numeroEdicion" className="block text-sm font-medium text-gray-700">Numero de edicion</label>
          <input
            type="text"
            id="numeroEdicion"
            name="numeroEdicion"
            value={formData.numeroEdicion}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div> 
  <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo</label>
  <select
    id="tipo"
    name="tipo"
    value={formData.tipo}
    onChange={handleChange}
    required
    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
  >
    <option value="">Seleccione una opción</option>
    <option value="libro">Libro</option>
    <option value="manga">Manga</option>
    <option value="comic">Cómic</option>
    <option value="mercancia">Mercancía</option>
  </select>
</div>

        <div>
          <label htmlFor="idioma" className="block text-sm font-medium text-gray-700">Idioma</label>
          <input
            type="text"
            id="idioma"
            name="idioma"
            value={formData.idioma}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label htmlFor="precio" className="block text-sm font-medium text-gray-700">Precio</label>
          <input
            type="number"
            id="precio"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Categoria</label>
          <input
            type="text"
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="imagen" className="block text-sm font-medium text-gray-700">Imagen</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-purple-50 file:text-purple-700
              hover:file:bg-purple-100"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-8">
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center"
        >
          <X className="mr-2 h-5 w-5" /> Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center"
        >
          <Save className="mr-2 h-5 w-5" /> {productId ? 'Actualizar' : 'Guardar'}
        </button>
      </div>
    </form>
  );
};

export default AdminProductForm;
