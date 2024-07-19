//dependencias
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('./database/db')

//inicializacion de el servidor
const app= express();

//aplicacion de los middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());



//rutas
app.use(require('./routers/auth.routes'))
//configuracion del puerto
const port = process.env.PORT || 3400;
app.listen(port, () => {
    console.log(`El servidor está funcionando en el puerto http://localhost:${port}`);
});