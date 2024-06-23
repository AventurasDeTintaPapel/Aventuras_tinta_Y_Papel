//dependencias
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

//inicializacion de el servidor
const app= express();

//aplicacion de los middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());



//rutas

//configuracion del puerto
const PORT = 3400;

app.listen (PORT,()=>{
    console.log(`el servidor esta funcionando en el puerto http://localhost:3400`)
})