const router = require('express').Router();
const {agreCarrito,obteCarrito} =require('../controllers/carri_fav.controllers');
const {agreFav,obtFavotiros} =require('../controllers/carri_fav.controllers');


//rutas para los carritos
router.post('/carrito/:idUsuario',agreCarrito);
router.get('/carrito:idUsuario',obteCarrito);
//rutas para el apartado de favoritos
router.post('/favoritos/:id',agreFav);
router.get('/favoritos/:id',obtFavotiros)

module.exports = router;
