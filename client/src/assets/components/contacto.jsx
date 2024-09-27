import React from 'react';
import ReactDOM from 'react-dom/client';

import { Formulario } from './functionsContactos';
import { Header, Nav } from './functionNavHeaderFooter';

const rootHeader = ReactDOM.createRoot(document.getElementById("root-ContentHeader"))
const rootNav = ReactDOM.createRoot(document.getElementById("root-Nav"))
const root = ReactDOM.createRoot(document.getElementById('root-contacto'));

// contenedor header
rootHeader.render(<Header/>)

// contenedor navegador
rootNav.render(<Nav/>)

// informacion y formulario
root.render(<Formulario />);
