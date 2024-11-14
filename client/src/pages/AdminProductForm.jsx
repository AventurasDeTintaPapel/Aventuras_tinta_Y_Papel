import React, { useState, useEffect } from "react";

export function AdminProductForm({ onSave, onCancel, initialData }) {
  const [product, setProduct] = useState({
    titulo: initialData?.titulo || "",
    autor: initialData?.autor || "",
    descripcion: initialData?.descripcion || "",
    numeroEdicion: initialData?.numeroEdicion || "",
    tipo: initialData?.tipo || "",
    idioma: initialData?.idioma || "",
    precio: initialData?.precio || "",
    stock: initialData?.stock || "",
    categoria: initialData?.categoria || "",
    imagen: null, // Iniciar como null, ya que se gestionará como un archivo
  });

  useEffect(() => {
    if (initialData && initialData.imagen) {
      setProduct((prevState) => ({
        ...prevState,
        imagen: initialData.imagen,
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setProduct({ ...product, imagen: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(product);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{initialData ? "Editar Producto" : "Agregar Producto"}</h2>

      <div className="mb-4">
        <input
          type="text"
          name="titulo"
          placeholder="Titulo"
          value={product.titulo}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          name="autor"
          placeholder="Autor"
          value={product.autor}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <textarea
          type="text"
          name="descripcion"
          placeholder="Descripcion"
          value={product.descripcion}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
        />
      </div>

      <div className="mb-4">
        <input
          type="number"
          name="numeroEdicion"
          placeholder="Numero de edicion"
          value={product.numeroEdicion}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          name="tipo"
          placeholder="Tipo"
          value={product.tipo}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          name="idioma"
          placeholder="Idioma"
          value={product.idioma}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={product.precio}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={product.stock}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          name="categoria"
          placeholder="Categoria"
          value={product.categoria}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imagen">
          Imagen:
        </label>
        <input
          type="file"
          id="imagen"
          name="imagen"
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
