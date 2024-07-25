const router = require('express').Router();
const {agreCarrito,obtener} =require('../controllers/carri_fav.controllers');
const {agreFav,favoritos} =require('../controllers/carri_fav.controllers');


//rutas para los carritos
router.post('/carrito/:idUsuario',agreCarrito);
router.get('/carrito',obtener);
//rutas para el apartado de favoritos
router.post('/favoritos/:idUsuario',agreFav);
router.get('/favoritos/:idUsuario',favoritos)

module.exports = router;
