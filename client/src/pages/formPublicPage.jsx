import React, { useState, useEffect } from "react";
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
  const [imagePreview, setImagePreview] = useState(null);
  const [userPosts, setUserPosts] = useState([]); // Para guardar las publicaciones del usuario
  const [editingPostId, setEditingPostId] = useState(null); // ID del producto en edición

  const { Alerta, mostrarAlerta } = useAlert();
  const navigate = useNavigate();

  // Obtener publicaciones del usuario
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3400/api/publics/myPublics",
          {
            method: "GET",
            credentials: "include",
          }
        );
        console.log(response);
        if (response.ok) {
          const result = await response.json();
          setUserPosts(result.getPublics); // Guardar las publicaciones
        } else {
          console.error(
            "Error al obtener publicaciones:",
            await response.json()
          );
        }
      } catch (error) {
        console.error("Error en la solicitud de publicaciones:", error);
      }
    };

    fetchUserPosts();
  }, []);

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
    const url = editingPostId
      ? `http://localhost:3400/api/publics/edit/${editingPostId}`
      : "http://localhost:3400/api/publics/cargar";
    const method = editingPostId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        body: submitData,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        mostrarAlerta(
          editingPostId
            ? "Producto actualizado correctamente"
            : "Producto subido correctamente"
        );

        setFormData({
          title: "",
          description: "",
          phone: "",
          price: "",
          type: "venta",
          imagen: null,
        });
        setImagePreview(null);
        setEditingPostId(null);
        setUserPosts((prevPosts) =>
          editingPostId
            ? prevPosts.map((post) =>
                post._id === editingPostId ? result.updatedPost : post
              )
            : [...prevPosts, result]
        );
        navigate("/listado");
      } else {
        console.error("Error al procesar el producto:", await response.json());
      }
    } catch (error) {
      console.error("Error durante la solicitud:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  //funcion para editar las publicaciones
  const handleEdit = (id) => {
    const post = userPosts.find((post) => post._id === id);
    if (post) {
      setFormData({
        title: post.title,
        description: post.description,
        phone: post.phone,
        price: post.price,
        type: post.type,
        imagen: null,
      });
      setImagePreview(post.imagen);
      setEditingPostId(id);
    }
  };
  // Función para eliminar publicación
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      // Modificación: Enviar el id en el body de la solicitud DELETE
      const response = await fetch("http://localhost:3400/api/publics/deletePublication", {
        method: "DELETE",
        credentials: "include",
        body: JSON.stringify({ idPublic: id }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        mostrarAlerta("Publicación eliminada correctamente");
        // Actualizamos el estado para eliminar la publicación localmente
        setUserPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== id)
        );
      } else {
        console.error(
          "Error al eliminar la publicación:",
          await response.json()
        );
      }
    } catch (error) {
      console.error("Error durante la eliminación:", error);
    }
  };

  return ( 
    <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_auto_1fr_auto] h-screen">
      <Header colAndrow={"col-span-2 row-start-1"} />
      <Nav colAndrow={"col-span-2 row-start-2"} />
      <aside className="col-start-1 row-start-3">
        {/* Formulario de añadir producto */}
        <p className="font-poopins text-[2vw] pt-[2vw] text-[#3f2d51] pl-[1vw]">
          Añadir producto
        </p>
        <div className="p-[2vw]">
          <form
            onSubmit={handleSubmit}
            className="bg-[#ead8fc] p-[2vw] w-[30vw] space-y-[1.5vw] text-[#3f2d51] rounded-md"
          >
            <div className="font-baloo space-y-[1vw]">
              {/* Título */}
              <div>
                <label className="text-[1.4vw]" htmlFor="title">
                  Título:
                </label>
                <input
                  className="w-full h-[2.5vw] text-[1.2vw] px-[0.7vw] rounded"
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
                <label className="text-[1.4vw]" htmlFor="description">
                  Descripción:
                </label>
                <textarea
                  className="w-full h-[4vw] text-[1.2vw] px-[0.7vw] rounded"
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
                <label className="text-[1.4vw]" htmlFor="phone">
                  Contacto:
                </label>
                <input
                  className="w-full h-[2.5vw] text-[1.2vw] px-[0.7vw] rounded"
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
                <label className="text-[1.4vw]" htmlFor="type">
                  Tipo:
                </label>
                <select
                  id="type"
                  name="type"
                  className="w-full h-[2.5vw] text-[1.2vw] px-[0.7vw] rounded"
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
                <label className="text-[1.4vw]" htmlFor="price">
                  Precio:
                </label>
                <input
                  className="w-full h-[2.5vw] text-[1.2vw] px-[0.7vw] rounded"
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
                    className="absolute top-0 left-0 w-[15vw] h-full cursor-pointer opacity-0"
                  />
                  <button
                    type="button"
                    className="bg-[#dfc3fb] py-[0.7vw] px-[1.2vw] rounded text-[1.4vw]"
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
                    className="w-[25vw] h-[35vw] object-cover rounded-md"
                  />
                </div>
              )}
            </div>
  
            <button type="submit" disabled={isSubmitting} className="w-full py-[0.8vw] bg-[#cbade9] rounded text-[1.4vw]">
              {isSubmitting
                ? "Procesando..."
                : editingPostId
                ? "Actualizar Producto"
                : "Añadir Producto"}
            </button>
          </form>
        </div>
      </aside>
  
      <main className="col-start-2 row-start-3 overflow-auto max-h-[70vh]">
        {/* Sección de publicaciones del usuario */}
        <p className="font-poopins text-[2vw] pt-[2vw] text-[#3f2d51] pl-[1vw]">
          Mis Publicaciones
        </p>
        <div className="grid grid-cols-3 gap-[2vw]">
          {userPosts.map((post) => (
            <div
              key={post._id}
              className="bg-[#ead8fc] p-[2vw] rounded-md shadow-md space-y-[1.5vw] m-3"
            >
              <img
                src={post.imagen}
                alt={post.title}
                className="w-full h-[18vw] object-cover rounded-md"
              />
              <p className="font-baloo text-[#3f2d51] text-[1.6vw]">
                {post.title}
              </p>
              <p className="text-[1.4vw]">{post.precio}</p>
              <p className="text-[1.4vw]">{post.description}</p>
  
              <div className="flex justify-between">
                <button
                  onClick={() => handleEdit(post._id)}
                  className="bg-[#cbade9] py-[0.7vw] px-[1.2vw] rounded text-[1.4vw]"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(post._id)} // Pasamos el id de la publicación a handleDelete
                  className="bg-[#ff4d4d] py-[0.7vw] px-[1.2vw] rounded text-[1.4vw]"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
  
      <Footer colAndrow={"col-span-2 row-start-4"} />
    </div>
  );  
}  
