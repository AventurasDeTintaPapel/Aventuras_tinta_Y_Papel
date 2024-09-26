import React from 'react';
import ReactDOM from 'react-dom/client';

import { Header, Nav } from './functionNavHeaderFooter';

const rootHeader = ReactDOM.createRoot(document.getElementById("root-ContentHeader"))
const rootNav = ReactDOM.createRoot(document.getElementById("root-Nav"))



// contenedor header
rootHeader.render(<Header/>)

// contenedor navegador
rootNav.render(<Nav/>)
