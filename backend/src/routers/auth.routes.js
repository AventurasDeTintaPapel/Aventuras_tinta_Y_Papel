const { register, login,admin } = require('../controllers/auth.controllers');

//requerimos el metodo router de express y lo inicializamos.
const router = require('express').Router();

//ruta para registrarse
router.post('/register', register);
//ruta para logear administradores
router.post('/admin',admin)

// ruta para el login.
router.post('/login', login);


module.exports = router;