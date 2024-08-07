const router = require('express').Router();
const {agrePedido}= require('../controllers/pedidos.controllers');

//ruta para cargar pedido
router.post('/pedidos/:idCarrito',agrePedido)

module.exports= router;
