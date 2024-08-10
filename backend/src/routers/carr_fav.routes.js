import { Router } from 'express';
import { agreCarrito, obteCarrito, editarCarrito, eliminarCarrito, eliminarElemento } from '../controllers/carrito.controllers.js';
import { agreFav, obtFavotiros, elimiFav } from '../controllers/favorit.controllers.js';

export const routes = Router();

//-----------------------------------------
//---rutas para el apartado de carritos----
//-----------------------------------------

//rutas para los carritos
routes.post('/carrito',agreCarrito);
//ruta para editar el carrito
routes.put('/carrito/:id',editarCarrito);
//ruta para eliminar todos los productos del carrito
routes.delete('/carrito',eliminarCarrito);
//ruta para eliminar un producto del carrito
routes.delete('/carrito/elemento/:id',eliminarElemento)
//ruta para obtener el carrito por id de usuario
routes.get('/carrito',obteCarrito);

//-----------------------------------------
//---rutas para el apartado de favoritos---
//-----------------------------------------

//agregar a favoritos
routes.post('/:id',agreFav);
//ruta para obtener favoritos
routes.get('/:id',obtFavotiros);
//ruta para eliminar favoritos
routes.delete('/favoritos/:idfav',elimiFav)
