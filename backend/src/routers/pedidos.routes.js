const router = require('express').Router();
const {agrePedido,ediPedido,obtePedido}= require('../controllers/pedidos.controllers');

//ruta para cargar pedido
router.post('/pedidos',agrePedido)
//ruta para editar pedido
router.put('/pedido/:idPedido',ediPedido);
//ruta para obtener los pedidos (Admin)
router.get('/pedidos',obtePedido)

module.exports= router;
