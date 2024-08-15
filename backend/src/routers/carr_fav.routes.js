import { Router } from 'express';
import { agreCarrito, obteCarrito, editarCarrito, eliminarCarrito, eliminarElemento } from '../controllers/carrito.controllers.js';
import { agreFav, obtFavotiros, elimiFav } from '../controllers/favorit.controllers.js';

export const carrFavRoutes = Router();

//-----------------------------------------
//---rutas para el apartado de carritos----
//-----------------------------------------

//rutas para los carritos
carrFavRoutes.post("/",agreCarrito);
//ruta para editar el carrito
carrFavRoutes.put('/:id',editarCarrito);
//ruta para eliminar todos los productos del carrito
carrFavRoutes.delete('/:id',eliminarCarrito);
//ruta para eliminar un producto del carrito
carrFavRoutes.delete('elemento/:id',eliminarElemento)
//ruta para obtener el carrito por id de usuario
carrFavRoutes.get(obteCarrito);

//-----------------------------------------
//---rutas para el apartado de favoritos---
//-----------------------------------------

//agregar a favoritos
carrFavRoutes.post('/:id',agreFav);
//ruta para obtener favoritos
carrFavRoutes.get('/:id',obtFavotiros);
//ruta para eliminar favoritos
carrFavRoutes.delete('/:idfav',elimiFav)
