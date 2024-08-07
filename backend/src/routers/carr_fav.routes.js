const router = require('express').Router();
const {agreCarrito,obteCarrito,editarCarrito,eliminarCarrito} =require('../controllers/carrito.controllers');
const {agreFav,obtFavotiros} =require('../controllers/favorit.controllers');


//rutas para los carritos
router.post('/carrito/:idUsuario',agreCarrito);
//ruta para editar el carrito
router.put('/carrito/:id',editarCarrito);
//ruta para eliminar productos del carrito
router.delete('/carrito/:idUsuario',eliminarCarrito);
//ruta para obtener el carrito por id de usuario
router.get('/carrito/:idUsuario',obteCarrito);

// router.get('/carrito',obteCarrito);
//rutas para el apartado de favoritos
router.post('/favoritos/:id',agreFav);
router.get('/favoritos/:id',obtFavotiros)

module.exports = router;
