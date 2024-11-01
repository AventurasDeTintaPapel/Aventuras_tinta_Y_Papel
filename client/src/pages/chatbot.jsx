'use client'

import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export default function SupportChat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:3400');

    // Manejar los mensajes del bot y las opciones seleccionadas
    socketRef.current.on('message', (data) => {
      if (typeof data === 'object') {
        const { response, selectedOption } = data;

        // Agregar la opción seleccionada al chat
        setMessages(prev => [...prev, { user: 'Usuario', text: selectedOption }]);

        // Agregar la respuesta del bot al chat
        setMessages(prev => [...prev, { user: 'SoporteBot', text: response }]);
      } else {
        // Manejar los mensajes simples
        setMessages(prev => [...prev, { user: 'SoporteBot', text: data }]);
      }
    });

    socketRef.current.on('options', (data) => {
      setOptions(data.options);
    });

    fetch('http://localhost:3400/api/soporte')
      .then(response => response.json())
      .then(data => {
        setMessages([{ user: 'SoporteBot', text: data.message }]);
      })
      .catch(error => {
        console.error('Error fetching initial data:', error);
      });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      fetch('http://localhost:3400/api/soporte', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputValue }),
      })
        .then(response => {
          if (!response.ok) throw new Error('Server response error');
          return response.json();
        })
        .then(data => {
          setMessages(prev => [
            ...prev,
            { user: 'Usuario', text: inputValue },
            { user: 'SoporteBot', text: data.message },
          ]);
        })
        .catch(error => {
          console.error('Error sending message:', error);
        });

      socketRef.current?.emit('chat message', inputValue);
      setInputValue('');
    }
  };

  // Desplazar el chat hacia abajo al agregar mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
    <Header/>
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-purple-500 text-white p-4">
        <h2 className="text-2xl font-bold">Soporte al cliente</h2>
      </div>
      <div className="h-[400px] overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.user === 'Usuario' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] ${msg.user === 'Usuario' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'} rounded-lg p-3`}>
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {options.length > 0 && (
        <div className="px-4 pb-4 space-y-2">
          <p className="text-sm font-medium text-gray-700">Selecciona una opción:</p>
          <div className="flex flex-wrap gap-2">
            {options.map((option, index) => (
              <button
                key={index}
                className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold py-2 px-4 rounded-full text-sm transition-colors duration-200"
                onClick={() => {
                  // Emitir la opción seleccionada y agregarla al chat
                  socketRef.current?.emit('optionSelected', option);
                  setMessages(prev => [...prev, { user: 'Usuario', text: option }]); // Mostrar la opción en el chat
                  setOptions([]); // Limpiar las opciones después de seleccionar
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
    <Footer/>
    </>

  );
}