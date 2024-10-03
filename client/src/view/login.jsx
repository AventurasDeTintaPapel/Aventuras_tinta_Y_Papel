import React, { useState } from "react";

export function Login() {
  // Estado para los campos del formulario
  const [email, setemail] = useState("");
  const [password, setcontrasenia] = useState("");
  console.log(email, password);

  // Función para iniciar sesión
  const login = async (e) => {
    // Evitamos el evento submit.
    e.preventDefault();

    // Realizamos la petición a nuestro servidor.
    const peticion = await fetch("http://localhost:3400/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-type": "application/json",
      },
    });

    console.log("Petición realizada:", peticion);

    // Convertimos en json la respuesta.
    const respuesta = await peticion.json();

    // En caso de que falle la petición, mostrar el mensaje de error.
    if (!peticion.ok) {
      alert(respuesta.msg);
    } else {
      // Caso contrario mostrar el mensaje.
      alert(respuesta.msg);

      // Seteamos el token en el localStorage.
      localStorage.setItem("token", respuesta.token);
      localStorage.setItem("role", respuesta.role);

      if (respuesta.role === "admin") {
        window.location.href = "http://127.0.0.1:5500/client/inicio/inicioAdmin.html";
      } else if (respuesta.role === "user") {
        window.location.href = "/client/html/inicio/inicio.html";
      } else {
        // Manejar otros roles o un caso por defecto
        window.location.href = "http://localhost:5173/inicio";
      }
    }
  };

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <form id="form" className="formulario bg-emerald-200 w-[30vw] px-[2vw] py-[1vw] rounded-md" onSubmit={login}>
        <p className="titulo text-emerald-900 text-[1.7vw] font-semibold">INGRESAR</p>
        <div className="form-container text-[1.3vw]">
          <div className="preguntas my-[1vw] flex flex-col gap-[1vw]">
            <div className="">
              <label htmlFor="usuario" className="form-label text-emerald-900">
                Email:
              </label>
              <input className="w-full" type="text" id="usuario" placeholder="Roberto_E" value={email} onChange={(e) => setemail(e.target.value)} />
            </div>

            <div className="">
              <label htmlFor="contraseña" className="form-label text-emerald-900">
                Contraseña:
              </label>
              <input
                className="w-full"
                type="password"
                id="contraseña"
                placeholder="####"
                value={password}
                onChange={(e) => setcontrasenia(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn bg-emerald-900 rounded-sm w-full text-white py-[0.7vw] text-[1.3vw]">
            Entrar
          </button>

          <div className="space-y-[0.2vw] mt-[1vw]">
            <p className="text-emerald-900">
              <span>¿No tienes cuenta? </span>
              <a className="text-blue-800" href="http://localhost:5173/registro">
                Regístrate
              </a>
            </p>
            <p className="text-emerald-900">
              ¿Olvidaste tu contraseña? <a href="#">Click aquí</a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
