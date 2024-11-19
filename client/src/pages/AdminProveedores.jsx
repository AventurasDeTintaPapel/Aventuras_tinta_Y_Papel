import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAlert } from "../hook/useAlert";
import { GiCancel } from "react-icons/gi";

function ButonElimarProveedor({ idProveedor, setProveedores, traerProveedores }) {
  const { Alerta, mostrarAlerta } = useAlert();
  const eliminarProveedor = async () => {
    try {
      const response = await axios.delete(`http://localhost:3400/api/supplier/delete/${idProveedor}`);
      setProveedores((prev) => prev.filter((proveedor) => proveedor._id != idProveedor));
      mostrarAlerta("Se elimino Correctaramente");
      await traerProveedores();
    } catch (error) {
      console.error("Error al leimianr proveedor", error);
    }
  };

  return (
    <>
      <button
        className="border-[0.16vw] tracking-wide font-semibold rounded px-[0.5vw] border-red-500 text-[1.2vw] bg-slate-100 text-red-600 hover:scale-110 transition ease-in-out duration-200 hover:bg-red-500 hover:text-white"
        onClick={() => eliminarProveedor(idProveedor)}
      >
        Eminar
      </button>
      {Alerta}
    </>
  );
}

function ButtonEditarProvedor({ idProveedor, traerProveedores, nameProps, companiaProps, emailProps, addresProps, phoneProps }) {
  const [formAgregar, setFormAgregar] = useState(false);
  const [name, setName] = useState(nameProps);
  const [company, setCompany] = useState(companiaProps);
  const [email, setEmail] = useState(emailProps);
  const [address, setAddress] = useState(addresProps);
  const [phone, setPhone] = useState(phoneProps);
  const { Alerta, mostrarAlerta } = useAlert();

  const editarProveedor = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3400/api/supplier/edit/${idProveedor}`, {
        name,
        company,
        email,
        address,
        phone,
      });

      console.log("Usuario Editado:", response.data);
      await traerProveedores();
      setFormAgregar(false);
      mostrarAlerta("Se edito con exito el proveedor");
    } catch (error) {
      console.error("Error al traer porveedores", error);
    }
  };

  const handleClicForm = () => {
    setFormAgregar(!formAgregar);
  };

  return (
    <>
      <button
        onClick={handleClicForm}
        className="border-[0.16vw] tracking-wide font-semibold rounded px-[0.5vw] border-blue-500 text-[1.2vw] text-blue-600 hover:scale-110 transition ease-in-out duration-200 hover:bg-blue-500 bg-slate-100 hover:text-white"
      >
        Editar
      </button>
      {Alerta}
      <div
        className={`${
          formAgregar
            ? "opacity-100 w-full h-full fixed top-0 left-0 z-50 bg-black bg-opacity-70 flex justify-center items-center"
            : "opacity-0 left-[-80vw] absolute pointer-events-none"
        }`}
      >
        <form onSubmit={editarProveedor} className="bg-white p-5 relative rounded">
          <button
            onClick={() => setFormAgregar(false)}
            className="absolute right-[1.5vw] top-[1.4vw] hover:scale-105 transition ease-in-out duration-200 text-red-600 text-[2vw]"
          >
            <GiCancel />
          </button>
          <p className="text-[1.7vw] tracking-wide font-bold pb-[1vw]">Editar Proveedor</p>
          <div className="space-y-[0.5vw] text-[1.1vw]">
            {/* Nombre */}
            <div>
              <label className="font-semibold">Nombre:</label>
              <input
                className="w-full border border-slate-300 px-[1vw] py-[0.4vw]"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            {/* Compañía */}
            <div>
              <label className="font-semibold">Compañía:</label>
              <input
                className="w-full border border-slate-300 px-[1vw] py-[0.4vw]"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </div>
            {/* Email */}
            <div>
              <label className="font-semibold">Email:</label>
              <input
                className="w-full border border-slate-300 px-[1vw] py-[0.4vw]"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {/* Dirección */}
            <div>
              <label className="font-semibold">Dirección:</label>
              <input
                className="w-full border border-slate-300 px-[1vw] py-[0.4vw]"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            {/* Teléfono */}
            <div>
              <label className="font-semibold">Teléfono:</label>
              <input
                className="w-full border border-slate-300 px-[1vw] py-[0.4vw]"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="bg-blue-800 text-white w-full mt-[1.5vw] text-[1.2vw] px-[1vw] py-[0.4vw] rounded">
            AGREGAR
          </button>
        </form>
      </div>
    </>
  );
}

function AgregarProveedores({ traerProveedores }) {
  const [formAgregar, setFormAgregar] = useState(false);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const agragarProveedor = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3400/api/supplier/create", {
        name,
        company,
        email,
        address,
        phone,
      });

      // con esto se puede limpiar los inpust
      setName("");
      setCompany("");
      setEmail("");
      setAddress("");
      setPhone("");
      setFormAgregar(false);

      await traerProveedores();
    } catch (error) {
      console.error("Error al enviar el formulario", error);
    }
  };

  const handleClicForm = () => {
    setFormAgregar(!formAgregar);
  };

  return (
    <>
      <button onClick={handleClicForm} className="bg-blue-500 text-[1.2vw] text-white px-[1vw] py-[0.45vw]  rounded">
        Agregar
      </button>

      <div
        className={`${
          formAgregar
            ? "opacity-100 w-full h-full fixed top-0 left-0 z-50 bg-black bg-opacity-70 flex justify-center items-center"
            : " left-[-80vw] opacity-0 absolute pointer-events-none"
        }`}
      >
        <form onSubmit={agragarProveedor} className="bg-white p-5 relative rounded">
          <button
            onClick={() => setFormAgregar(false)}
            className="absolute right-[1.5vw] top-[1.4vw] hover:scale-105 transition ease-in-out duration-200 text-red-600 text-[2vw]"
          >
            <GiCancel />
          </button>
          <p className="text-[1.7vw] tracking-wide font-bold pb-[1vw]">Agregar Proveedor</p>
          <div className="space-y-[0.5vw] text-[1.1vw]">
            {/* Nombre */}
            <div>
              <label className="font-semibold">Nombre:</label>
              <input
                className="w-full border border-slate-300 px-[1vw] py-[0.3vw]"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            {/* Compañía */}
            <div>
              <label className="font-semibold">Compañía:</label>
              <input
                className="w-full border border-slate-300 px-[1vw] py-[0.3vw]"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </div>
            {/* Email */}
            <div>
              <label className="font-semibold">Email:</label>
              <input
                className="w-full border border-slate-300 px-[1vw] py-[0.3vw]"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {/* Dirección */}
            <div>
              <label className="font-semibold">Dirección:</label>
              <input
                className="w-full border border-slate-300 px-[1vw] py-[0.3vw]"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            {/* Teléfono */}
            <div>
              <label className="font-semibold">Teléfono:</label>
              <input
                className="w-full border border-slate-300 px-[1vw] py-[0.3vw]"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="bg-blue-800 text-white w-full mt-[1.5vw] text-[1.2vw] px-[1vw] py-[0.4vw] rounded">
            AGREGAR
          </button>
        </form>
      </div>
    </>
  );
}

export default function AdminProveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [buscarProveedor, serBuscarProve] = useState("");
  const [loading, setLoadin] = useState(false);

  const traerProveedores = async () => {
    try {
      setLoadin(true);
      const response = await axios(" http://localhost:3400/api/supplier");
      setProveedores(response.data);
    } catch (error) {
      console.error("Error al intentar tarer proveedores", error);
    } finally {
      setLoadin(false);
    }
  };

  const filtroProductos =
    proveedores.length > 0 &&
    proveedores.filter(
      (proveedor) =>
        proveedor.name.toLowerCase().includes(buscarProveedor.toLowerCase()) ||
        proveedor.company.toLowerCase().includes(buscarProveedor.toLowerCase())
    );

  useEffect(() => {
    traerProveedores();
  }, []);

  return (
    <div className="font-poopins">
      <div className="bg-white shadow items-center gap-[1vw] sticky top-0 flex py-[0.5vw] px-[1vw] z-40">
        <p className="text-[1.8vw] font-bold">PROVEEDORES</p>
        <input
          onChange={(e) => serBuscarProve(e.target.value)}
          className="border text-[1.2vw] border-slate-300 rounded w-full px-[1vw] py-[0.5vw]"
          type="text"
          placeholder="Buscar proveedor por nombre o compañia . . ."
        />
        <AgregarProveedores traerProveedores={traerProveedores} />
      </div>
      {loading && <p>Cargando proveedores. . . </p>}
      {/* contenedor */}
      <div className=" gap-[2vw] px-[2vw] grid grid-cols-2 py-[2vw] justify-items-center">
        {filtroProductos.length > 0 ? (
          filtroProductos.map((proveedor, index) => (
            // tarjeta
            <div key={index} className="w-full">
              <div className="grid grid-rows-[1fr_auto] shadow-md">
                <div className="bg-slate-200 py-[0.5vw] flex justify-end gap-[1vw] px-[1vw] rounded-t">
                  <ButtonEditarProvedor
                    idProveedor={proveedor._id}
                    traerProveedores={traerProveedores}
                    nameProps={proveedor.name}
                    companiaProps={proveedor.company}
                    emailProps={proveedor.email}
                    addresProps={proveedor.address}
                    phoneProps={proveedor.phone}
                  />
                  <ButonElimarProveedor traerProveedores={traerProveedores} idProveedor={proveedor._id} setProveedores={setProveedores} />
                </div>
                <div className="rounded-b px-[1vw] py-[0.5vw]">
                  <p className="text-[1.2vw] border-b border-slate-300 pl-[0.5vw] py-[0.2vw]">
                    <span className="font-semibold">Nombre del proveedor: </span>
                    {proveedor.name || "Nombre no encontrado"}
                  </p>
                  <p className="text-[1.2vw] border-b border-slate-300 pl-[0.5vw] py-[0.2vw]">
                    <span className="font-semibold">Compañía del proveedor: </span>
                    {proveedor.company || "Compañia no encontrado"}
                  </p>
                  <p className="text-[1.2vw] border-b border-slate-300 pl-[0.5vw] py-[0.2vw]">
                    <span className="font-semibold">Email del proveedor: </span>
                    {proveedor.email || "Email no encontrado"}
                  </p>
                  <p className="text-[1.2vw] border-b border-slate-300 pl-[0.5vw] py-[0.2vw]">
                    <span className="font-semibold">Telefono del proveedor: </span>
                    {proveedor.phone || "Telefono no encontrado"}
                  </p>
                  <p className="text-[1.2vw] pt-[0.2vw] pl-[0.5vw]">
                    <span className="font-semibold">Dirección del proveedor: </span>
                    {proveedor.address || "Direccion no encontrado"}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No hay proveedores</p>
        )}
      </div>
    </div>
  );
}
