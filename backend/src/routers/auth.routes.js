const { register, login } = require('../controllers/auth.controllers');

//requerimos el metodo router de express y lo inicializamos.
const router = require('express').Router();

//ruta para registrarse
router.post('/register', register);
//ruta para logear administradores


// ruta para el login.
router.post('/login', login);


module.exports = router;