import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../hook/useAlert";
import { Header } from "../components/Header";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export default function ProductForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    phone: "",
    price: "",
    type: "venta",
    imagen: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });
  const { Alerta, mostrarAlerta } = useAlert();
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagen" && files) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        imagen: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });

    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:3400/api/publics/cargar", {
        method: "POST",
        body: submitData,
        credentials: "include",
      });
      if (response.ok) {
        const result = await response.json();
        mostrarAlerta("Se subio correctamente su producto");
        setFormData({
          title: "",
          description: "",
          phone: "",
          price: "",
          type: "venta",
          imagen: null,
        });
        setImagePreview(null);

        setTimeout(() => {
          navigate("/listado");
        }, 2000);

        if (!result) {
          console.log("Los resultados enviados están mal");
        }
      } else {
        const error = await response.json();
      }
    } catch (error) {
      console.error("Error durante la solicitud:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_auto_1fr_auto] h-screen">
      <Header colAndrow={"col-span-2 row-start-1"} />
      <Nav colAndrow={"col-span-2 row-start-2"} />
      <aside className="col-start-1 row-start-3">
        <p className="font-poopins text-[2vw] pt-[1vw] text-[#3f2d51] pl-[1vw]">
          Añadir producto
        </p>
        <div className="p-[1vw]">
          <form
            onSubmit={handleSubmit}
            className="bg-[#ead8fc] p-[1vw] w-[25vw] space-y-[1vw]  text-[#3f2d51]"
          >
            <div className="font-baloo space-y-[0.5vw]">
              {/* Título */}
              <div>
                <label className=" text-[1.2vw]" htmlFor="title">
                  Título:
                </label>
                <input
                  className="w-full h-[2vw] text-[1.1vw] px-[0.5vw] rounded"
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Ingrese el título del producto"
                />
              </div>

              {/* Descripción */}
              <div>
                <label className=" text-[1.2vw]" htmlFor="description">
                  Descripción:
                </label>
                <textarea
                  className="w-full h-[3vw] text-[1.1vw] px-[0.5vw] rounded"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  placeholder="Ingrese la descripción del producto"
                />
              </div>

              {/* Contacto */}
              <div>
                <label className=" text-[1.2vw]" htmlFor="phone">
                  Contacto:
                </label>
                <input
                  className="w-full h-[2vw] text-[1.1vw] px-[0.5vw] rounded"
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Ingrese su número de contacto"
                />
              </div>

              {/* Tipo */}
              <div>
                <label className=" text-[1.2vw]" htmlFor="type">
                  Tipo:
                </label>
                <select
                  id="type"
                  name="type"
                  className="w-full h-[2vw] text-[1.1vw] px-[0.5vw] rounded"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="venta">Venta</option>
                  <option value="intercambio">Intercambio</option>
                </select>
              </div>

              {/* Precio */}
              <div>
                <label className=" text-[1.2vw]" htmlFor="price">
                  Precio:
                </label>
                <input
                  className="w-full h-[2vw] text-[1.1vw] px-[0.5vw] rounded"
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  pattern="^\d*\.?\d*$"
                  placeholder="Ingrese el precio del producto"
                />
              </div>

              {/* Campo de Imagen */}
              <div className="pt-[1vw]">
                <div className="relative">
                  <input
                    type="file"
                    id="imagen"
                    name="imagen"
                    onChange={handleChange}
                    className="absolute top-0 left-0 w-[11vw] h-full cursor-pointer opacity-0"
                    required
                  />
                  <button
                    type="button"
                    className="bg-[#dfc3fb] py-[0.5vw] px-[1vw] rounded text-[1.2vw]"
                  >
                    Seleccionar Imagen
                  </button>
                </div>
              </div>

              {/* Vista previa de la imagen */}
              {imagePreview && (
                <div>
                  <img
                    src={imagePreview}
                    alt="Vista previa de la imagen"
                    className="w-[20vw] h-[30vw]"
                  />
                </div>
              )}
            </div>

            <button
              className="bg-[#cbade9]  text-[1.4vw] w-full rounded py-[1vw] font-poopins tracking-wide"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Añadiendo producto" : "Añadir producto"}
            </button>
          </form>
        </div>
      </aside>
      {Alerta}

      <main className="col-start-2 row-start-3 bg-purple-100"></main>
      <Footer colAndrow={"col-span-2 row-start-4"} />
    </div>
  );
}
