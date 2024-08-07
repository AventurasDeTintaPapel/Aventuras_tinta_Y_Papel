const router = require('express').Router();
const {agreCarrito,obteCarrito,editarCarrito,eliminarCarrito} =require('../controllers/carrito.controllers');
const {agreFav,obtFavotiros,elimiFav} =require('../controllers/favorit.controllers');

//-----------------------------------------
//---rutas para el apartado de carritos----
//-----------------------------------------

//rutas para los carritos
router.post('/carrito/:idUsuario',agreCarrito);
//ruta para editar el carrito
router.put('/carrito/:id',editarCarrito);
//ruta para eliminar productos del carrito
router.delete('/carrito/:idUsuario',eliminarCarrito);
//ruta para obtener el carrito por id de usuario
router.get('/carrito/:idUsuario',obteCarrito);

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
