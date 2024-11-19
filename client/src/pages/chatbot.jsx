import React, { useState, useEffect, useRef } from 'react';  
import { io } from 'socket.io-client';

export default function SupportChat() {
    const [messages, setMessages] = useState([]); // Mensajes del chat
    const [options, setOptions] = useState([]); // Opciones para elegir
    const messagesEndRef = useRef(null);
    const socketRef = useRef(null);

    useEffect(() => {
        // Conexión al servidor de socket
        socketRef.current = io('http://localhost:3400');

        // Manejar mensajes del bot y respuestas
        socketRef.current.on('message', (data) => {
            console.log('Respuesta del bot:', data); // Agregar log para depuración

            if (typeof data === 'object') {
                const { response, selectedOption } = data;

                // Agregar la opción seleccionada y la respuesta al chat
                setMessages((prev) => [
                    ...prev,
                    { user: 'Usuario', text: selectedOption },  // Mensaje del usuario
                    { user: 'SoporteBot', text: response }      // Respuesta del bot
                ]);
            } else {
                setMessages((prev) => [...prev, { user: 'SoporteBot', text: data }]);
            }
        });

        // Recibir las opciones disponibles
        socketRef.current.on('options', (data) => {
            console.log('Opciones del servidor:', data); // Agregar log para depuración
            setOptions(data.options);
        });

        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

    // Desplazar el chat hacia abajo al agregar mensajes
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Función para convertir texto en enlace clickeable
    const renderMessage = (msgText) => {
        if (msgText.includes("https://wa.me")) {
            const parts = msgText.split("https://wa.me");
            return (
                <p className="text-sm">
                    {parts[0]} 
                    <a
                        href={`https://wa.me${parts[1]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600"
                    >
                        https://wa.me{parts[1]}
                    </a>
                    {parts[2]}
                </p>
            );
        }

        return <p className="text-sm">{msgText}</p>;
    };

    return (
        <div className="w-full h-screen flex flex-col max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-purple-500 text-white p-4 flex justify-center items-center">
                <h2 className="text-2xl font-bold">Soporte al cliente</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.user === 'Usuario' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[70%] ${
                                msg.user === 'Usuario'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-gray-100 text-gray-800'
                            } rounded-lg p-3`}
                        >
                            {renderMessage(msg.text)}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {options.length > 0 && (
                <div className="px-4 pb-4 space-y-2">
                    <p className="text-sm font-medium text-gray-700">Selecciona una opción:</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {options.map((option, index) => (
                            <button
                                key={index}
                                className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold py-2 px-4 rounded-full text-sm transition-colors duration-200"
                                onClick={() => {
                                    // Aquí se agrega el mensaje seleccionado por el usuario
                                    setMessages((prev) => [
                                        ...prev,
                                        { user: 'Usuario', text: option } // Se agrega la opción seleccionada por el usuario
                                    ]);

                                    // Emite la opción seleccionada al servidor
                                    socketRef.current?.emit('optionSelected', option);

                                    // Limpiar opciones después de seleccionar
                                    setOptions([]); 
                                }}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
