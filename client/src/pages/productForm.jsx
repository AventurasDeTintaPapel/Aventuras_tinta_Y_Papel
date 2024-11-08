import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";

export default function ProductForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    phone: "",
    price: "",
    type: "", 
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
    console.log("Valor de type:", formData.type);
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
          "token": token // Incluir el token en los encabezados
        },
        body: submitData,
        credentials: "include",
      });
      if (response.ok) {
        const result = await response.json();
        setMessage({ type: "success", content: "Producto creado exitosamente!" });
        setShowAlert(true);
        setFormData({ title: "", description: "", phone: "", price: "", type: "venta", imagen: null });

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
      <aside className="row-start-3 col-start-1 bg-[#f3ecf9]">
        <div className="w-full h-[45vw] relative">
          <form onSubmit={handleSubmit} className="text-[#674771] flex px-[1.5vw] pb-[1vw] flex-col justify-around h-full">
            <p className="text-[2.5vw] tracking-wide font-breeSerif text-center">Añadir producto</p>

            <div>
              <label htmlFor="title" className="text-[1.5vw] font-breeSerif tracking-wide">Título:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full py-[0.3vw] px-[0.5vw] text-[1.3vw] border border-purple-300 rounded-[0.4vw] tracking-wide focus:outline-none focus:ring-2 focus:ring-[#674771]"
                placeholder="Ingrese el título del producto"
              />
            </div>

            <div>
              <label htmlFor="description" className="font-breeSerif text-[1.5vw] tracking-wide">Descripción:</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                className="w-full py-[0.3vw] px-[0.5vw] text-[1.3vw] border border-purple-300 rounded-[0.4vw] tracking-wide focus:outline-none focus:ring-2 focus:ring-[#674771]"
                placeholder="Ingrese la descripción del producto"
              />
            </div>

            <div>
              <label htmlFor="phone" className="text-[1.5vw] font-breeSerif tracking-wide">Contacto:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full py-[0.3vw] px-[0.5vw] text-[1.3vw] border border-purple-300 rounded-[0.4vw] tracking-wide focus:outline-none focus:ring-2 focus:ring-[#674771]"
                placeholder="Ingrese su numero de contacto"
              />
            </div>

            <div>
              <label htmlFor="type" className="text-[1.5vw] font-breeSerif tracking-wide">Tipo:</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full py-[0.3vw] px-[0.5vw] text-[1.3vw] border border-purple-300 rounded-[0.4vw] tracking-wide focus:outline-none focus:ring-2 focus:ring-[#674771]"
              >
                <option value="venta">Venta</option>
                <option value="intercambio">Intercambio</option>
              </select>
            </div>

            <div>
              <label htmlFor="price" className="text-[1.5vw] font-breeSerif tracking-wide">Precio:</label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                pattern="^\d*\.?\d*$"
                className="w-full py-[0.3vw] px-[0.5vw] text-[1.3vw] border border-purple-300 rounded-[0.4vw] tracking-wide focus:outline-none focus:ring-2 focus:ring-[#674771]"
                placeholder="Ingrese el precio del producto"
              />
            </div>

            <div>
              <label className="text-[1.5vw] font-breeSerif tracking-wide">Imagen:</label>
              <input
                type="file"
                id="imagen"
                name="imagen"
                onChange={handleChange}
                required
                className="w-full tracking-wide px-[0.4vw] bg-white rounded-[0.4vw] py-[0.5vw] font-breeSerif file:ring-[0.2vw] file:rounded-[0.3vw] file:border-none file:bg-white file:ring-[#674771] file:text-[#674771] file:mr-[1vw]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#775282] font-breeSerif text-white py-[0.5vw] rounded-[0.4vw] hover:bg-[#9465a2] text-[1.4vw] tracking-wider transition duration-300 ease-in-out"
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
      </aside>
      <main className="row-start-3 col-start-2"></main>
    </>
  );
}
