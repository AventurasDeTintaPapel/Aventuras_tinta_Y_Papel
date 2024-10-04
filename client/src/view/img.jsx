import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, User, Mail, Lock } from "lucide-react";

export default function RegistrationForm() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [ingreContra, setIngreContra] = useState("");

  const register = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log("Form submitted");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center"></CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={register} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  placeholder="Roberto"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellido">Apellido</Label>
                <Input
                  id="apellido"
                  placeholder="Espinoza"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  placeholder="nombre@gmail.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-8"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fecha-nacimiento">Fecha de nacimiento</Label>
              <div className="relative">
                <CalendarIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="fecha-nacimiento"
                  type="date"
                  value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                  className="pl-8"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="usuario">Nombre de usuario</Label>
              <div className="relative">
                <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="usuario"
                  placeholder="Roberto_E"
                  value={nombreUsuario}
                  onChange={(e) => setNombreUsuario(e.target.value)}
                  className="pl-8"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contraseña">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="contraseña"
                  type="password"
                  placeholder="••••••••"
                  value={ingreContra}
                  onChange={(e) => setIngreContra(e.target.value)}
                  className="pl-8"
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              Registrarse
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


import React from 'react';
import { Card } from 'antd';
const { Meta } = Card;
const App = () => (
  <Card
    hoverable
    style={{
      width: 240,
    }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>
);
export default App;


//  tarjeta React

import React from 'react';
import { Card, Button } from 'antd';

const { Meta } = Card;

const TarjetaProducto = ({ imagen, tituloResumido, precio, id, onAñadirFavorito, onAñadirCarrito }) => {
  return (
    <Card
      hoverable
      style={{
        width: '15vw', // Adaptando el ancho que tenías
        height: '32vw', // Altura del contenedor original
      }}
      cover={<img alt={tituloResumido} src={imagen} style={{ height: '20.5vw', objectFit: 'cover' }} />}
    >
      <Meta
        title={<p className="text-[1.6vw] font-medium">{tituloResumido}</p>} // Ajustando el tamaño del texto
        description={<p className="text-[1.4vw]">Precio: {precio}</p>} // Mostrando el precio
      />
      <div className="flex justify-evenly mt-[1vw]"> {/* Botones dentro del Card */}
        <Button
          className="bg-violet-700 text-slate-200 text-[1.3vw] px-[1vw] py-[0.2vw] rounded-sm"
          onClick={() => onAñadirFavorito({ target: { dataset: { id } } })}
        >
          Favorito
        </Button>
        <Button
          className="bg-violet-700 text-slate-200 text-[1.3vw] px-[1vw] py-[0.2vw] rounded-sm"
          onClick={() => onAñadirCarrito({ target: { dataset: { id } } })}
        >
          Comprar
        </Button>
      </div>
    </Card>
  );
};

export default TarjetaProducto;

const seccion = [
  {
    title: 'Perfil',
    link: '#'
  },
  {
    title: 'Favoritos',
    link: '#'
  }
];

function App() {
  return (
    <div>
      {seccion.map((seccion, index) => (
        <a key={index} href={seccion.link}>
          {seccion.title}
        </a>
      ))}
    </div>
  );
}

