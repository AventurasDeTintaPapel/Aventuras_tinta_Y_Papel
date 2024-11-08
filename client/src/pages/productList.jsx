"use client";

import React, { useEffect, useState } from "react";
import { fetchProducts, deleteProduct, updateProduct } from "../../services/productService.jsx";
import { Header } from "../components/Header.jsx";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer.jsx";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isHovered, setIsHovered] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productData, setProductData] = useState({ title: "", description: "", price: "", phone: "", type: "", imagen: null });
  const [selectedFile, setSelectedFile] = useState(null);

  const IMAGE_BASE_URL = "http://localhost:3400";

  useEffect(() => {
    const getProducts = async () => {
      try {
        const result = await fetchProducts();
        if (result) {
          setProducts(result.getPublics);
        } else {
          setError("No token found. Please login.");
        }
      } catch (error) {
        setError("Error fetching products");
        console.error("Error fetching products:", error);
      }
    };
    getProducts();
  }, []);

  if (error) {
    return <p className="text-center text-red-500 text-xl mt-10">{error}</p>;
  }

  const handleDelete = async (_id) => {
    try {
      await deleteProduct(_id);
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== _id));
      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditClick = (_id) => {
    const productToEdit = products.find((product) => product._id === _id);

    if (productToEdit) {
      setEditingProduct(_id);
      setProductData({
        title: productToEdit.title,
        description: productToEdit.description,
        price: productToEdit.price,
        phone: productToEdit.phone,
        type: productToEdit.type,
        imagen: productToEdit.imagen || null,
      });
      setSelectedFile(null);
    } else {
      console.error("Product not found for editing.");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSaveEdit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", productData.title);
      formData.append("description", productData.description);
      formData.append("price", productData.price);
      formData.append("phone", productData.phone);
      formData.append("type", productData.type);

      if (selectedFile) {
        formData.append("file", selectedFile);
      } else if (productData.imagen) {
        formData.append("imagen", productData.imagen);
      }

      await updateProduct(editingProduct, formData);
      console.log("Product updated successfully");

      const updatedProducts = products.map((product) =>
        product._id === editingProduct
          ? { ...product, ...productData, imagen: selectedFile ? URL.createObjectURL(selectedFile) : product.imagen }
          : product
      );
      setProducts(updatedProducts);

      setEditingProduct(null);
      setProductData({ title: "", description: "", price: "", phone: "", type: "", imagen: null });
      setSelectedFile(null);
    } catch (error) {
      console.error("Error saving edited product:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto px- py-8">
        <h1 className="text-3xl font-bold text-center mb-8">PRODUCTOS PARA INTERCAMBIAR</h1>
        {products.length === 0 ? (
          <p className="text-center text-gray-500 text-xl">No hay productos disponibles o necesitas iniciar sesión.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="max-w-sm rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform hover:scale-105 relative"
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

                {editingProduct === product._id ? (
                  // Formulario de edición dentro de la tarjeta del producto
                  <div className="absolute inset-0 bg-white p-4 z-10 flex flex-col">
                    <h2 className="text-xl font-bold mb-2">Editar Producto</h2>
                    <div className="flex flex-col mb-2">
                      <label>Título</label>
                      <input
                        type="text"
                        value={productData.title}
                        onChange={(e) => setProductData({ ...productData, title: e.target.value })}
                        className="border p-1 rounded"
                      />
                    </div>
                    <div className="flex flex-col mb-2">
                      <label>Descripción</label>
                      <input
                        type="text"
                        value={productData.description}
                        onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                        className="border p-1 rounded"
                      />
                    </div>
                    <div className="flex flex-col mb-2">
                      <label>Tipo</label>
                      <input
                        type="text"
                        value={productData.type}
                        onChange={(e) => setProductData({ ...productData, type: e.target.value })}
                        className="border p-1 rounded"
                      />
                    </div>
                    <div className="flex flex-col mb-2">
                      <label>Precio</label>
                      <input
                        type="number"
                        value={productData.price}
                        onChange={(e) => setProductData({ ...productData, price: parseFloat(e.target.value) })}
                        className="border p-1 rounded"
                      />
                    </div>
                    <div className="flex flex-col mb-2">
                      <label>Contacto</label>
                      <input
                        type="text"
                        value={productData.phone}
                        onChange={(e) => setProductData({ ...productData, phone: e.target.value })}
                        className="border p-1 rounded"
                      />
                    </div>
                    <div className="flex flex-col mb-4">
                      <label>Seleccionar Imagen</label>
                      <input type="file" onChange={handleFileChange} className="border p-1 rounded" />
                    </div>
                    <div className="flex justify-between mt-2">
                      <button onClick={handleSaveEdit} className="bg-blue-500 text-white p-2 rounded">
                        Guardar
                      </button>
                      <button onClick={() => setEditingProduct(null)} className="text-red-500">
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  // Vista del producto si no está en edición
                  <div>
                    <div className="px-6 py-4 space-y-3">
                      <p className="font-bold text-xl mb-2">Titulo: {product.title}</p>
                      <p className="text-gray-700 text-base">Descripcion: {product.description}</p>
                      <p className="text-gray-700 text-base">Tipo: {product.type}</p>
                      <p className="text-gray-700 text-base">Contacto: {product.phone}</p>
                    </div>
                    <div className="px-6 pt-4 pb-2 flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900">Precio: ${product.price?.toFixed(2)}</span>
                      <div className="flex space-x-2">
                        <button onClick={() => handleEditClick(product._id)} className="bg-yellow-500 text-white p-1 rounded">
                          Editar
                        </button>
                        <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white p-1 rounded">
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
