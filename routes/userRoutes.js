const { Router } = require('express')
const { check } = require('express-validator')
const userController = require('../controllers/userController')
const midJWT = require('../middlewares/validarJWT')
const mid = require('../middlewares/checkDatos')

const router = Router()

// Middleware para todas las rutas
router.use(midJWT.validarAdmin)

// Rutas para usuarios
router.route('/')
    .get(userController.obtenerUsuarios)
    .post(userController.crearUsuario)

router.route('/:id')
    .get(mid.existeUsuario,userController.obtenerUsuario)
    .delete(mid.existeUsuario,userController.borrarUsuario)
    .put(mid.existeUsuario,userController.modificarUsuario)

module.exports = router