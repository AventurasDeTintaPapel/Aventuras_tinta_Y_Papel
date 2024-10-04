import React, { useEffect, useRef, useState } from 'react'; 
import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js';
import "../style.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const messagesEndRef = useRef(null);
  const socket = useRef(null);

  useEffect(() => {
    // Establece la conexión con el socket
    socket.current = io();

    // Escucha los mensajes del socket
    socket.current.on('message', (msg) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: 'SoporteBot', text: msg },
      ]);
    });

    // Escucha las opciones del socket
    socket.current.on('options', (data) => {
      setOptions(data.options);
    });

    // Fetch desde el backend para obtener datos iniciales
    fetch('http://localhost:3400/chatbot', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        // Si recibes un mensaje inicial del backend, lo añades a los mensajes
        setMessages((prevMessages) => [
          ...prevMessages,
          { user: 'SoporteBot', text: data.message }, // Cambia 'data.message' por la estructura real de tu respuesta
        ]);
      })
      .catch(error => {
        console.error('Error al obtener datos del backend:', error);
      });

    return () => {
      socket.current.disconnect(); // Limpiar el socket al desmontar
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue) {
      socket.current.emit('chat message', inputValue);
      setInputValue('');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <section>
      <div className="main-content">
        <div id="chat">
          <h2 className="chat-title">Soporte al cliente</h2>
          <ul id="messages" className="chat-messages">
            {messages.map((msg, index) => (
              <li key={index} className="message-item">
                <span className="username">{msg.user}</span>
                <p className="message-text">{msg.text}</p>
              </li>
            ))}
            <div ref={messagesEndRef} />
          </ul>
          <div id="options-container" className="options-container">
            {options.length > 0 && (
              <>
                <p>Selecciona una opción:</p>
                {options.map((option, index) => (
                  <button
                    key={index}
                    className="option-button"
                    onClick={() => {
                      socket.current.emit('optionSelected', option);
                      setOptions([]); // Limpiar opciones después de seleccionar
                    }}
                  >
                    {option}
                  </button>
                ))}
              </>
            )}
          </div>
          <form id="message-form" className="chat-form" onSubmit={handleSubmit}>
            <input
              id="message-input"
              type="text"
              placeholder="Escribe un mensaje..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoComplete="off"
              className="input-message"
            />
            <button id="send-button" type="submit" className="send-button">Enviar</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Chat;
