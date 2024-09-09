import { Router } from 'express';
import { agreCarrito, obteCarrito, eliminarCarrito, eliminarElemento } from '../controllers/carrito.controllers.js';


export const carrito = Router();


//rutas para los carritos
carrito.post("/",agreCarrito);
//ruta para editar el carrito
carrito.put('/:id',editarCarrito);
//ruta para eliminar todos los productos del carrito
carrito.delete('/',eliminarCarrito);
//ruta para eliminar un producto del carrito
carrito.delete('elemento/:id',eliminarElemento)
//ruta para obtener el carrito por id de usuario
carrito.get("/",obteCarrito);



