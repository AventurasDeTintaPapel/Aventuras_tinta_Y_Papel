//dependencias
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from './database/db.js';
import {authRouter} from './routers/auth.routes.js'
import {routes} from './routers/carr_fav.routes.js'
import {pediRouter} from './routers/pedidos.routes.js'
import {producRouter} from './routers/productos.routes.js'

//inicializacion de el servidor
const app= express();

//aplicacion de los middlewares
app.use(express.static('./public'))
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//rutas
app.use('/api',authRouter);
app.use('/api',routes)
app.use('/api/pedidos',pediRouter);
// app.use(require('./routers/productos.routes'))

//configuracion del puerto
const port = process.env.PORT || 3400;
app.listen(port, () => {
    console.log(`El servidor está funcionando en el puerto http://localhost:${port}`);
});