const {Router} = require('express')
const {check, param} = require('express-validator')
const userController = require('../controllers/userController')
const midJWT = require('../middlewares/validarJWT')
const mid = require('../middlewares/checkDatos')
const {emailExiste, rolExiste, usuarioExiste} = require("../helpers/db-validators");
const {validarCampos} = require("../middlewares/validar-campos");
const authController = require("../controllers/authController");

const router = Router()

router.use(midJWT.validarAdmin)

//Ruta para ver todos los roles de un usuario
router.get('/roles/:id', mid.existeUsuario,authController.obtenerUsuarioConRoles);

// Ruta para asignar un rol a un asuario
router.put('/rol/:id', [
    check('rol').custom(rolExiste),
    validarCampos
],mid.existeUsuario,userController.asignarRol)

// Rutas para usuarios
router.route('/')
    .get(userController.obtenerUsuarios)

    .post([
        check('email').custom(emailExiste).isEmail(),
        check('password').isString().isLength({min: 3, max: 90}),
        check('nombre').isString().isLength({min: 3, max: 40}),
        check('rol').custom(rolExiste),
        validarCampos
    ], userController.crearUsuario)

router.route('/:id')
    .get(mid.existeUsuario, userController.obtenerUsuario)

    .delete(mid.existeUsuario, userController.borrarUsuario)

    .put([
        check('email').custom(emailExiste).isEmail(),
        check('password').isString().isLength({min: 3, max: 90}),
        check('nombre').isString().isLength({min: 3, max: 40}),
        validarCampos
    ],mid.existeUsuario, userController.modificarUsuario)

//Intento de control de de si existe usuario con express-validator
//.get([
//    param('id').toInt().custom(usuarioExiste),
//    validarCampos
//], userController.obtenerUsuario)

module.exports = router