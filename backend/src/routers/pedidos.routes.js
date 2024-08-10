import Router from 'express'
import { agrePedido, ediPedido, obtePedido } from '../controllers/pedidos.controllers.js';
export const pediRouter = Router();

//ruta para cargar pedido
pediRouter.post(agrePedido)
//ruta para editar pedido
pediRouter.put('/:idPedido',ediPedido);
//ruta para obtener los pedidos (Admin)
pediRouter.get(obtePedido)


