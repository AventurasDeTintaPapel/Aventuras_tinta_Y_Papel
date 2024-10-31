import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function ProductForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    phone: "",
    price: "",
    imagen: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", content: "" });

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });

    const token = localStorage.getItem("token"); // Obtiene el token de autenticación
    try {
      const response = await fetch("http://localhost:3400/api/publics/cargar", {
        method: "POST",
        headers: {
          token: token,
        },
        body: submitData,
      });

      if (response.ok) {
        const result = await response.json();
        setMessage({ type: "success", content: "Producto creado exitosamente!" });
        setShowAlert(true);
        setFormData({ title: "", description: "", phone: "", price: "", imagen: null });

        setTimeout(() => {
          setShowAlert(false);
          navigate("/listado");
        }, 2000);
      } else {
        const error = await response.json();
        setMessage({ type: "error", content: error.message || "Error al crear el producto." });
      }
    } catch (error) {
      console.error("Error durante la solicitud:", error);
      setMessage({ type: "error", content: "Error en la conexión con el servidor." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md relative">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Añadir producto para intercambio</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Título
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingrese el título del producto"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingrese la descripción del producto"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Contacto
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingrese su numero de contacto"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Precio
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              pattern="^\d*\.?\d*$"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingrese el precio del producto"
            />
          </div>
          <div>
            <label htmlFor="imagen" className="block text-sm font-medium text-gray-700 mb-1">
              Imagen
            </label>
            <input
              type="file"
              id="imagen"
              name="imagen"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-300 ease-in-out disabled:opacity-50"
          >
            {isSubmitting ? "Añadiendo producto" : "Añadir producto"}
          </button>
        </form>

        {message.content && showAlert && (
          <div
            className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-4 text-lg rounded-lg shadow-lg text-center z-50
            ${message.type === "success" ? "bg-purple-500 text-white" : "bg-red-500 text-white"}`}
          >
            {message.content}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
