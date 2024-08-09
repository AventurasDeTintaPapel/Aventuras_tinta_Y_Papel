const router = require('express').Router();
const {agreCarrito,obteCarrito,editarCarrito,eliminarCarrito,eliminarElemento} =require('../controllers/carrito.controllers');
const {agreFav,obtFavotiros,elimiFav} =require('../controllers/favorit.controllers');

//-----------------------------------------
//---rutas para el apartado de carritos----
//-----------------------------------------

//rutas para los carritos
router.post('/carrito',agreCarrito);
//ruta para editar el carrito
router.put('/carrito/:id',editarCarrito);
//ruta para eliminar todos los productos del carrito
router.delete('/carrito',eliminarCarrito);
//ruta para eliminar un producto del carrito
router.delete('/carrito/elemento/:id',eliminarElemento)
//ruta para obtener el carrito por id de usuario
router.get('/carrito',obteCarrito);

//-----------------------------------------
//---rutas para el apartado de favoritos---
//-----------------------------------------

//agregar a favoritos
router.post('/favoritos/:id',agreFav);
//ruta para obtener favoritos
router.get('/favoritos/:id',obtFavotiros);
//ruta para eliminar favoritos
router.delete('/favoritos/:idfav',elimiFav)

module.exports = router;
