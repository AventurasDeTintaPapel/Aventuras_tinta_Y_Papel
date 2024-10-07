//app.jsx
import React from "react"; 
import "./style.css";
import AppRouter from "./Routers/AppRouters";
import Chat from "./view/chatbot.jsx" // Asegúrate de que la ruta sea correcta


function App() {
  return (
    <div>
      <AppRouter />
      <Chat /> {/* Agrega el componente Chat aquí */}
    </div>
  );
}

export default App;

