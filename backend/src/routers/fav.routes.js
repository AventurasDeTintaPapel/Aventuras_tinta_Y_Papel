import { Router } from 'express';

import { agreFav, obtFavotiros, elimiFav } from '../controllers/favorit.controllers.js';


export const favoritos = Router();
//agregar a favoritos
favoritos.post('/:id',agreFav);
//ruta para obtener favoritos
favoritos.get('/:id',obtFavotiros);
//ruta para eliminar favoritos
favoritos.delete('/:idfav',elimiFav)
