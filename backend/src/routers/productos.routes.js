import { cargarProducto, obtenerProducto, editarProducto, eliminarProducto, obtCate } from '../controllers/productos.controllers.js';
import {subirImagen} from '../../middlewares/storage.js';
import { Router } from 'express';
export const producRouter = Router();

//ruta para cargar los productos
producRouter.post('/cargar',subirImagen.single('imagen'),cargarProducto);

//ruta para obtener los productos
producRouter.get('/productos',obtenerProducto);

//ruta para obtener por id
producRouter.get('/productos/:id',obtenerProducto);

//ruta para eliminar productos
producRouter.delete('/eliminar/:id',eliminarProducto);

//ruta para editar productos
producRouter.put('/editar/:id', subirImagen.single('imagen'),editarProducto);

//ruta para obtener los libros
producRouter.get('/catalogo/:type',obtCate)

