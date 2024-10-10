import React from "react"; 
import "./style.css";
import AppRouter from "./Routers/AppRouters"; 

function App() {
  return (
    <div>
      <AppRouter /> {/* El enrutador se encargará de mostrar el Chat en la ruta /soporte */}
    </div>
  );
}

export default App;


